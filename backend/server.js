const express=require("express");
const connectDB=require("./config/database");
require("dotenv").config();

const app=express();
app.use(express.json());

connectDB();
const auth=require("./routes/auth");
app.use("/api/v1",auth);
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`app started at ${port}`);
});
