"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticated = void 0;
const Authenticated = async ({ context, info }, next) => {
    const auth = !!context.req.session.passport;
    if (auth) {
        context.req.user = context.req.session.passport.user;
        await next();
    }
    else {
        throw new Error('Not Authenticated');
    }
};
exports.Authenticated = Authenticated;
