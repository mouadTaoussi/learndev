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
	function(accessToken:string, refreshToken:string, profile:any, done:any) {
		// const user = _user.findUser({id:undefined, email:undefined, at_provider_id:profile})
		return done(null, {name : profile.username,  email: profile.email, at_provider_id : profile.id});

	}
));

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser(function(user, done) {
	done(null, user)
});
// export 