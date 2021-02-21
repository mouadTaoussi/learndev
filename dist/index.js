"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const RedisStore = require('connect-redis')(express_session_1.default);
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = require("mongoose");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const main_config_1 = __importDefault(require("./main.config"));
const cors_1 = __importDefault(require("cors"));
const Authentication_routes_1 = __importDefault(require("./Authentication/Authentication.routes"));
require("./Authentication/Authentication.strategies");
const Topics_resolvers_1 = require("./Graphql/Topics/Topics.resolvers");
const app = express_1.default();
mongoose_1.connect(main_config_1.default.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
const redisClient = redis_1.default.createClient({
    host: main_config_1.default.redis_host,
    port: main_config_1.default.redis_port,
    password: main_config_1.default.redis_password
});
app.set('trustproxy', true);
app.use(express_session_1.default({
    name: "GGHH",
    secret: 'IDFVBHNIOVFFBUE',
    resave: true,
    saveUninitialized: false,
    store: new RedisStore({
        host: process.env.redis_host,
        port: main_config_1.default.redis_port,
        client: redisClient
    }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
async function runapp() {
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [
                Topics_resolvers_1.topicResolver, Topics_resolvers_1.docsResolver, Topics_resolvers_1.courseResolver,
                Topics_resolvers_1.articleResolver, Topics_resolvers_1.projectIdeaResolver
            ],
            globalMiddlewares: []
        }),
        context: ({ req, res }) => {
            console.log(req.session);
            return { req, res };
        },
        playground: false
    });
    apollo.applyMiddleware({ app });
    app.use(helmet_1.default());
    app.use(body_parser_1.default.json());
    app.use(cors_1.default({ origin: 'http://localhost:8080', credentials: true }));
    app.use('/auth', Authentication_routes_1.default);
}
runapp();
const PORT = process.env.PORT_DEV || process.env.PORT;
const MODE = process.env.MODE;
app.listen(PORT);
