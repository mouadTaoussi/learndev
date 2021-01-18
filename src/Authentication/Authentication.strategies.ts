import UserService from "./Authentication.service";
import { UserBody } from "./Authentication.typedefinitions";
import passport from 'passport';
import GitHubStrategy from "passport-github2";

const _user = new UserService();

passport.use(new GitHubStrategy({
	clientID     : "GITHUB_CLIENT_ID",
	clientSecret : "GITHUB_CLIENT_SECRET",
	callbackURL  : "http://127.0.0.1:3000/auth/github/callback"
	},
	function(accessToken:string, refreshToken:string, profile:any, done:any) {

		const user = _user.findUser({id:undefined, email:undefined, at_provider_id:profile})
		return done(null, user);

	}
));

passport.serializeUser((user, done) => {
    done(null, user)
});
// export 