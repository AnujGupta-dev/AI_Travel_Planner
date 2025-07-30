import express from 'express';
import {postHistory , getHistory} from '../controller/travelHistory.js';
import { login, signUp } from '../controller/signIn.js';
import { auth, auth2 } from '../controller/auth.js';
import { body, query } from "express-validator";
import { autocomplete } from '../controller/autocomplete.js';


const router = express.Router();

router.put("/posthistory" ,auth , postHistory);
router.post('/getuser',auth,getHistory)
router.get('/protected',auth2,(req,res)=>{
    res.status(200).json({
        message:"Protected route accessed",
        success:true
    })
})

router.get('/test',(req,res)=>{
    res.send(
       `hello ji`
    )
})
router.post('/signup', [
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('phoneno').isLength({min: 10}).withMessage('Phone number must be at least 10 characters long') 
],signUp)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],login)

router.get('/autocomplete',query('q').isString().withMessage('Query must be a string'), autocomplete)

export default router ;
