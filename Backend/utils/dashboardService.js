const User=require('../models/User');

const getDashboarad=async (id)=>{
    const user=await User.findOne({id});
    if(!user){
        throw new Error("Student not Found");
    }
    return {
        email:user.email
    }
};

module.exports=getDashboarad;