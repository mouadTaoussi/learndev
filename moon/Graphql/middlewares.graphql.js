"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedInUser = exports.Authenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const main_config_1 = __importDefault(require(".././main.config"));
const Authenticated = async ({ context, info }, next) => {
    const session = context.req.session.passport;
    let { user_token } = context.req.headers;
    if (user_token == "undefined")
        user_token = undefined;
    if (user_token == "null")
        user_token = null;
    if (!!user_token == false && !!session == true) {
        context.req.user = session.user;
        await next();
    }
    if (!!user_token == true && !!session == false) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!!user_token == true && !!session == true) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!!user_token == false && !!session == false) {
        throw new Error('Not Authenticated');
    }
};
exports.Authenticated = Authenticated;
const LoggedInUser = async ({ context, info }, next) => {
    const session = context.req.session.passport;
    let { user_token } = context.req.headers;
    if (user_token == "undefined")
        user_token = undefined;
    if (user_token == "null")
        user_token = null;
    if (!!user_token == false && !!session == true) {
        context.req.user = session.user;
        await next();
    }
    if (!!user_token == true && !!session == false) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!!user_token == true && !!session == true) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!!user_token == false && !!session == false) {
        context.req.user = null;
        await next();
    }
};
exports.LoggedInUser = LoggedInUser;
