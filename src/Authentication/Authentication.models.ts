import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
	at_provider_id : {
		type: String, required: true, default : null
	},
	provider : { 
		type: String, required: true, default : 'local'
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
		type: String, required: true, default: null
	},
	password : {
		type: String, required: false, default: null
	}
});


const UserModel = model('users', UserSchema);

export { UserModel };