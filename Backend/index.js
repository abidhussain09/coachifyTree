const express=require('express');
const app=express();
const cors=require("cors");
require('dotenv').config()
const port=process.env.PORT||3000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"]  // Replace with your frontend's URL
}));

require("./cronJobs/cleanup");

require('./config/database').connect();

app.get('/health',(req,res)=>{
    res.status(200).json({status:"ok"});
});
//import routes and mount\

//routes
const userRoute=require('./routes/userRoute');
const testRoutes = require('./routes/testRoutes');
const noticeRoutes = require("./routes/noticeRoutes");

//mount
app.use('/api/v1',userRoute);
app.use('/api/v1/tests', testRoutes); 
app.use("/api/v1/notices", noticeRoutes);
app.use('/api/v1/sheets', require('./routes/sheetRoutes'));


app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});
