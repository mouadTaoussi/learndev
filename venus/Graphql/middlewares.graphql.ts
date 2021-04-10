import { MiddlewareFn } from "type-graphql";
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export const Authenticated: MiddlewareFn<any> = async ({context,info}:{context:any,info:any},next) => {
	const session     : any  = context.req.session.passport;
	const { user_token } : any  = context.req.headers;
	// console.log(user_token)
	// console.log(context.req.session)
	// if (session){ context.req.user = context.req.session.passport.user; await next() }

	// else { throw new Error('Not Authenticated') }
	console.log(context.req.headers)
	// JWT
	// await next();
	// if there is no user_token but there is a session
	if (!!user_token == false || user_token == 'null' && !!session == true) {
		// attach that to the user object
		context.req.user = session.user;
		// Call next function
		await next();

	}
	// if there is user_token but there is no session
	if (!!user_token == true || user_token !== 'null' && !!session == false) {
		// Find the appropriate user that owns this user_token
		const user = await verify(user_token,main_config.jwt_secret!);
		// attach that to the user object
		context.req.user = user;
		// Call next function
		await next();
	}
	// if there is user_token but there is session
	if (!!user_token == true || user_token !== 'null' && !!session == true) {
		// Find the appropriate user that owns this user_token
		const user = await verify(user_token,main_config.jwt_secret!);
		// attach that to the user object
		context.req.user = user;
		// Call next function
		await next();
	}
	// if there is no user_token and no session
	if (!!user_token == false || user_token == 'null' && !!session == false){
		throw new Error('Not Authenticated');
	}

};