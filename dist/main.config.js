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
    mode: process.env.MODE,
    github_public_key: process.env.GITHUB_PUBLIC_KEY,
    github_private_key: process.env.GITHUB_PRIVATE_KEY,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    redis_host: process.env.REDIS_LABS_HOST,
    redis_port: process.env.REDIS_LABS_PORT,
    redis_password: process.env.REDIS_LABS_PASSWORD,
};
exports.default = main_config;
