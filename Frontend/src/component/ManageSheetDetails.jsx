import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url;
export const ManageSheetDetails = () => {
    const [sheetDetails, setSheetDetails] = useState([]);
    const handleDelete= async (_id)=>{
        try{
            const token = localStorage.getItem('Token');
            if (!token) {
                console.error("No token found, authentication required!");
                return;
            }
            const res=await axios.post('/sheets/deleteSheetDetail',{ _id: _id },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Test deleted successfully");
            getSheetDetails();
        }
        catch(error){
            toast.error("Error occured while deleting sheet detail");
            console.log("Error while deleting Sheet Detail",error)
        }
    }
    const getSheetDetails = async () => {
        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                console.error("No token found, authentication required!");
                return;
            }
            const res =await axios.get('/sheets/getAllSheetDetails',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setSheetDetails(res.data.details);
                console.log(sheetDetails);
        }
        catch (error) {
            console.log("error in fetching sheetDetails: ",error);
        }
    }
    useEffect(() => {
        getSheetDetails();
    }, [])
    return (
        <div>
            <div className='flex flex-col items-center justify-center h-auto gap-4 p-4 w-full'>
                {/* Header Row */}
                <div className='flex basis-1/12 w-full gap-2'>
                    <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
                        <div>Class Name</div>
                    </div>

                    <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
                        <div>Sheet Name</div>
                    </div>

                    <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
                        <div>Test Name</div>
                    </div>

                    <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-4/12 text-base sm:text-2xl flex justify-center items-center p-2'>
                        <div>Sheet Id</div>
                    </div>

                    <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
                        <div>Delete</div>
                    </div>
                </div>

                <div className='flex basis-11/12 w-full gap-2 flex-col'>
                    {sheetDetails.map((sheet, index) => (
                        <div
                            key={index}
                            className='flex text-xs sm:text-lg itim text-start gap-2 overflow-auto'
                        >
                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 text-wrap'>
                                {sheet.className}
                            </div>

                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 text-wrap'>
                                {sheet.sheetName}
                            </div>

                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 text-wrap'>
                                {sheet.month}
                            </div>

                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-4/12 p-2 sm:p-4 text-wrap'>
                                {sheet.sheetId}
                            </div>

                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 flex justify-center items-center'>
                                <button className='text-red-500 hover:text-red-700' onClick={() => handleDelete(sheet._id)}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <ToastContainer className="text-base" />
            </div>
        </div>
    )
}
