const User=require('../models/User');

const getDashboarad=async (id)=>{
    const user=await User.findOne({id});
    if(!user){
        throw new Error("UserId not Found, can't give dashboard data");
    }
    return {
        email:user.email,
        name:user.name || null,
    }
};

module.exports=getDashboarad;