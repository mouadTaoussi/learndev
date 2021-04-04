import express, { Application, Request, Response } from 'express';
import express_session from 'express-session';
import redis from 'redis';
const  RedisStore = require('connect-redis')(express_session);
import bodyParser from "body-parser"; 
import helmet from "helmet";
import xss from 'xss';
import moment from "moment";
import passport from "passport";
import { connect } from "mongoose";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, ResolverData } from "type-graphql";
import "reflect-metadata";
import 'class-validator';
// Import resolvers
import main_config from './main.config';
import main_cors from './main.cors';
import cors from "cors";
import AuthenticationRoutes from './Authentication/Authentication.routes';
import './Authentication/Authentication.strategies';
import { 
	topicResolver, topicInfoResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver, upvoteResolver 
} from './Graphql/Topics/Topics.resolvers';

const app : Application = express();

// create the connection to the mongodb
connect(main_config.mongodb,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	,(error:any)=>{
	if (error){
		console.log(error);
	}else {
		console.log('Database up and running!');
	}
});

app.use(main_cors);

// Redis connection
const redisClient: unknown = redis.createClient({
	host : main_config.redis_host,
	port : main_config.redis_port,
	password : main_config.redis_password
});

app.set('trustproxy', 1);
app.use(express_session({
	name  : "GGHH",
	secret: 'IDFVBHNIOVFFBUE',
	resave: true,
	saveUninitialized: false,
	store : new RedisStore({ 
		host: main_config.redis_host, 
		port: main_config.redis_port, 
		client: redisClient 
	}),
	cookie: { /*secure: true, /*sameSite : "none",*/ /*domain : "learndevelopment.vercel.app"*/ } // Error here !!!
}))

// Ïnit passport app and routes
app.use(passport.initialize());
app.use(passport.session());

async function runapp (){

	// Run apollo server 
	const apollo = new ApolloServer({
		schema : await buildSchema({
			resolvers : [
				topicResolver,  topicInfoResolver, docsResolver,
				courseResolver, articleResolver,   projectIdeaResolver, upvoteResolver
			],
			globalMiddlewares: []
		}),
		context: ({ req, res }) =>{
			return { req, res };
			// http://localhost:8000/graphql?query=query%20%7B%0A%20%20getTopic%28topic_id%20%3A%20%22Mouad%20Tapss%22%29%20%7B%0A%20%20%20%20user_id%0A%20%20%20%20topic_title%0A%20%20%20%20background_image%0A%20%20%20%20docs%20%7B%0A%20%20%20%20%20%20user_id%0A%20%20%20%20%20%20docs_link%0A%20%20%20%20%20%20docs_title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D
			// return {
			// 	getUser: () => req.session.passport || req.session.local,
			// 	logout: () => req.logout(),
			// }
		},
		playground :  true
	})
	apollo.applyMiddleware({ app, cors: { 
		origin: main_config.front_end_origin, 
		credentials: true,
		methods: ["POST","OPTIONS"],
	} });

	// Init body parser and helmet and cors
	app.use(helmet());
	app.use(bodyParser.json());

	app.use('/auth', AuthenticationRoutes);

}
runapp();

const PORT : string | undefined = main_config.port || main_config.port_dev;
const MODE : string | undefined = main_config.mode;

app.listen(PORT);


// Init cookie cookie-session
// app.use(cookieSession({
// 	keys : ["IDFVBHNIOVFFBUE"],
// 	name : 'DBDIUN',
// 	secret : "IDFVBHNIOVFFBUE"
// }));
