import express from 'express';
import {postHistory , getHistory} from '../controller/travelHistory.js';
import { login, signUp } from '../controller/signIn.js';
import { auth } from '../controller/auth.js';

const router = express.Router();

router.put("/posthistory" ,auth , postHistory);
router.post('/getuser',auth,getHistory)
router.post('/auth',auth)
router.get('/test',(req,res)=>{
    res.send(
       `hello ji`
    )
})
router.post('/signup',signUp)
router.post('/login',login)

export default router ;
