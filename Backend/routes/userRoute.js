const express=require('express');
const router=express.Router();

const {signup,verifyOTP,resendOTP}= require('../controllers/signupAuth');
const {signin}=require("../controllers/signinAuth")
const {authenticateToken,authorizeRoles}=require('../middlewares/authMiddleware');

router.post('/signup',signup);
// router.post('/verify-otp',verifyOTP);
// router.post('/resend-otp',resendOTP);
router.post('/signin',signin);


// Routes for Admin
router.get('/admin', authenticateToken, authorizeRoles('Admin'), (req, res) => {
    res.json({ message: 'Welcome to the Admin dashboard' });
});

// Routes for Teacher
router.get('/teacher', authenticateToken, authorizeRoles('Teacher'), (req, res) => {
    res.json({ message: 'Welcome to the Teacher panel' });
});

// Routes for Student
router.get('/student', authenticateToken, authorizeRoles('Student'), (req, res) => {
    res.json({ message: 'Welcome to the Student dashboard' });
});

// Routes for Guest
router.get('/guest', authenticateToken, authorizeRoles('Guest'), (req, res) => {
    res.json({ message: 'Welcome to the Guest page' });
});



module.exports=router;
