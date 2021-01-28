import { MiddlewareFn } from "type-graphql";

export const Authenticated: MiddlewareFn<any> = async ({context,info}:{context:any,info:any},next) => {

	const auth = !!context.req.session.passport || !!context.req.session.local;

	if (auth){ context.req.user = context.req.session.passport || context.req.session.local; await next() }

	else { throw new Error('Not Authenticated') }

	// await next();

};