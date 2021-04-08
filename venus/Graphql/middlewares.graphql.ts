import { MiddlewareFn } from "type-graphql";
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export const Authenticated: MiddlewareFn<any> = async ({context,info}:{context:any,info:any},next) => {
	const session     : any  = context.req.session.passport;
	const { jwtoken } : any  = context.req.query;
	// console.log(jwtoken)
	// console.log(context.req.session)
	// if (session){ context.req.user = context.req.session.passport.user; await next() }

	// else { throw new Error('Not Authenticated') }

	// JWT
	// await next();
	// if there is no jwtoken but there is a session
	if (!!jwtoken == false && !!session == true) {
		// attach that to the user object
		context.req.user = session.user;
		// Call next function
		await next();

	}
	// if there is jwtoken but there is no session
	if (!!jwtoken == true && !!session == false) {
		// Find the appropriate user that owns this jwtoken
		const user = await verify(jwtoken,main_config.jwt_secret!);
		// attach that to the user object
		context.req.user = user;
		// Call next function
		await next();
	}
	// if there is jwtoken but there is session
	if (!!jwtoken == true && !!session == true) {
		// Find the appropriate user that owns this jwtoken
		const user = await verify(jwtoken,main_config.jwt_secret!);
		// attach that to the user object
		context.req.user = user;
		// Call next function
		await next();
	}
	// if there is no jwtoken and no session
	if (!!jwtoken == false && !!session == false){
		throw new Error('Not Authenticated');
	}

};