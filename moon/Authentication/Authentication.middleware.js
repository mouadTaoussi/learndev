"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const main_config_1 = __importDefault(require(".././main.config"));
async function Authenticated(req, res, next) {
    const session = req.session.passport;
    const { user_token } = req.headers;
    if (!!user_token == false || user_token == "null" && !!session == true) {
        console.log(1);
        req.user = session.user;
        next();
    }
    if (!!user_token == true || user_token !== "null" && !!session == false) {
        console.log(user_token !== "null");
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        req.user = user;
        next();
    }
    if (!!user_token == true || user_token !== "null" && !!session == true) {
        console.log(3);
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        req.user = user;
        next();
    }
    if (!!user_token == false || user_token == "null" && !!session == false) {
        console.log(4);
        res.status(401).send({ loggedin: false, message: "you are not authorized!" });
        res.end();
    }
}
exports.default = Authenticated;
