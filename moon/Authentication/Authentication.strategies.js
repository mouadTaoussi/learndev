"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_service_1 = __importDefault(require("./Authentication.service"));
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = __importDefault(require("passport-github2"));
const main_config_1 = __importDefault(require(".././main.config"));
const _user = new Authentication_service_1.default();
passport_1.default.use(new passport_github2_1.default({
    clientID: main_config_1.default.github_public_key,
    clientSecret: main_config_1.default.github_private_key,
    callbackURL: main_config_1.default.github_callback_url
}, async function (accessToken, refreshToken, profile, done) {
    const user = {
        at_provider_id: profile.id,
        provider: "github",
        fullname: profile.displayName,
        email: profile._json.email,
        user_name: profile.username,
        avatar: profile._json.avatar_url
    };
    try {
        const isUserExists = await _user.findUser({ at_provider_id: user.at_provider_id });
        if (isUserExists.found == true) {
            done(null, { id: isUserExists.user._id, name: profile.username, email: profile.email, at_provider_id: profile.id });
        }
        else {
            const isEmailExists = await _user.findUser({ email: user.email });
            if (isEmailExists.found == true) {
                user.email = null;
                const saving = await _user.addUser(user);
                done(null, { id: saving.user._id, name: profile.username, email: profile.email, at_provider_id: profile.id });
            }
            else {
                const saving = await _user.addUser(user);
                done(null, { id: saving.user._id, name: profile.username, email: profile.email, at_provider_id: profile.id });
            }
        }
    }
    catch (err) {
        return done(err, null);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
