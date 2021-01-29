"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const Authentication_controller_1 = __importDefault(require("./Authentication.controller"));
const router = express_1.Router();
const auth = new Authentication_controller_1.default();
router.get('/login', (req, res) => { res.json(req.session); console.log(req.session); });
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/Oauth/login', passport_1.default.authenticate('github', { scope: ["profile", "email"] }));
router.get('/Oauth/callback', passport_1.default.authenticate('github', { failureRedirect: '/login', successRedirect: "/graphql" }));
router.post('/resetPassword', auth.resetPassword);
router.put('/updateUser', auth.updateProfile);
router.delete('/deleteUser', auth.deleteAccount);
exports.default = router;
