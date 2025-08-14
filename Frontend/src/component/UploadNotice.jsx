import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; 

export const UploadNotice = () => {
    const [noticeData, setNoticeData] = useState({
        title: "",
        content: "",
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setNoticeData((prev) => ({ ...prev, [name]: value }));
    }

    async function SubmitHandler(event) {
        event.preventDefault();
        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                console.error("No token found, authentication required!");
                toast.error("You must be logged in to upload a notice");
                return;
            }

            await axios.post('/notices/add', noticeData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNoticeData({
                title: "",
                content: ""
            });

            toast.success("Notice Uploaded Successfully!");
        } catch (error) {
            console.error("Error adding notice:", error.response?.data || error.message);
            toast.error("Failed to upload notice");
        }
    }

    return (
        <div className='flex flex-col items-center h-auto w-full max-w-[1020px] gap-6 p-6 bg-black/40 border-2 border-[#545454] rounded-[20px] shadow-lg'>
            
            <div className='text-3xl sm:text-5xl font-bold text-[#9ee174] itim'>
                Upload Notice
            </div>
            <div className='text-sm sm:text-lg text-gray-300 text-center px-3 max-w-[600px]'>
                Share important announcements with your students. Provide a title and detailed content for the notice.
            </div>

            
            <form
                className='flex flex-col gap-6 w-full sm:w-2/3'
                onSubmit={SubmitHandler}
            >
                
                <fieldset className='flex flex-col gap-2'>
                    <label htmlFor='TitleField' className='itim text-base sm:text-lg text-gray-200'>
                        Notice Title
                    </label>
                    <input
                        type='text'
                        name='title'
                        id='TitleField'
                        value={noticeData.title}
                        onChange={changeHandler}
                        required
                        placeholder='Enter notice title'
                        className='bg-neutral-800 border-2 border-white rounded-md px-3 py-2 text-white placeholder-gray-400 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#63a73a]'
                    />
                </fieldset>

                <fieldset className='flex flex-col gap-2'>
                    <label htmlFor='contentField' className='itim text-base sm:text-lg text-gray-200'>
                        Notice Content
                    </label>
                    <textarea
                        name='content'
                        id='contentField'
                        value={noticeData.content}
                        onChange={changeHandler}
                        required
                        rows={6}
                        placeholder='Write the notice details here...'
                        className='bg-neutral-800 border-2 border-white rounded-md px-3 py-2 text-white placeholder-gray-400 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#63a73a]'
                    />
                </fieldset>

                
                <button
                    type='submit'
                    className='itim bg-[#63a73a] hover:bg-[#4d8f2f] transition duration-200 px-6 py-3 text-lg sm:text-xl rounded-[12px] text-white shadow-md'
                >
                    Upload Notice
                </button>
            </form>

            <ToastContainer className="text-base" />
        </div>
    );
};
