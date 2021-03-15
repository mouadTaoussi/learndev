import { Request,Response, Router } from "express";
import passport from 'passport';
import Authentication from './Authentication.controller';
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
router.get ('/getuser',  auth.getUser);
router.post('/login',    auth.login);
router.get ('/logout',    auth.logout);
router.post('/register', auth.register);

router.get('/Oauth/login',    passport.authenticate('github',{ scope: ["profile","email"] }));
router.get('/Oauth/callback', passport.authenticate('github',{failureRedirect:'http://localhost:8080/login', successRedirect:"http://localhost:8080/topics"}));

router.post  ('/resetPassword', auth.resetPassword);
router.post  ('/changePassword', auth.changePassword);
router.put   ('/updateUser', auth.updateProfile);
router.delete('/deleteUser', auth.deleteAccount);

export default router;