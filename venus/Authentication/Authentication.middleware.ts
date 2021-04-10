import  { Request, Response, NextFunction } from 'express';
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export default async function Authenticated(req:Request, res:Response, next:NextFunction) :Promise<void> {
	// Get the user by its session
	const session     : any   = req.session.passport;
	const { user_token } : any   = req.headers;

	// if there is no user_token but there is a session
	if (!!user_token == false && !!session == true) {
		console.log(1)
		// attach that to the user object
		req.user = session.user;
		// Call next function
		next();
	}
	// if there is user_token but there is no session
	if (!!user_token == true && !!session == false) {
		console.log(!!user_token)
		// Find the appropriate user that owns this user_token
		const user = await verify(user_token,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is user_token but there is session
	if (!!user_token == true && !!session == true) {
		console.log(3)
		// Find the appropriate user that owns this user_token
		const user = await verify(user_token,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is no user_token and no session
	if (!!user_token == false && !!session == false){
		console.log(4)
		res.status(401).send({ loggedin : false, message: "you are not authorized!" }); res.end();
	}
}