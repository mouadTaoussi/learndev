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
			email    : profile.__json.email,
			user_name: profile.username,
			avatar   : profile.__json.avatar_url
		}
		console.log(user);
		
		try {
			if (user.email !== null) {
				const isEmailExists = await _user.findUser({email : user.email});

				if (isEmailExists.user !== null) {
					console.log("User found")
					// Check if the user already exists <Log in>
					if (
						isEmailExists.user.provider == "github" 
											&& 
						isEmailExists.user.at_provider_id == user.at_provider_id
					){
						console.log("User has github account");
						return done(null, {id: isEmailExists.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
					}
					// Check if the email already exists
					else if ( isEmailExists.user.provider != "github" )
					{
						console.log('Email used somewhere');
						// Regsiter user without email
						user.email = null!;
						const saving = await _user.addUser(user);
						return done(null, {id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
					}
				}
				else {
					// Save the user if he is not exists
					const saving = await _user.addUser(user);
					return done(null, {id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
				}
			}else {
				// Regsiter user without email
				user.email = null!;
				const saving = await _user.addUser(user);
				return done(null, {id: saving.user._id, name : profile.username,  email: profile.email, at_provider_id : profile.id});
			}
			
		}catch(err) {
			return done( "Something went wrong!", null )
		}
	}
));

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser(function(user, done) {
	done(null, user)
});
// export 