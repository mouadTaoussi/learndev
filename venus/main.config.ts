import dotenv from "dotenv";

dotenv.config({path:'.env'});

interface config {
	mongodb : string,
	email   : string,
	pass    : string,
	port    : string,
	port_dev: string,
	mode    : string,
	github_public_key   : string,
	github_private_key  : string,
	github_callback_url : string,
	redis_host          : string,
	redis_port          : string,
	redis_password      : string,
	jwt_secret          : string,
	front_end_origin    : string
}

const main_config : config = {
	mongodb : process.env.MONGO_CONNECTION!,
	email   : process.env.EMAIL!,
	pass    : process.env.PASS!,
	port    : process.env.PORT!, // Added by heroku !!
	port_dev: process.env.PORT_DEV!,
	mode    : process.env.MODE!,
	github_public_key   : process.env.GITHUB_PUBLIC_KEY!,
	github_private_key  : process.env.GITHUB_PRIVATE_KEY!,
	github_callback_url : process.env.GITHUB_CALLBACK_URL!,
	redis_host          : process.env.REDIS_LABS_HOST!,
	redis_port          : process.env.REDIS_LABS_PORT!,
	redis_password      : process.env.REDIS_LABS_PASSWORD!,
	jwt_secret          : "string",
	front_end_origin    : "http://localhost:8080"  //https://learndevelopment.vercel.app
}

export default main_config;