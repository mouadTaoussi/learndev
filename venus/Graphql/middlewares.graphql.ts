import { MiddlewareFn } from "type-graphql";
import { sign, verify, decode } from 'jsonwebtoken';
import main_config from ".././main.config";

export const Authenticated: MiddlewareFn<any> = async ({context,info}:{context:any,info:any},next) => {
	const authenticated_user = context.req.session.passport;
	const { token }          = context.req.query;
	console.log(authenticated_user)
	// console.log(token)
	// console.log(context.req.session)
	// if (authenticated_user){ context.req.user = context.req.session.passport.user; await next() }

	// else { throw new Error('Not Authenticated') }

	// JWT
	// await next();
	// if there is token but no session
	if (!token && authenticated_user !== undefined) {
		// attach that to the user object
		context.req.user = authenticated_user.user;
		// Call next function
		await next();

	}
	// if there is token but there is no session
	if (token && authenticated_user == undefined  ) {
		// Find the appropriate user that owns this token
		const user = await verify(token,main_config.jwt_secret!);
		// attach that to the user object
		context.req.user = user;
		// Call next function
		await next();

	}
	// if there is token but there is session
	if (token && authenticated_user !== undefined  ) {
		// Find the appropriate user that owns this token
		const user = await verify(token,main_config.jwt_secret!);
		// attach that to the user object
		context.req.user = user;
		// Call next function
		await next();

	}
	// if there is no token and no session
	if (!token && authenticated_user == undefined){
		throw new Error('Not Authenticated');
	}

};