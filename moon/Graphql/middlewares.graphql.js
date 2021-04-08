"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const main_config_1 = __importDefault(require(".././main.config"));
const Authenticated = async ({ context, info }, next) => {
    const authenticated_user = context.req.session.passport;
    const { token } = context.req.query;
    console.log(authenticated_user);
    if (!token && authenticated_user !== undefined) {
        context.req.user = authenticated_user.user;
        await next();
    }
    if (token && authenticated_user == undefined) {
        const user = await jsonwebtoken_1.verify(token, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (token && authenticated_user !== undefined) {
        const user = await jsonwebtoken_1.verify(token, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!token && authenticated_user == undefined) {
        throw new Error('Not Authenticated');
    }
};
exports.Authenticated = Authenticated;
