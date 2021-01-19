"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const main_config = {
    mongodb: process.env.MONGO_CONNECTION,
    email: process.env.EMAIL,
    pass: process.env.PASS,
    port: process.env.PORT_DEV,
    mode: process.env.MODE
};
exports.default = main_config;
