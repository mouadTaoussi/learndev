import { Request,Response, Router } from "express";
import passport from 'passport';
const router = Router();

router.get('/login',(req,res)=>{
	res.send('Hello World');
});
router.get('/register');

// router.get('/Oauth/login',    passport.authenticate());
// router.get('/Oauth/register', passport.authenticate());

// router.get('/Oauth/callback', passport.authenticate());
// router.get('/ Oauth/register');

router.get('/changePassword');
router.get('/updateUser');
router.get('/deleteUser');

export default router;