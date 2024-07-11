const express=require("express");
const connectDB=require("./config/database");


const app=express();
app.use(express.json());

connectDB();
const auth=require("./routes/auth");
app.use("/api/v1",auth);

app.listen(3000,()=>{
    console.log("app started running at port 3000");
})
