"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const Authentication_controller_1 = __importDefault(require("./Authentication.controller"));
const Authentication_middleware_1 = __importDefault(require("./Authentication.middleware"));
const main_config_1 = __importDefault(require(".././main.config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const router = express_1.Router();
const auth = new Authentication_controller_1.default();
router.get('/login', (req, res) => { res.json(req.session); console.log(req.session); });
router.get('/getuser', Authentication_middleware_1.default, auth.getUser);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/register', auth.register);
router.get('/Oauth/login', passport_1.default.authenticate('github', { scope: ["profile", "email"] }));
router.get('/Oauth/callback', passport_1.default.authenticate('github', {
    failureRedirect: `${main_config_1.default.front_end_origin}/login`
}), function (req, res) {
    const user_token = jsonwebtoken_1.sign(req.user, main_config_1.default.jwt_secret);
    res.redirect(`${main_config_1.default.front_end_origin}/topics?Oauth=true`);
});
router.post('/resetPassword', auth.resetPassword);
router.post('/changePassword', Authentication_middleware_1.default, auth.changePassword);
router.post('/updateUser', Authentication_middleware_1.default, auth.updateProfile);
router.delete('/deleteUser', Authentication_middleware_1.default, auth.deleteAccount);
exports.default = router;
