const express=require('express');
const app=express();
const cors=require("cors");
require('dotenv').config()

const port=process.env.PORT||4000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
}));

require('./config/database').connect();

//import routes and mount

//routes
const userRoute=require('./routes/userRoute');
const testRoutes = require('./routes/testRoutes');

//mount
app.use('/api/v1',userRoute);
app.use('/api/v1/tests', testRoutes); 


app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});
