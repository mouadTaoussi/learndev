import  { Request, Response, NextFunction } from 'express';
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export async function Authenticated(req:Request, res:Response, next:NextFunction) :Promise<void> {
	// Get the user by its session
	const authenticated_user = req.session.passport;
	const { token }          = req.query;

	// if there is token but no session
	if (!token && authenticated_user !== undefined) {
		// attach that to the user object
		req.user = authenticated_user.user;
		// Call next function
		next();
	}
	// if there is token but there is no session
	if (token && authenticated_user !== undefined  ) {
		// Find the appropriate user that owns this token
		const user = await verify(token,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is token but there is session
	if (token && authenticated_user == undefined  ) {
		// Find the appropriate user that owns this token
		const user = await verify(token,main_config.jwt_secret!);
		// attach that to the user object
		req.user = user;
		// Call next function
		next();
	}
	// if there is no token and no session
	if (!token && authenticated_user == undefined){
		res.status(401).send({ loggedin : false, message: "you are not authorized!" }); res.end(); return
	}
}