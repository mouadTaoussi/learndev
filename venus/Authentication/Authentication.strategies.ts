import __UserService__ from "./Authentication.service";
import { UserBody } from "./Authentication.typedefinitions";
import passport from 'passport';
import GitHubStrategy from "passport-github2";
import config from '.././main.config';

const _user = new __UserService__();

passport.use(new GitHubStrategy({
	clientID     : config.github_public_key,
	clientSecret : config.github_private_key,
	callbackURL  : config.github_callback_url
	},
	async function(accessToken:string, refreshToken:string, profile:any, done:any) {
		// const user = _user.findUser({id:undefined, email:undefined, at_provider_id:profile})
		const user : UserBody = {
			at_provider_id: profile.id,
			provider : "github",
			fullname : profile.displayName,
			email    : profile._json.email,
			user_name: profile.username,
			avatar   : profile._json.avatar_url
		}
		
		try {
			// check user in database
			const isUserExists = await _user.findUser({at_provider_id : user.at_provider_id});

			// user exists
			if (isUserExists.found == true) { 
				done(null,{id: isUserExists.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id}); 
			}
			// user doesn't exits
			else {
				
				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await _user.findUser({ email: user.email });

				if ( isEmailExists.found == true ) {
					// We gonna save the user without email and let hima put an email in future
					user.email = null!;

					// Save user
					const saving = await _user.addUser(user);
					// Done with that	
					done(null,{id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id})
				}
				else {
					const saving = await _user.addUser(user);

					// Done with that
					done(null,{id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id})	
				}
			}
			
		}catch(err) {
			return done(err, null )
		}
	}
));

passport.serializeUser((user, done) => {
    done(null, user!)
});
passport.deserializeUser(function(user, done) {
	done(null, user!)
});
// export 

// User has email in his github account
// if (user.email !== null) {
// 	const isEmailExists = await _user.findUser({email : user.email});

// 	if (isEmailExists.user !== null) {
// 		console.log("User found")
// 		// Check if the user already exists <Log in>
// 		if (
// 			isEmailExists.user.provider == "github" 
// 								&& 
// 			isEmailExists.user.at_provider_id == user.at_provider_id
// 		){
// 			console.log("User has account");
// 			return done(null, {id: isEmailExists.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
// 		}
// 		// Check if the email already exists 
// 		else if ( isEmailExists.user.provider != "github" || isEmailExists.user.at_provider_id != user.at_provider_id )
// 		{
// 			console.log('Email used somewhere');
// 			// Regsiter user without email
// 			user.email = null!;
// 			const saving = await _user.addUser(user);
// 			return done(null, {id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
// 		}
// 	}
// 	else {
// 		// Save the user if he is not exists
// 		const saving = await _user.addUser(user);
// 		return done(null, {id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
// 	}
// }
// // User hasn't email in his github account
// else {
// 	console.log(user.at_provider_id)
// 	const isUserExists = await _user.findUser({at_provider_id : user.at_provider_id});
// 	console.log(isUserExists);
// 	// Check if the user already exists <Log in>
// 	if (
// 		isUserExists.user.provider == "github" 
// 							&& 
// 		isUserExists.user.at_provider_id == user.at_provider_id
// 	){
// 		console.log("User has account");
// 		return done(null, {id: isUserExists.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
// 	}
// 	else {
// 		// Regsiter user without email
// 		const saving = await _user.addUser(user);
// 		return done(null, {id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
// 	}
// }