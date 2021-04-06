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
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
require("class-validator");
const main_config_1 = __importDefault(require("./main.config"));
const main_cors_1 = __importDefault(require("./main.cors"));
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
app.use(main_cors_1.default);
const redisClient = redis_1.default.createClient({
    host: main_config_1.default.redis_host,
    port: main_config_1.default.redis_port,
    password: main_config_1.default.redis_password
});
app.set('trustproxy', 1);
app.use(express_session_1.default({
    name: "GGHH",
    secret: 'IDFVBHNIOVFFBUE',
    resave: true,
    saveUninitialized: false,
    store: new RedisStore({
        host: main_config_1.default.redis_host,
        port: main_config_1.default.redis_port,
        client: redisClient
    }),
    cookie: {
        secure: false, sameSite: "none"
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
async function runapp() {
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [
                Topics_resolvers_1.topicResolver, Topics_resolvers_1.topicInfoResolver, Topics_resolvers_1.docsResolver,
                Topics_resolvers_1.courseResolver, Topics_resolvers_1.articleResolver, Topics_resolvers_1.projectIdeaResolver, Topics_resolvers_1.upvoteResolver
            ],
            globalMiddlewares: []
        }),
        context: ({ req, res }) => {
            return { req, res };
        },
        playground: true
    });
    apollo.applyMiddleware({ app, cors: {
            origin: main_config_1.default.front_end_origin,
            credentials: true,
            methods: ["POST", "OPTIONS"],
        } });
    app.use(helmet_1.default());
    app.use(body_parser_1.default.json());
    app.use('/auth', Authentication_routes_1.default);
}
runapp();
const PORT = main_config_1.default.port || main_config_1.default.port_dev;
const MODE = main_config_1.default.mode;
app.listen(PORT);
