import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
	at_provider_id : {
		type: String, required: false
	},
	fullname : {
		type: String, required: true 
	},
	user_name : { 
		type: String, required: true 
	},
	email : { 
		type: String, required: true 
	},
	avatar : { 
		type: String, required: true 
	},
	provider : { 
		type: String, default : 'local'
	},
	password : {
		type: String, required: false
	}
});


const UserModel = model('users', UserSchema);

export { UserModel };