const express=require('express');
const router=express.Router();

const {signup,verifyOTP,resendOTP}= require('../controllers/signupAuth');
const {signin}=require("../controllers/signinAuth")

router.post('/signup',signup);
router.post('/verify-otp',verifyOTP);
router.post('/resend-otp',resendOTP);
router.post('/signin',signin);



module.exports=router;
