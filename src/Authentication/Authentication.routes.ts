import { Request,Response, Router } from "express";
import passport from 'passport';
import Authentication from './Authentication.controller';

const router = Router();
const auth = new Authentication();

router.get('/login', (req: Request,res: Response)=>{ res.json(req.session);console.log(req.session) });
router.post('/login',    auth.login);
router.post('/register', auth.register);

router.get('/Oauth/login', passport.authenticate('github',{ scope: ["profile","email"] }));

router.get('/Oauth/callback', passport.authenticate('github',{failureRedirect:'/login', successRedirect:"/graphql"}));

router.post('/resetPassword', auth.resetPassword);
router.put('/updateUser', auth.updateProfile);
router.delete('/deleteUser', auth.deleteAccount);

export default router;