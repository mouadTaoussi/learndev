import express, { Application, Request, Response } from 'express';
import express_session from 'express-session';
import bodyParser from "body-parser"; 
import helmet from "helmet";
import xss from 'xss';
import moment from "moment";
import passport from "passport";
import { connect } from "mongoose";
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, ResolverData } from "type-graphql";
// Import resolvers
import main_config from './main.config';
import AuthenticationRoutes from './Authentication/Authentication.routes';
import './Authentication/Authentication.strategies';
import { 
	topicResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver 
} from './Graphql/Topics/Topics.resolvers';
import cookieSession from 'cookie-session';

const app : Application = express();
 
// Init cookie cookie-session
// app.use(cookieSession({
// 	keys : ["IDFVBHNIOVFFBUE"],
// 	name : 'DBDIUN',
// 	secret : "IDFVBHNIOVFFBUE"
// }));

app.use(express_session({
	name : "GGHH",
	secret: 'IDFVBHNIOVFFBUE',
	resave: true,
	saveUninitialized: true
	// cookie: { secure: true, maxAge : 60000 }
}))

// Ïnit passport app and routes
app.use(passport.initialize());
app.use(passport.session());

async function runapp (){
	// create the connection to the mongodb
	connect(main_config.mongodb,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
		,(error:any)=>{
		if (error){
			console.log(error);
		}else {
			console.log('Database up and running!');
		}
	});

	// Run apollo server 
	const apollo = new ApolloServer({
		schema : await buildSchema({
			resolvers : [
				topicResolver, docsResolver, courseResolver, articleResolver, projectIdeaResolver
			],
			globalMiddlewares: []
		}),
		context: ({ req, res }) =>{
			console.log("context")
			console.log(req.session) // cannot get session object then Get undefined 
			return {
				getUser: () => req.user,
				logout: () => req.logout(),
			}
		},
		playground : false
	})
	apollo.applyMiddleware({ app });

	// Init body parser and helmet 
	app.use(helmet());
	app.use(bodyParser.json());

	app.use('/auth', AuthenticationRoutes)

}
runapp();

const PORT : string | undefined = process.env.PORT_DEV || process.env.PORT;
const MODE : string | undefined = process.env.MODE;

app.listen(PORT);