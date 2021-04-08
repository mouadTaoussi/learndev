"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const main_config_1 = __importDefault(require(".././main.config"));
const Authenticated = async ({ context, info }, next) => {
    const session = context.req.session.passport;
    const { jwtoken } = context.req.query;
    if (!!jwtoken == false && !!session == true) {
        context.req.user = session.user;
        await next();
    }
    if (!!jwtoken == true && !!session == false) {
        const user = await jsonwebtoken_1.verify(jwtoken, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!!jwtoken == true && !!session == true) {
        const user = await jsonwebtoken_1.verify(jwtoken, main_config_1.default.jwt_secret);
        context.req.user = user;
        await next();
    }
    if (!!jwtoken == false && !!session == false) {
        throw new Error('Not Authenticated');
    }
};
exports.Authenticated = Authenticated;
