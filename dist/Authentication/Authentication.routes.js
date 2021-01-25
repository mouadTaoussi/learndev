"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.get('/login', (req, res) => { res.json(req.user); });
router.get('/register');
router.get('/Oauth/login', passport_1.default.authenticate('github', { scope: ["profile", "email"] }));
router.get('/Oauth/callback', passport_1.default.authenticate('github', { failureRedirect: '/login', successRedirect: "/graphql" }));
router.get('/changePassword');
router.get('/updateUser');
router.get('/deleteUser');
exports.default = router;
