const mongoose=require('mongoose');


const Profile= new mongoose.Schema({
    name:{
        type:String,
    },
    class:{
        type:String,
    },
    profilePic:{
        type:String,
    },
    parentContactNumber:{
        type:Number
    }
});

module.exports=mongoose.model('Profile',Profile);