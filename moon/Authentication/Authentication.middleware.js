"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const main_config_1 = __importDefault(require(".././main.config"));
async function Authenticated(req, res, next) {
    const session = req.session.passport;
    const { user_token } = req.query;
    if (!!user_token == false && !!session == true) {
        req.user = session.user;
        next();
    }
    if (!!user_token == true && !!session == false) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        req.user = user;
        next();
    }
    if (!!user_token == true && !!session == true) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        req.user = user;
        next();
    }
    if (!!user_token == false && !!session == false) {
        res.status(401).send({ loggedin: false, message: "you are not authorized!" });
        res.end();
        return;
    }
}
exports.default = Authenticated;
