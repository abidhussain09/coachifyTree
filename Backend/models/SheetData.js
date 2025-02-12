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
    id:{
        type:String,
    }
    
});

module.exports=mongoose.model('sheetSchema',SheetSchema);