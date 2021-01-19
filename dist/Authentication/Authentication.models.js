"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    at_provider_id: {
        type: String, required: false
    },
    fullname: {
        type: String, required: true
    },
    user_name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    avatar: {
        type: String, required: true
    },
    provider: {
        type: String, default: 'local'
    },
    password: {
        type: String, required: false
    }
});
const UserModel = mongoose_1.model('users', UserSchema);
exports.UserModel = UserModel;
