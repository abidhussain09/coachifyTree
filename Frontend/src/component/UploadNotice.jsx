import React, { useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL
export const UploadNotice = () => {
    const [noticeData,setNoticeData]=useState({
        title:"",
        content:"",
    })
    function changeHandler(event) {
        const { name, value } = event.target;
        setNoticeData((prev) => ({ ...prev, [name]: value }));
    }
    async function SubmitHandler(event) {
        event.preventDefault();
        try{
            console.log(noticeData);
            const token=localStorage.getItem('Token');
            if(!token){
                console.error("No token found, authentication required!");
                return;
            }
            const response=await axios.post('/notices/add',noticeData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Notice added successfully:", response.data);
            setNoticeData({
                title:"",
                content:""
            });
        }
        catch(error){
            console.error("Error adding notice:", error.response?.data || error.message);
        }
    }
    return (
        <div className='flex flex-col items-center h-auto w-full overflow-x-hidden max-w-[1020px] gap-4 p-4'>
            <div className='md:text-5xl text-3xl font-bold'>
                Upload Notice
            </div>
            <form className='flex flex-col gap-2 w-full items-center justify-center' onSubmit={SubmitHandler}>
                <fieldset className='flex flex-col sm:w-2/3 p-2'>
                <label htmlFor='TitleField' className='itim text-base sm:text-lg'>Notice Title</label>
                <input
                    type='title'
                    className='bg-neutral-800 border-2 p-3 border-white border-solid focus:border-0 text-base sm:text-[20px] w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='title'
                    id='TitleField'
                    required
                    value={noticeData.title}
                    onChange={changeHandler}
                    />
                </fieldset>
                <fieldset className='flex flex-col sm:w-2/3 p-2'>
                <label htmlFor='contentField' className='itim text-base sm:text-lg'>Notice Content</label>
                <textarea
                    type='text'
                    className='bg-neutral-800 border-2 border-white border-solid focus:border-0 p-5 text-base sm:text-[20px] w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='content'
                    id='contentField'
                    value={noticeData.content}
                    required
                    onChange={changeHandler}
                    rows={6}
                    />
                </fieldset>
                <button type='submit' className='itim bg-[#63a73a] px-4 py-2 md:text-xl text-[20px] rounded-[10px] sm:w-1/4'>Upload Notice</button>
            </form>
        </div>
    )
}

;
