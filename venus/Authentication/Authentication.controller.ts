import __UserService__ from "./Authentication.service";
import __TopicService__ from ".././Topics/Topics.service";
import { UserService, AuthenticationInt, UserBody } from './Authentication.typedefinitions';
import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { sign, verify, decode } from 'jsonwebtoken';
import { createTransport } from "nodemailer";
import main_config from ".././main.config";
import { v4 } from "uuid";

const _user = new __UserService__();
const _topic = new __TopicService__();

class Authentication implements AuthenticationInt {
	public async getUser(req:Request,res:Response) :Promise<void>{

		// const user_id : any = req.user.id; 
		const user : any = req.user; 
		// Get user
		const current_user = await _user.findUser({id:user.id});
		// Get his topics
		const topics = await _topic.getUserTopics(user.id);
		// Get his upvoted content
		const upvoted_content = await _topic.getUpvotedContent(user.id);

		res.status(200).send({
			user : current_user.user,
			topics : topics.data,
			upvoted_content : upvoted_content.data
		})
	}
	public async login(req: Request | any, res: Response) :Promise<void>{
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
			
			// sign a token
			const user_token:string = sign({
				id:userExists.user._id, name: userExists.user.user_name, email: userExists.user.email, at_provider_id: null
			}, main_config.jwt_secret!);

			// send it back to the frontend
			res.status(userExists.status).send({ 
				loggedin : true, message : "Logged in!", user: userExists, token: user_token
			});
		}
	}
	public async logout(req: Request,res:Response) :Promise<void>{
		req.session.destroy(()=>{
			res.status(200).send({message:"logged out!"})
		})
	}
	public async register(req: Request  | any, res: Response) :Promise<void>{
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

		// Save user in the database
		const new_user = await _user.addUser(body);

		// Check whether saved or not
		if (new_user.saved == true) {

			// sign a session
			req.session.passport = {};
			req.session.passport.user = { id:new_user.user._id, name : body.user_name,  email: body.email, at_provider_id: null };

			// sign a token
			const user_token:string = sign({
				id:new_user.user._id, name : body.user_name, email: body.email, at_provider_id: null 
			}, main_config.jwt_secret!);

			// send it back to the frontend			
			res.status(200).send({ 
				registered : true, message: "Registered successfully!",user: new_user.user, token: user_token
			})

		}
		else {		
			res.status(200).send({
				registered : false,
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

			res.status(200).send({
				sent : true,
				message : "email sent to your inbox!",
			})
		}
		else {
			res.status(200).send({
				message : "Make sure to put a correct email!",
				sent    : false
			})
		}
	}
	public async changePassword(req: Request, res: Response) :Promise<void>{
		// Get the user by its session
		const authenticated_user : any = req.user;
		
		// Get body data // password
		const body: {current_password:string,new_password:string} =  req.body;

		// compare the old password
		const current_user = await _user.findUser({id: authenticated_user.id});

		// Load hash from your password DB.
		const matched: boolean = await compare( body.current_password, current_user.user.password );

		// if compared then
		if (matched != true) {res.status(200).send({ loggedin : false, message: "credentials aren't correct!" })}
		else {
			// Hash password
			// Hash password
			const salt = await genSalt(10);
			const hashed_password = await hash(body.new_password, salt);

			// Change password
			const changePassword = await _user.changePassword(authenticated_user.id, hashed_password);

			if (!changePassword.changed) { 
				res.status(200).send({changed: false,message : "The password was not changed!"});
				return;
			 }
			res.status(200).send({changed: true, message:"Password changed!"})
		}
	}
	public async updateProfile(req: Request  | any, res: Response) :Promise<void>{
		// Get the user by its session
		const authenticated_user : any = req.user;

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

				// sign a session
				req.session.passport = {};
				
				// Response backend
				req.session.passport.user = { 
					id:updating.user._id, name: updating.user.name, email: updating.user.email, at_provider_id: null 
				}

				// sign a token
				const user_token:string = sign({
					id:updating.user._id, name: updating.user.user_name, email: updating.user.email, at_provider_id: null 
				}, main_config.jwt_secret!);

				res.status(200).send({
					updated : updating.updated,
					message : updating.message, 
					token: user_token
				})
			}
			else {
				res.status(200).send({
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
			
			// sign a token
			const user_token:string = sign({
				id:updating.user._id, name: updating.user.user_name, email: updating.user.email, at_provider_id: null 
			}, main_config.jwt_secret!);

			res.status(200).send({
				updated : updating.updated,
				message : updating.message, 
				token: user_token
			})
		}
	}
	public async deleteAccount(req: Request  | any, res: Response) :Promise<void>{
		// Get the user by its session
		const authenticated_user : any = req.user;

		// Require password to change user data
		// Get the password to authorize user to change his credentials
		const { password } = req.query;

		if (!password) {res.status(200).send({ message:"no password provided!" }); res.end()};

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

				res.status(200).send({
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