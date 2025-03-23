const User=require('../models/User');
const CoachifyVerificationSchema= require('../models/CoachifyVerification');
const getDashboard=async (id)=>{
    const user=await User.findOne({id});
    if(!user){
        throw new Error("UserId not Found, can't give dashboard data");
    }
    const verificationRecord = await CoachifyVerificationSchema.findOne({ email: user.email });
    const isVerified = verificationRecord ? verificationRecord.verified : false;
    return {
        email:user.email,
        name:user.name || null,
        isVerified,
        verificationRecord
    }
};

module.exports=getDashboard;