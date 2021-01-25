import { Request,Response, Router } from "express";
import passport from 'passport';

const router = Router();

router.get('/login',(req: Request,res: Response)=>{ res.json(req.user) });
router.get('/register');

router.get('/Oauth/login', passport.authenticate('github',{ scope: ["profile","email"] }));

router.get('/Oauth/callback', passport.authenticate('github',{failureRedirect:'/login', successRedirect:"/graphql"}));

router.get('/changePassword');
router.get('/updateUser');
router.get('/deleteUser');

export default router;