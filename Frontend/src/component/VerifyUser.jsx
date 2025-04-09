import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL
export const VerifyUser = () => {
    const [userList, setUserList] = useState([]);
    async function getVerificationUsers() {
        try {
            const list = await axios.get('/getVerificationRequest');
            // console.log(list.data.verificationPending);
            setUserList(list.data.verificationPending);
            // console.log(userList);
        }
        catch (error) {
            console.log("Error in fetching the list of User whose verification is pending");
        }
    }
    useEffect(() => {
        getVerificationUsers();
    }, []);
    async function verifyUserFunction(coachifyId) {
        const token=localStorage.getItem('Token');
            if(!token){
                console.error("No token found, authentication required!");
                return;
            }
        try {
            // The axios call now includes the coachifyId and verified fields in the body.
            const response = await axios.post('/updateVerficationrequest', {
                coachifyId,
                verified: true
            },{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('User verified successfully!', response.data);
            // Update the local state to remove the verified user.
            setUserList(prevList => prevList.filter(user => user.coachifyId !== coachifyId));
        } catch (error) {
            console.error("Error verifying user", error);
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-full w-full gap-4 sm:p-4'>
            <div className='flex basis-1/12 w-full gap-2'>
                <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-3/12 text-base sm:text-2xl flex justify-center items-center p-2 text-nowrap sm:text-wrap'>Name</div>
                <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-3/12 text-base sm:text-2xl flex justify-center items-center p-2 text-nowrap sm:text-wrap'>Coachify Id</div>
                <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-4/12 text-base sm:text-2xl flex justify-center items-center p-2 text-nowrap sm:text-wrap'>Email Id</div>
                <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2 text-nowrap sm:text-wrap'>Verify</div>
            </div>
            <div className='flex basis-11/12 w-full gap-2 flex-col overflow-auto'>
                {
                    userList.map((user) => {
                        return <div className='flex text-sm sm:text-lg itim text-start gap-2'>
                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-3/12 sm:h-auto h-[40px] p-2 sm:p-4'>
                                {user.name}
                            </div>
                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-3/12 sm:h-auto h-[40px] p-2 sm:p-4p-4'>
                                {user.coachifyId}
                            </div>
                            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-4/12 sm:h-auto h-[40px] p-2 sm:p-4'>
                                {user.email}
                            </div>
                            <div className=' flex items-center justify-center basis-2/12 sm:p-4'>
                                <button className='h-6 w-6 sm:h-12 sm:w-12 bg-[#29cc7a] rounded-3xl' onClick={() => verifyUserFunction(user.coachifyId)}>
                                    ✔
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
