interface UserService {
	addUser(body : UserBody)                                              :Promise<{status:number, saved:boolean,user:any,message:string | null}>
	findUser(options : {id:string | undefined, email:string | undefined}) :Promise<{status:number, found:boolean, message:string | null, user:any}> 
	deleteUser(user_id: string)                                           :Promise<{status:number, deleted: boolean,message: string}>
	updateUser(user_id: string, body: UserUpdate)                         :Promise<{status:number, updated:boolean,message:string}> 
	changePassword(id: string, password: string)                          :Promise<{status:number, changed:boolean,message:string}>
}

interface UserBody {
	at_provider_id : string,
	fullname       : string,
	user_name      : string,
	email          : string,
	avatar         : string,
	provider       : string,
	password       : string
}

interface UserUpdate {
	fullname       : string,
	user_name      : string,
	email          : string,
	password       : string
}

export { UserService, UserBody, UserUpdate }