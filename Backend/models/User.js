const mongoose=require('mongoose');


const UserSchema= new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Teacher","Guest"]
    }
});

module.exports=mongoose.model('user',UserSchema);