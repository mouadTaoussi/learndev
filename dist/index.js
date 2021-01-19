"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = require("mongoose");
require("reflect-metadata");
const main_config_1 = __importDefault(require("./main.config"));
const Authentication_routes_1 = __importDefault(require("./Authentication/Authentication.routes"));
require("./Authentication/Authentication.strategies");
const app = express_1.default();
async function runapp() {
    mongoose_1.connect(main_config_1.default.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Database up and running!');
        }
    });
    app.use(helmet_1.default());
    app.use(body_parser_1.default.json());
    passport_1.default.initialize();
    app.use('/auth', Authentication_routes_1.default);
}
runapp();
const PORT = process.env.PORT_DEV || process.env.PORT;
const MODE = process.env.MODE;
app.listen(PORT);
