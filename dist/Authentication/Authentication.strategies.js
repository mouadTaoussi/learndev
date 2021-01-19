"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_service_1 = __importDefault(require("./Authentication.service"));
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = __importDefault(require("passport-github2"));
const _user = new Authentication_service_1.default();
passport_1.default.use(new passport_github2_1.default({
    clientID: "GITHUB_CLIENT_ID",
    clientSecret: "GITHUB_CLIENT_SECRET",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    const user = _user.findUser({ id: undefined, email: undefined, at_provider_id: profile });
    return done(null, user);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
