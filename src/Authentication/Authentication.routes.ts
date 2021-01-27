import { Request,Response, Router } from "express";
import passport from 'passport';
import Authentication from './Authentication.controller';

const router = Router();
const auth = new Authentication();

// router.get('/login',,(req: Request,res: Response)=>{ res.json(req.session) });
router.get('/login',    auth.login);
router.get('/register', auth.register);

router.get('/Oauth/login', passport.authenticate('github',{ scope: ["profile","email"] }));

router.get('/Oauth/callback', passport.authenticate('github',{failureRedirect:'/login', successRedirect:"/graphql"}));

router.get('/changePassword', auth.resetPassword);
router.get('/updateUser', auth.updateProfile);
router.get('/deleteUser', auth.deleteAccount);

export default router;