const express=require('express');
const app=express();
require('dotenv').config()

const port=process.env.PORT||4000;

app.use(express.json());

require('./config/database').connect();

//import routes and mount

const userRoute=require('./routes/userRoute');
app.use('/api/v1',userRoute);

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});
