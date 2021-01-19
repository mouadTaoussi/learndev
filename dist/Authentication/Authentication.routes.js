"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/login', (req, res) => {
    res.send('Hello World');
});
router.get('/register');
router.get('/changePassword');
router.get('/updateUser');
router.get('/deleteUser');
exports.default = router;
