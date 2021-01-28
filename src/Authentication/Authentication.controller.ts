import __UserService__ from "./Authentication.service";
import { UserService, Authentication, UserBody } from './Authentication.typedefinitions';
import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { createTransport } from "nodemailer";
import main_config from ".././main.config";
import { v4 } from "uuid";

const _user = new __UserService__();

class __Authentication__ implements Authentication {
	public async login(req: Request, res: Response) :Promise<void>{

		// Get body data
		const { email, password } : { email:string, password: string } = req.body;

		// Validate 
		const userExists = await _user.findUser({ email: email });

		// Check if the user exists
		if ( userExists.found !== true ) {
			res.status(401).send({ loggedin : false, message: "user not exists!" }); res.end(); return;
		};

		// Check if the user signed in with oauth
		if ( userExists.user.provider !== "local" ) {
			res.status(101).send({ loggedin : false, message: "sign up with the services available!" }); res.end(); return
		}

		// compare password
		// Load hash from your password DB.
		const matched: boolean = await compare( password, userExists.user.password );

		// if compared then
		if (matched != true) {res.status(404).send({ loggedin : false, message: "credentials aren't correct!" })}
		else {
			// sign a session
			// send it back to the frontend
			req.session.local = { name : userExists.user.user_name,  email: email };

			res.status(userExists.status).send({ loggedin : true, message : "Logged in!" });
		}
	}
	public async register(req: Request, res: Response) :Promise<void>{
		// Get user inputs
		const body : UserBody = req.body;

		// Validate user inputs
		const isAlreadyExists = await _user.findUser({email: body.email});

		if (isAlreadyExists.found == true ) {
			res.status(404).send({ loggedin : false, message: "email exists!" }); res.end(); return;
		}

		// Hash password
		const salt = await genSalt(10);
		const hashed_password = await hash(body.password, salt);

		body.password      = hashed_password;

		// Save use in the database
		const new_user = await _user.addUser(body);

		// Check whether saved or not
		if (new_user.saved == true) {

			// sign a token
			req.session.local = { name : body.user_name,  email: body.email };
			// send it back to the frontend			
			res.status(new_user.status).send({ registered : true, message: "Registered successfully!", user_token:user_token  })

		}
		else {		
			res.status(new_user.status).send({
				message : "Something went wrong!"
			})
		}
	}
	public async resetPassword(req: Request, res: Response) :Promise<void>{
		// Get body data
		const body: { email: string } = req.body;

		// Check email is exists
		const user = await _user.findUser({ email :body.email });

		// if true then
		if ( user.found == true ) {

			// generate a random password 
			const password = v4();

			// Hash it
			const salt            = await genSalt(10);
			const hashed_password = await hash(password, salt);

			// Update it with forgotten one
			const updatePassword:{ 

				status:number, changed:boolean, message:string 
				
			} = await _user.changePassword(user.user._id, hashed_password);

			// Send email with that new password
			// then send it to the user's inbox via email
			// Create transporter object with credentials
			var transporter = createTransport({
				service :'gmail',
				auth: { user: main_config.email, pass: main_config.pass }
			});
			// Check the language the user set in the app to send the email appropriated to his language
			let mailTemplate;

			// send it!
			transporter.sendMail({
				from: '"Learndev Team" <mouadtaoussi0@gmail.com>',
			    to: user.user.email,
			    subject: 'Reset password request',
			    text: 'Hey there, it’s your temporary password to log in and change it ;) ', 
			    html: mailTemplate
			});

			res.status(updatePassword.status).send({
				sent : true,
				message : "email sent to your inbox!",
			})
		}
		else {
			res.status(404).send({
				message : "Make sure to put a correct email!",
				sent    : false
			})
		}
	}
	public async updateProfile(req: Request, res: Response) :Promise<void>{
		// Get the user by its session
		const authenticated_user = req.session.passport || req.session.local;

		if ( authenticated_user == undefined ) {
			res.status(401).send({ loggedin : false, message: "you are not authorized!" }); res.end(); return
		}
		// Get body data
		const body: UserBody = req.body;

		// Check if the email alreay provided
		// Find email if possible
		const userEmail = await _user.findUser({ email: body.email });

		// if found then
		if (userEmail.found == true) {

			if ( authenticated_user.email == body.email ) {
				// Update user
				const updating: { 
					status:number,updated:boolean,message:string } = await _user.updateUser(authenticated_user.id,body);

				// Response back
				
				res.status(updating.status).send({
					updated : updating.updated,
					message : updating.message
				})
			}
			else {
				// IF THE EAMIL IS UNDEFINED THEN THE USER UPDATED SOMETHING IN THE SETTINGS
				if ( body.email == undefined ){
					// Update user
					const updating: { 
						status:number,updated:boolean,message:string } = await _user.updateUser(authenticated_user.id,body);

					// Response back
					res.status(updating.status).send({
						updated : updating.updated,
						message : updating.message
					})
				} 
				else {
					res.status(404).send({
						updated : false,
						message : "Email alreay provided!"
					})
				}
			}
		}
		else {
			// Update user
			const updating: { 
				status:number,updated:boolean,message:string } = await _user.updateUser(authenticated_user.id,body);

			// Response back
			
			res.status(updating.status).send({
				updated : updating.updated,
				message : updating.message
			})
		}
	}
	public async deleteAccount(req: Request, res: Response) :Promise<void>{
		res.send('Hello World')
	}
}

export default __Authentication__;