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
        <div className='flex flex-col items-center justify-center h-[800px] w-[960px] gap-4 p-4'>
            UploadNotice
            <form className='flex flex-col gap-2 w-full items-center justify-center' onSubmit={SubmitHandler}>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='TitleField' className='itim text-lg'>Notice Title</label>
                <input
                    type='title'
                    className='bg-[#d9d9d950] itim text-lg rounded-[10px] h-[40px] p-4'
                    name='title'
                    id='TitleField'
                    required
                    value={noticeData.title}
                    onChange={changeHandler}
                    />
                </fieldset>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='contentField' className='itim text-lg'>Notice Content</label>
                <input
                    type='text'
                    className='bg-[#d9d9d950] itim text-lg rounded-[10px] h-[40px] p-4'
                    name='content'
                    id='contentField'
                    value={noticeData.content}
                    required
                    onChange={changeHandler}
                    />
                </fieldset>
                <button type='submit' className='itim bg-[#63a73a] px-4 py-2 text-xl rounded-[20px] w-1/3'>Upload Notice</button>
            </form>
        </div>
    )
}
