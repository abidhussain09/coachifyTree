const express=require('express');
const app=express();
const cors=require("cors");
require('dotenv').config()

const port=process.env.PORT||4000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
}));

require('./config/database').connect();

//import routes and mount

const userRoute=require('./routes/userRoute');
app.use('/api/v1',userRoute);

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});
