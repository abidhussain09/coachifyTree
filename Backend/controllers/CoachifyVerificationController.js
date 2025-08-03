const CoachifyVerificationSchema = require("../models/CoachifyVerification");

exports.createVerificationRequest = async (req, res) => {
    try {
        const { name, email, coachifyId } = req.body;
        if (!name || !email || !coachifyId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if a record already exists with the provided email
        const existingRecord = await CoachifyVerificationSchema.findOne({ email });
        if (existingRecord) {
            // Case: Same email with the same coachifyId
            if (existingRecord.coachifyId === coachifyId) {
                return res.status(200).json({
                    success: true,
                    message: "Please wait until you get verified or Contact Admin",
                });
            } else {
                // Case: Same email but different coachifyId.
                // Check if the new coachifyId is already taken by another user.
                const duplicateId = await CoachifyVerificationSchema.findOne({
                    coachifyId,
                    _id: { $ne: existingRecord._id }
                });
                if (duplicateId) {
                    return res.status(403).json({
                        success: false,
                        message: "Someone already registered with this coachifyId, If that is you, Please wait until you get verified or contact Admin.",
                    });
                }

                // Update the record with the new coachifyId.
                existingRecord.coachifyId = coachifyId;
                await existingRecord.save();
                return res.status(200).json({
                    success: true,
                    message: "You have Entered a new CoachifyId this time. Your verification request has been updated successfully.",
                });
            }
        }

        // If no record exists for this email, check if the coachifyId is already taken.
        const existingId = await CoachifyVerificationSchema.findOne({ coachifyId });
        if (existingId) {
            return res.status(403).json({
                success: false,
                message: "Someone already registered with this coachifyId, If it was not you contact Admin.",
            });
        }

        // Create a new verification entry if both email and coachifyId are unique.
        const newVerificationUser = {
            name,
            email,
            coachifyId,
            verified: false,
        };
        const newVerification = new CoachifyVerificationSchema(newVerificationUser);
        await newVerification.save();
        return res.status(200).json({
            success: true,
            message: "CoachifyId verification request sent successfully. Please wait until you get verified"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create a verification request",
            error: error.message
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