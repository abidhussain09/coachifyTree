const express=require('express');
const router=express.Router();
const getDashboard=require('../utils/dashboardService');
const {signup,verifyOTP,resendOTP, verificationCheck}= require('../controllers/signupAuth');
const {signin}=require("../controllers/signinAuth")
const {authenticateToken,authorizeRoles}=require('../middlewares/authMiddleware');
const { forgotPassword } = require('../controllers/ForgetPasswordController');
const { resetPassword } = require('../controllers/ResetPasswordController');
const { registerSheetDetails, updateSheetDetails, deleteSheetDetails, getSheetDetails } = require('../controllers/SheetController');
const {createVerificationRequest, getVerificationRequest, updateVerificationRequest} =require("../controllers/CoachifyVerificationController")




router.post('/signup',signup);
router.post('/verify-otp',verifyOTP);
router.post('/resend-otp',resendOTP);
router.post('/signin',signin);
router.post('/check-verification',verificationCheck);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);


// Routes for Admin
router.get('/admin/dashboard', authenticateToken, authorizeRoles('Admin'),async (req, res) => {
    try{
        const {id}=req.query;
        const data=await getDashboard(id);
        res.status(200).json({
            success:true,
            data,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in fetching data for dashboard from server",
            error
        })
    }
});

// Routes for Teacher
router.get('/teacher/dashboard', authenticateToken, authorizeRoles('Teacher'),async (req, res) => {
    
    try{
        const {id}=req.query;
        const data=await getDashboard(id);
        res.status(200).json({
            success:true,
            data,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in fetching data for dashboard from server",
            error
        })
    }
});

// Routes for Student
router.get('/student/dashboard', authenticateToken, authorizeRoles('Student'),async (req, res) => {
    
    try{
        const {id}=req.query;
        const data=await getDashboard(id);
        res.status(200).json({
            success:true,
            data,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in fetching data for dashboard from server",
            error
        })
    }
});

// Routes for Guest
router.get('/guest/dashboard', authenticateToken, authorizeRoles('Guest'), (req, res) => {
    res.json({ message: 'Welcome to the Guest dashboard' });
});

//sheet details routes
router.post("/addSheetDetails",authenticateToken, authorizeRoles('Admin'),registerSheetDetails);
router.post("/updateSheetDetails", authenticateToken, authorizeRoles('Admin'),updateSheetDetails);
router.post("/deleteSheetDetails", authenticateToken, authorizeRoles('Admin'), deleteSheetDetails);
router.get("/getSheetDetails",getSheetDetails);


router.post("/requestCoachifyVerification",createVerificationRequest);
router.post("/updateVerficationrequest",authenticateToken,authorizeRoles('Admin'),updateVerificationRequest);
router.get("/getVerificationRequest",getVerificationRequest);

module.exports=router;
