const mongoose=require("mongoose");

const CoachifyVerification=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    coachifyId:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

// Create a TTL index on "createdAt" with a 7-day expiration

CoachifyVerification.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

module.exports=mongoose.model("CoachifyVerificationSchema",CoachifyVerification);