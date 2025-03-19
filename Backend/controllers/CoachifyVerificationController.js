const CoachifyVerificationSchema = require("../models/CoachifyVerification");

exports.createVerificationRequest= async (req,res)=>{
    try{
        const {name,email,coachifyId}=req.body;
        if(!name || !email || !coachifyId){
            return res.status(401).json({
                success:false,
                message:"All Fields are required",
            });
        }
        const existingId= await CoachifyVerificationSchema.findOne({coachifyId:coachifyId});
        if(existingId){
            return res.status(403).json({
                success:false,
                message:"Already registered with this coachifyId",
            })
        }
        const newVerificationUser={
            name:name,
            email:email,
            coachifyId:coachifyId,
            verified:false,
        }
        const newVerfication=new CoachifyVerificationSchema(newVerificationUser);
        await newVerfication.save();
        return res.status(200).json({
            success:true,
            message:"CoachifyId verfication request send sucessfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to create a verification request",
            error:error
        });
    }
};

exports.getVerificationRequest= async (req,res)=>{
    try{
        const verificationPending=await CoachifyVerificationSchema.find({verified:false}).sort({ createdAt: -1 });
        return res.status(200).json({
            success:true,
            verificationPending,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to get verification request",
            error:error
        });
    }
};

exports.updateVerificationRequest= async (req,res)=>{
    try{
        const {coachifyId,verified}=req.body;
        if(!coachifyId){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            })
        }
        const prevVerificationrequest=await CoachifyVerificationSchema.findOneAndUpdate({coachifyId},{
                                                                                        $set:{verified:verified}
        },{new:true});
        return res.status(200).json({
            success:true,
            message:"Updation Sucessfull",
            prevVerificationrequest,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to update a verification request",
            error:error
        });
    }
};

exports.getUserEmailUsingCoachifyId= async (req,res)=>{
    try{
        const { email } = req.query; 
        if(!email){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            })
        }
        const userDetail=await CoachifyVerificationSchema.findOne({email:email});
        if(!userDetail){
            return res.status(403).json({
                success:false,
                message:"No user with this email found",
            })
        }
        const coachifyId=userDetail.coachifyId;
        return res.status(200).json({
            success:true,
            message:"Fetching Sucessfull",
            coachifyId,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to get the coachifyId using email",
            error:error
        });
    }
}