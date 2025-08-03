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
        default:Date.now,
    }
});


module.exports=mongoose.model("CoachifyVerificationSchema",CoachifyVerification);