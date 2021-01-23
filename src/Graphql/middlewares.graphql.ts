import { MiddlewareFn } from "type-graphql";

export const Authenticated: MiddlewareFn<any> = async ({ context, info }, next) => {
  // const start = Date.now();
  console.log("Middleware called")
  const auth = !!context.req.session;

  if (auth){ await next() }
  else { throw new Error('Not Authenticated') }

};