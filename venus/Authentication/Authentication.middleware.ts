import  { Request, Response, NextFunction } from 'express';
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export default async function Authenticated(req:Request, res:Response, next:NextFunction) :Promise<void> {
	// Get the user by its session
	const session      : any   = req.session.passport;
	let { user_token } : any   = req.headers;

	// Check for user_token false value
	if (user_token == "undefined") user_token = undefined; 
	if (user_token == "null") user_token = null;

	// if there is no user_token but there is a session
	if (!!user_token == false && !!session == true) {
		
		// attach that to the user object
		req.user = session.user;
		// Call next function
		next();
	}
	// if there is user_token but there is no session
	if (!!user_token == true && !!session == false) {
		
		// Find the appropriate user that owns this user_token
		const user = await verify(user_token,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is user_token but there is session
	if (!!user_token == true && !!session == true) {
		
		// Find the appropriate user that owns this user_token
		const user = await verify(user_token,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is no user_token and no session
	if (!!user_token == false && !!session == false){
		res.status(401).send({ loggedin : false, message: "you are not authorized!" }); res.end();
	}
}