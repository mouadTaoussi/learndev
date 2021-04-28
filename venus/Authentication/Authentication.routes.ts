import { Request,Response, Router } from "express";
import passport from 'passport';
import Authentication from './Authentication.controller';
import Authenticated from './Authentication.middleware';
import main_config from ".././main.config";
import { sign, verify, decode } from 'jsonwebtoken';
// import __UserService__ from "./Authentication.service";

const router = Router();
const auth = new Authentication();

/////////////////////////////////////
// const _user = new __UserService__();
// router.get('/tosession',async (req:Request,res:Response)=>{
// 	const userExists = await _user.findUser({ email: "mouadtaoussi0@gmail.com" });
// 	res.redirect(`/auth/save_session?name=${userExists.user.user_name}&email=${userExists.user.email}`);
// })
// router.get('/save_session', (req: Request,res: Response)=>{ 
// 	req.session.local = req.query;
// 	console.log(req.session)
// 	// req.session.save(()=>{ return })
// 	// res.redirect('/auth/login')
// 	res.status(200).send({ loggedin : true, message : "Logged in!" });
// });
/////////////////////////////////////

router.get ('/login',    (req: Request,res: Response)=>{ res.json(req.session);console.log(req.session) });
router.get ('/getuser',  Authenticated, auth.getUser);
router.post('/login',    auth.login);
router.get ('/logout',   auth.logout);
router.post('/register', auth.register);
// Error here !!
router.get('/Oauth/login',    passport.authenticate('github',{ scope: ["profile","email"] }));
router.get('/Oauth/callback', passport.authenticate('github',{
	failureRedirect:  `${main_config.front_end_origin}/login`
}),function(req:Request,res:Response){
	// sign a token
	const user_token:string = sign(req.user!, main_config.jwt_secret!);
	// Redirect with the token
	// res.set('token', user_token);
	res.redirect(`${main_config.front_end_origin}/topics?Oauth=true&user_token=${user_token}`);
});

router.post   ('/resetPassword',  auth.resetPassword);
router.post   ('/changePassword', Authenticated, auth.changePassword);
router.post   ('/updateUser',     Authenticated, auth.updateProfile);
router.delete ('/deleteUser',     Authenticated, auth.deleteAccount);

export default router;