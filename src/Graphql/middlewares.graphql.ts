import { MiddlewareFn } from "type-graphql";

export const Authenticated: MiddlewareFn<any> = async ({context,info}:{context:any,info:any},next) => {
  // const start = Date.now();
  // console.log("Middleware called")
  // const auth = !!context.req.session;
  // console.log(context.req.user)
  // if (auth){ await next() }
  // else { throw new Error('Not Authenticated') }
  await next();

};