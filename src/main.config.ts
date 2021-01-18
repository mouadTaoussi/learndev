import dotenv from "dotenv";

dotenv.config({path:'.env'});

interface config {
	mongodb : string,
	email   : string,
	pass    : string,
	port    : string,
	mode    : string
}

const main_config : config = {
	mongodb : process.env.MONGO_CONNECTION!,
	email   : process.env.EMAIL!,
	pass    : process.env.PASS!,
	port    : process.env.PORT_DEV!,
	mode    : process.env.MODE!
}

export default main_config;