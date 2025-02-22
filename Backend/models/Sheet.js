const mongoose=require('mongoose');


const SheetSchema= new mongoose.Schema({
    sheetId:{
        type:String,
        required:true,
    },
    sheetName:{
        type:String,
        required:true,
    },
    className:{
        type:String,
        required:true,
    },
    testNumber:{
        type:String,
    }
});

module.exports=mongoose.model('SheetSchema',SheetSchema);