import { UserModel } from './Authentication.models';
import { UserBody } from './Authentication.typedefinitions';

class UserService implements UserService {

	public async addUser(body : UserBody): Promise<{status:number, saved:boolean,user:any,message:string | null}> {
		try {
			const init_new_user = new UserModel(body);
			const new_user = await init_new_user.save();
			
			return {
			status : 200, saved : true, message : null, user : new_user }
		}
		catch(error) {
			return {
			status : 500, saved : false, message  : 'something went wrong! Try again.', user : null }
		}
	}
	public async findUser(options : {id?:string | undefined, email?:string | undefined, at_provider_id?: string | undefined})
	:Promise<{status:number, found:boolean, message:string | null, user:any}> 
	{
		try {
			if (options.id == undefined && options.email != undefined && options.at_provider_id == undefined) {

				const user = await UserModel.findOne({email: options.email});

				if (user == null ) return {
				status : 404, found : false, message : "user doesn't exists!", user: null };

				return {
				status : 200, found : true, message: null, user  : user }
			}
			else if (options.id != undefined && options.email == undefined && options.at_provider_id == undefined) {

				const user = await UserModel.findById(options.id);

				if (user == null ) return {
				status : 404, found : false, message : "user doesn't exists!", user: null };

				return {
				status : 200, found : true, message: null, user  : user }
			}
			else if (options.id == undefined && options.email == undefined && options.at_provider_id != undefined) {

				const user = await UserModel.findOne({at_provider_id : options.at_provider_id});

				if (user == null ) return {
				status : 404, found : false, message : "user doesn't exists!", user: null };

				return {
				status : 200, found : true, message: null, user  : user }
			}
			else if (options.id == undefined && options.email == undefined && options.at_provider_id == undefined) {
				// Get all users
				const users = await UserModel.find();

				if (users == null ) return {
				status : 404, found : false, message : "users doesn't exists!", user: null };

				return {
				status : 200, found : true, message: null, user  : users }
			}
			else {  
				return {
				status : 404, found : false, message: 'something went wrong! Try again.',user: null }
			}
		}
		catch(error) {
			return {
				status : 500, found : false, 
				message  : 'something went wrong! Try again.', user : null
			}
		}
	}
	public async deleteUser(user_id: string):Promise<{status:number, deleted: boolean,message: string}>
	{
		try {
			// Remove user
			const user = await UserModel.findById(user_id).remove();

			return { status : 200, deleted : true, message : 'user deleted successfully' }
		}
		catch(error) {
			return { status : 500, deleted : false, message : 'something went wrong! Try again.' }
		}
	}
	public async updateUser(user_id: string, body: UserBody):Promise<{status:number, updated:boolean,message:string, user:any}> 
	{
		try {
			const user = await UserModel.findByIdAndUpdate(user_id, body, {new : true});
			return { status: 200, updated: true, message: 'user updated successfully!', user: user }
		}
		catch(error) {

			return { 
				status: 500, updated: false, message: 'something went wrong! Try again.', user: null 
			}			
		}
	} async changePassword(id: string, password: string):Promise<{status:number, changed:boolean,message:string}>
	{
		try {
			console.log(1)
			const user = await UserModel.findByIdAndUpdate(id,{ password: password });
			console.log(user)
			return {
				status : 200, changed : true, message : 'password changed successfully!'
			}
		}
		catch(error) {

			return { status : 500, changed : false, message : 'something went wrong! Try again.' }
		}
	}
}

export default UserService;