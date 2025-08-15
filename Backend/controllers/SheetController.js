const SheetSchema=require("../models/Sheet");

exports.registerSheetDetails=async (req,res)=>{
    try{
        const {sheetId,sheetName,className, month}=req.body;
        //validate the data is available or not
        if(!sheetId || !sheetName || !className || !month){
            return res.status(401).json({
                success:false,
                message:"All the fields are required"
            })
        }
        const existingClass=await SheetSchema.findOne({sheetName:sheetName});
        if(existingClass){
            return res.status(403).json({
                success:false,
                message:"Sheet of given class is already Present, You can edit data on the sheet"
            });
        }
        const newSheetDetails= {
            sheetId:sheetId,
            sheetName:sheetName,
            className:className,
            month:month
        };
        const newSheet=new SheetSchema(newSheetDetails);
        await newSheet.save();
        return res.status(200).json({
            success:true,
            message:"Sheet data Added sucessfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to add sheetdata, try again",
            error:error
        });
    }
};

exports.updateSheetDetails=async (req,res)=>{
    try{
        //get data
        const {className,sheetId,sheetName,testNumber}=req.body;
        //validate the data
        if(!className || !sheetId || !sheetName){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }
        //check the sheet detail exists 
        const existingSheetDetails=await SheetSchema.findOne({className:className});
        if(!existingSheetDetails){
            return res.status(401).json({
                success:false,
                message:"Sheet details doesn't exists",
            });
        }
        const updatedSheetDetails=await SheetSchema.findOneAndUpdate(
                                                    {className:className},
                                                    {sheetId:sheetId,
                                                        sheetName:sheetName,
                                                        testNumber:testNumber||null,
                                                    },
                                                    {new:true}
        );

        res.status(200).json({
            success:true,
            message:"Sheet Details updated Succcessfully",
            updatedSheetDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to update sheetdata, try again",
            error:error
        });
    }
};
//delete the sheetData

exports.deleteSheetDetails=async(req,res)=>{
    try{
        const {_id}=req.body;
        if(!_id){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }
        const user=await SheetSchema.findOne({_id:_id});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"Sheet Details already does not exists",
            });
        }
        await SheetSchema.findOneAndDelete({_id:_id});
        return res.status(200).json({
            success:true,
            message:"Sheet Details deleted",
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to delete sheetdata, try again",
            error:error
        });
    }
}
//get all SheetData

exports.getSheetDetails=async (req,res)=>{
    try{
        const {className}=req.query;
        if(!className){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }
        const sheetDetails=await SheetSchema.findOne({className:className});
        return res.status(200).json({
            success:true,
            sheetDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't able to add sheetdata, try again",
            error:error
        });
    }
};

exports.getAllSheetDetails=async(req,res)=>{
    try{
        const details=await SheetSchema.find().sort({createdAt:-1});
        return res.status(200).json({
            message:"Fetched sucessfully",
            details
        })
    }
    catch(error){
        res.status(500).json({ error: error.message, message:"Error in fetching from backend" });
    }
}