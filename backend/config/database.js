// const mongoose=require("mongoose");

// exports.connect=()=>{
//     mongoose.connect(process.env.DATABASE_URL,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then(()=>{
//         console.log("DB connected sucessfully");
//     })
//     .catch((err)=>{
//         console.log("DB Connection ISSUE!!");
//         console.error(err);
//         process.exit(1);
//     })
// }
const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;