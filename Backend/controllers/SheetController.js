const SheetSchema=require("../models/Sheet");

//register a new sheetData
exports.registerSheetDetails=async (req,res)=>{
    try{
        //get the data
        const {sheetId,sheetName,className,testNumber}=req.body;
        //validate the data is available or not
        if(!sheetId || !sheetName || !className){
            return res.status(401).json({
                success:false,
                message:"All the fields are required"
            })
        }
        //check if there is sheet already for a class
        const existingClass=await SheetSchema.findOne({className:className});
        if(existingClass){
            return res.status(403).json({
                success:false,
                message:"Sheet of given class is already Present, You can edit it using edit options only"
            });
        }
        const newSheetDetails= {
            sheetId:sheetId,
            sheetName:sheetName,
            className:className,
        };

        if(testNumber){
            newSheetDetails.testNumber=testNumber;
        }
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

//update the sheetData
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
        const {className}=req.body;
        if(!className){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }
        const user=await SheetSchema.findOne({className:className});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"Sheet Details already does not exists",
            });
        }
        await SheetSchema.findOneAndDelete({className:className});
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
        const sheetDetails=await SheetSchema.find({});
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