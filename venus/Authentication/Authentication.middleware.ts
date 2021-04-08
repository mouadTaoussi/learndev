import  { Request, Response, NextFunction } from 'express';
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export async function Authenticated(req:Request, res:Response, next:NextFunction) :Promise<void> {
	// Get the user by its session
	const session     : any   = req.session.passport;
	const { jwtoken } : any   = req.query;

	// if there is no jwtoken but there is a session
	if (!!jwtoken == false && !!session == true) {
		// attach that to the user object
		req.user = session.user;
		// Call next function
		next();
	}
	// if there is jwtoken but there is no session
	if (!!jwtoken == true && !!session == false) {
		// Find the appropriate user that owns this jwtoken
		const user = await verify(jwtoken,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is jwtoken but there is session
	if (!!jwtoken == true && !!session == true) {
		// Find the appropriate user that owns this jwtoken
		const user = await verify(jwtoken,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is no jwtoken and no session
	if (!!jwtoken == false && !!session == false){
		res.status(401).send({ loggedin : false, message: "you are not authorized!" }); res.end(); return
	}
}