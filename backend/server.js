const express=require("express");

const app=express();
app.use(express.json());
// require("./config/database").connect();

app.listen(3000,()=>{
    console.log("app started running at port 3000");
})
