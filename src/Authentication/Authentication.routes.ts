import { Request,Response, Router } from "express";
import passport from 'passport';
import Authentication from './Authentication.controller';
import __UserService__ from "./Authentication.service";

const router = Router();
const auth = new Authentication();

/////////////////////////////////////
const _user = new __UserService__();
// router.get('/tosession',async (req:Request,res:Response)=>{
// 	const userExists = await _user.findUser({ email: "mouadtaoussi0@gmail.com" });
// 	res.redirect(`/auth/save_session?name=${userExists.user.user_name}&email=${userExists.user.email}`);
// })
router.get('/save_session', (req: Request,res: Response)=>{ 
	req.session.local = req.query;
	console.log(req.session)
	// req.session.save(()=>{ return })
	// res.redirect('/auth/login')
	res.status(200).send({ loggedin : true, message : "Logged in!" });
});
/////////////////////////////////////

router.get ('/login',    (req: Request,res: Response)=>{ res.json(req.session);console.log(req.session) });
router.post('/login',    auth.login);
router.post('/register', auth.register);

router.get('/Oauth/login',    passport.authenticate('github',{ scope: ["profile","email"] }));
router.get('/Oauth/callback', passport.authenticate('github',{failureRedirect:'/login', successRedirect:"/graphql"}));

router.post  ('/resetPassword', auth.resetPassword);
router.put   ('/updateUser', auth.updateProfile);
router.delete('/deleteUser', auth.deleteAccount);

export default router;