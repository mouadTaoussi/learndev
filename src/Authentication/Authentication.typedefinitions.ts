import { Request, Response } from "express";

interface UserService {
	addUser (body : UserBody)                                             :Promise<{status:number, saved:boolean,user:any,message:string | null}>
	findUser(options : {id:string | undefined, email:string | undefined, at_provider_id: string | undefined}) :Promise<{status:number, found:boolean, message:string | null, user:any}> 
	deleteUser(user_id: string)                                           :Promise<{status:number, deleted: boolean,message: string}>
	updateUser(user_id: string, body: UserBody)                           :Promise<{status:number, updated:boolean,message:string,user:any}> 
	changePassword(id: string, password: string)                          :Promise<{status:number, changed:boolean,message:string}>
}

interface AuthenticationInt {
	 login   (req: Request, res: Response) :Promise<void>
	 register(req: Request, res: Response) :Promise<void>
	 resetPassword(req: Request, res: Response) :Promise<void>
	 updateProfile(req: Request, res: Response) :Promise<void>
	 deleteAccount(req: Request, res: Response) :Promise<void>
}

interface UserBody {
	at_provider_id? : string
	provider?       : string
	fullname       : string,
	user_name      : string,
	email          : string,
	avatar?         : string
	password?       : string
}

// interface UserUpdate {
// 	fullname       : string,
// 	user_name      : string,
// 	email          : string,
// 	password       : string
// }

export { UserService, AuthenticationInt, UserBody };