"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_service_1 = __importDefault(require("./Authentication.service"));
const Topics_service_1 = __importDefault(require(".././Topics/Topics.service"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = require("nodemailer");
const main_config_1 = __importDefault(require(".././main.config"));
const uuid_1 = require("uuid");
const _user = new Authentication_service_1.default();
const _topic = new Topics_service_1.default();
class Authentication {
    async getUser(req, res) {
        const user = req.user;
        const current_user = await _user.findUser({ id: user.id });
        const topics = await _topic.getUserTopics(user.id);
        const upvoted_content = await _topic.getUpvotedContent(user.id);
        res.status(200).send({
            user: current_user.user,
            topics: topics.data,
            upvoted_content: upvoted_content.data
        });
    }
    async login(req, res) {
        const { email, password } = req.body;
        const userExists = await _user.findUser({ email: email });
        if (userExists.found !== true) {
            res.status(404).send({ loggedin: false, message: "user not exists!" });
            res.end();
            return;
        }
        ;
        if (userExists.user.provider == "passport") {
            res.status(404).send({ loggedin: false, message: "sign up with the services available!" });
            res.end();
            return;
        }
        const matched = await bcrypt_1.compare(password, userExists.user.password);
        if (matched != true) {
            res.status(404).send({ loggedin: false, message: "credentials aren't correct!" });
        }
        else {
            req.session.passport = {};
            req.session.passport.user = {
                id: userExists.user._id, name: userExists.user.user_name, email: userExists.user.email, at_provider_id: null
            };
            const user_token = jsonwebtoken_1.sign({
                id: userExists.user._id, name: userExists.user.user_name, email: userExists.user.email, at_provider_id: null
            }, main_config_1.default.jwt_secret);
            res.status(userExists.status).send({
                loggedin: true, message: "Logged in!", user: userExists, token: user_token
            });
        }
    }
    async logout(req, res) {
        req.session.destroy(() => {
            res.status(200).send({ message: "logged out!" });
        });
    }
    async register(req, res) {
        const body = req.body;
        if (body.email == null || body.email == undefined || body.email == "") {
            res.status(200).send({ registered: false, message: "Fill all of the inputs!" });
            res.end();
            return;
        }
        else if (body.password == null || body.password == undefined || body.password == "") {
            res.status(200).send({ registered: false, message: "Fill all of the inputs!" });
            res.end();
            return;
        }
        else if (body.fullname == null || body.fullname == undefined || body.fullname == "") {
            res.status(200).send({ registered: false, message: "Fill all of the inputs!" });
            res.end();
            return;
        }
        else if (body.user_name == null || body.user_name == undefined || body.user_name == "") {
            res.status(200).send({ registered: false, message: "Fill all of the inputs!" });
            res.end();
            return;
        }
        const isAlreadyExists = await _user.findUser({ email: body.email });
        if (isAlreadyExists.found == true) {
            res.status(200).send({ registered: false, message: "email exists!" });
            res.end();
            return;
        }
        const salt = await bcrypt_1.genSalt(10);
        const hashed_password = await bcrypt_1.hash(body.password, salt);
        body.password = hashed_password;
        const new_user = await _user.addUser(body);
        if (new_user.saved == true) {
            req.session.passport = {};
            req.session.passport.user = { id: new_user.user._id, name: body.user_name, email: body.email, at_provider_id: null };
            const user_token = jsonwebtoken_1.sign({
                id: new_user.user._id, name: body.user_name, email: body.email, at_provider_id: null
            }, main_config_1.default.jwt_secret);
            res.status(200).send({
                registered: true, message: "Registered successfully!", user: new_user.user, token: user_token
            });
        }
        else {
            res.status(200).send({
                registered: false,
                message: "Something went wrong!"
            });
        }
    }
    async resetPassword(req, res) {
        const body = req.body;
        const user = await _user.findUser({ email: body.email });
        if (user.found == true) {
            const password = uuid_1.v4();
            const salt = await bcrypt_1.genSalt(10);
            const hashed_password = await bcrypt_1.hash(password, salt);
            const updatePassword = await _user.changePassword(user.user._id, hashed_password);
            var transporter = nodemailer_1.createTransport({
                service: 'gmail',
                auth: { user: main_config_1.default.email, pass: main_config_1.default.pass }
            });
            let mailTemplate;
            transporter.sendMail({
                from: '"Learndev Team" <mouadtaoussi0@gmail.com>',
                to: user.user.email,
                subject: 'Reset password request',
                text: 'Hey there, it’s your temporary password to log in and change it ;) ' + password,
                html: mailTemplate
            });
            res.status(200).send({
                sent: true,
                message: "email sent to your inbox!",
            });
        }
        else {
            res.status(200).send({
                message: "Make sure to put a correct email!",
                sent: false
            });
        }
    }
    async changePassword(req, res) {
        const authenticated_user = req.user;
        const body = req.body;
        const current_user = await _user.findUser({ id: authenticated_user.id });
        const matched = await bcrypt_1.compare(body.current_password, current_user.user.password);
        if (matched != true) {
            res.status(200).send({ loggedin: false, message: "credentials aren't correct!" });
        }
        else {
            const salt = await bcrypt_1.genSalt(10);
            const hashed_password = await bcrypt_1.hash(body.new_password, salt);
            const changePassword = await _user.changePassword(authenticated_user.id, hashed_password);
            if (!changePassword.changed) {
                res.status(200).send({ changed: false, message: "The password was not changed!" });
                return;
            }
            res.status(200).send({ changed: true, message: "Password changed!" });
        }
    }
    async updateProfile(req, res) {
        const authenticated_user = req.user;
        const body = req.body;
        const userEmail = await _user.findUser({ email: body.email });
        if (userEmail.found == true) {
            if (authenticated_user.email == body.email) {
                const updating = await _user.updateUser(authenticated_user.id, body);
                req.session.passport.user = {
                    id: updating.user._id, name: updating.user.name, email: updating.user.email, at_provider_id: null
                };
                const user_token = jsonwebtoken_1.sign({
                    id: updating.user._id, name: updating.user.user_name, email: updating.user.email, at_provider_id: null
                }, main_config_1.default.jwt_secret);
                res.status(200).send({
                    updated: updating.updated,
                    message: updating.message,
                    token: user_token
                });
            }
            else {
                res.status(200).send({
                    updated: false,
                    message: "Email alreay provided!"
                });
            }
        }
        else {
            const updating = await _user.updateUser(authenticated_user.id, body);
            req.session.passport.user = {
                id: updating.user._id, name: updating.user.user_name, email: updating.user.email, at_provider_id: null
            };
            const user_token = jsonwebtoken_1.sign({
                id: updating.user._id, name: updating.user.user_name, email: updating.user.email, at_provider_id: null
            }, main_config_1.default.jwt_secret);
            res.status(200).send({
                updated: updating.updated,
                message: updating.message,
                token: user_token
            });
        }
    }
    async deleteAccount(req, res) {
        const authenticated_user = req.user;
        const { password } = req.query;
        if (!password) {
            res.status(200).send({ message: "no password provided!" });
            res.end();
        }
        ;
        const user = await _user.findUser({ email: authenticated_user.email });
        if (user.found == true) {
            const matched = await bcrypt_1.compare(password, user.user.password);
            if (matched) {
                const delete_user = await _user.deleteUser(user.user.id);
                req.session.passport = undefined;
                res.status(200).send({
                    deleted: delete_user.deleted, message: delete_user.message
                });
            }
            else {
                res.status(401).send({ message: 'Not authorized' });
            }
        }
        else {
            res.status(401).send({ message: 'Not authorized' });
        }
    }
}
exports.default = Authentication;
