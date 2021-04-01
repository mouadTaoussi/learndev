import { Request, Response,NextFunction } from 'express';

export default function cors(request: Request, response:any,next:NextFunction){

	response.header("Access-Control-Allow-Origin", 'http://localhost:8080'); /* https://projectgigs.now.sh*/
	response.header("Access-Control-Allow-Credentials", true);
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Content-Type,Authorization');
	next();

};
