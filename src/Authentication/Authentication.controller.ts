import __UserService__ from "./Authentication.service";
import { UserService, Authentication, UserBody, UserUpdate } from './Authentication.typedefinitions';
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const _user = new __UserService__();

class __Authentication__ implements Authentication {
	public async login(req: Request, res: Response) :Promise<void>{
		res.send('Hello World')
	}
	public async register(req: Request, res: Response) :Promise<void>{
		res.send('Hello World')
	}
	public async resetPassword(req: Request, res: Response) :Promise<void>{
		res.send('Hello World')
	}
	public async updateProfile(req: Request, res: Response) :Promise<void>{
		res.send('Hello World')
	}
	public async deleteAccount(req: Request, res: Response) :Promise<void>{
		res.send('Hello World')
	}
}

export default __Authentication__;