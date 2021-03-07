import __UserService__ from "./Authentication.service";
import __TopicService__ from ".././Topics/Topics.service";
import { UserService, AuthenticationInt, UserBody } from './Authentication.typedefinitions';
import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { createTransport } from "nodemailer";
import main_config from ".././main.config";
import { v4 } from "uuid";

const _user = new __UserService__();
const _topic = new __TopicService__();

class Authentication implements AuthenticationInt {
	public async getUser(req:Request,res:Response) :Promise<void>{
		// const user = req.session.passport;
		const auth = !!req.session.passport;

		if (auth){ 
			const user = req.session.passport
			const user_id = user.user.id; 
			// Get user
			const current_user = await _user.findUser({id:user_id});
			console.log(current_user)
			// Get his topics
			// const topics = await _topic;
			// Get his upvoted content
		}

		else { res.status(404).send({message:"Not Authenticated"}) } 
	}
	public async login(req: Request, res: Response) :Promise<void>{
		// Check if the user is alreay logged in
		// Get body data
		const { email, password } : { email:string, password: string } = req.body;

		// Validate 
		const userExists = await _user.findUser({ email: email });

		// Check if the user exists
		if ( userExists.found !== true ) {
			res.status(404).send({ loggedin : false, message: "user not exists!" }); res.end(); return;
		};

		// Check if the user signed in with oauth
		if ( userExists.user.provider == "passport" ) {
			res.status(404).send({ loggedin : false, message: "sign up with the services available!" }); res.end(); return
		}

		// compare password
		// Load hash from your password DB.
		const matched: boolean = await compare( password, userExists.user.password );

		// if compared then
		if (matched != true) {res.status(404).send({ loggedin : false, message: "credentials aren't correct!" })}
		else {
			//////////////////////// sign a session
			// res.redirect(`/auth/save_session?name=${userExists.user.user_name}&email=${email}`);
			////////////////////////
			req.session.passport = {};

			req.session.passport.user = { 
				id:userExists.user._id, name: userExists.user.user_name, email: userExists.user.email, at_provider_id: null 
			}
			
			res.status(userExists.status).send({ loggedin : true, message : "Logged in!" });
		}
	}
	public async register(req: Request, res: Response) :Promise<void>{
		// Check if the user is alreay logged in
		// Get user inputs
		const body : UserBody = req.body;

		// @TODO check if all of the elements addedd
		if (body.email == null || body.email == undefined || body.email == "") {
			res.status(200).send({ registered : false, message: "Fill all of the inputs!" }); res.end(); return;
		}
		else if (body.password == null || body.password == undefined || body.password == "") {
			res.status(200).send({ registered : false, message: "Fill all of the inputs!" }); res.end(); return;
		}
		else if(body.fullname == null || body.fullname == undefined || body.fullname == ""){
			res.status(200).send({ registered : false, message: "Fill all of the inputs!" }); res.end(); return;
		}
		else if(body.user_name == null || body.user_name == undefined || body.user_name == ""){
			res.status(200).send({ registered : false, message: "Fill all of the inputs!" }); res.end(); return;
		}

		// Validate user inputs
		const isAlreadyExists = await _user.findUser({email: body.email});

		if (isAlreadyExists.found == true ) {
			res.status(200).send({ registered : false, message: "email exists!" }); res.end(); return;
		}

		// Hash password
		const salt = await genSalt(10);
		const hashed_password = await hash(body.password, salt);

		body.password      = hashed_password;

		// Save use in the database
		const new_user = await _user.addUser(body);

		// Check whether saved or not
		if (new_user.saved == true) {

			// sign a session
			req.session.passport = {};
			req.session.passport.user = { id:new_user.user._id, name : body.user_name,  email: body.email, at_provider_id: null };

			// send it back to the frontend			
			res.status(new_user.status).send({ registered : true, message: "Registered successfully!"})

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
			    text: 'Hey there, it’s your temporary password to log in and change it ;) ' + password, 
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
		const authenticated_user = req.session.passport.user;

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
					status:number,updated:boolean,message:string,user:any } = await _user.updateUser(authenticated_user.id,body);

				// Response backend
				req.session.passport.user = { 
					id:updating.user._id, name: updating.user.name, email: updating.user.email, at_provider_id: null 
				}

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
		else {
			// Update user
			const updating: { 
				status:number,updated:boolean,message:string, user:any } = await _user.updateUser(authenticated_user.id,body);

			// Response back
			req.session.passport.user = { 
				id:updating.user._id, name: updating.user.user_name, email: updating.user.email, at_provider_id: null 
			}
			
			res.status(updating.status).send({
				updated : updating.updated,
				message : updating.message
			})
		}
	}
	public async deleteAccount(req: Request, res: Response) :Promise<void>{
		// Get the user by its session
		const authenticated_user = req.session.passport.user;

		if ( authenticated_user == undefined ) {
			res.status(401).send({ loggedin : false, message: "you are not authorized!" }); res.end(); return
		}

		// Require password to change user data
		// Get the password to authorize user to change his credentials
		const { password } = req.query;

		if (!password) {res.status(400).send({ message:"no password provided!" }); res.end()};

		// Find user by its session
		const user: any = await _user.findUser({ email: authenticated_user.email });

		// if found then
		if (user.found == true) {
			// compare password
			// Load hash from your password DB.
			const matched: boolean = await compare(password, user.user.password);

			// Check if the passwords matched
			if (matched) {
				// Delete user
				const delete_user: any = await _user.deleteUser(user.user.id);

				// Remove session
				req.session.passport = undefined;

				res.status(delete_user.status).send({
					deleted : delete_user.deleted, message : delete_user.message
				})
			}
			else {
			
				res.status(401).send({ message : 'Not authorized' })
			}
		}
		else {
			res.status(401).send({ message : 'Not authorized' })
		}
	}
}

export default Authentication;