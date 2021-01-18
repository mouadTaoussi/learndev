import { Request,Response, Router } from "express";

const router = Router();

router.get('/login')
router.get('/register')
router.get('/changePassword')
router.get('/updateUser')
router.get('/deleteUser')

export default router;