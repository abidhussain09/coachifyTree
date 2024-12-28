const express=require('express');
const router=express.Router();

// const {login}=require('../controllers/auth');
const signup = require('../controllers/auth');

router.post('/signup',signup);



module.exports=router;
