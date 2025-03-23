import React, { useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL
export const ScheduleTest = () => {
    const [testData,setTestData]=useState({
        class:"",
        subject:"",
        syllabus:"",
        testDate:"",
    });
    function changeHandler(event) {
        const { name, value } = event.target;
        setTestData((prev) => ({ ...prev, [name]: value }));
    }
    async function SubmitHandler(event) {
        event.preventDefault();
        try{
            console.log(testData);
            const token=localStorage.getItem('Token');
            if(!token){
                console.error("No token found, authentication required!");
                return;
            }
            const response=await axios.post('/tests/add',testData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Test added successfully:", response.data);
            setTestData({
                class:"",
                subject:"",
                syllabus:"",
                testDate:"",
            });
        }
        catch(error){
            console.error("Error adding notice:", error.response?.data || error.message);
        }
    }
    return (
        <div className='flex flex-col items-center  h-[800px] w-[960px] gap-4 p-4'>
            <div className='text-5xl font-bold'>
            ScheduleTest
            </div>
            <div className='text-xl'>Here you can Schedule test for the Student</div>
            <form className='flex flex-col gap-2 w-full items-center justify-center' onSubmit={SubmitHandler}>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='classField' className='itim text-lg'>Class Name</label>
                <input
                    type='text'
                    className='bg-neutral-800 border-2 px-3 border-white border-solid focus:border-0 text-[20px] w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='class'
                    id='classField'
                    required
                    value={testData.class}
                    onChange={changeHandler}
                    />
                </fieldset>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='subjectField' className='itim text-lg'>Subject</label>
                <input
                    type='text'
                    className='bg-neutral-800 border-2 px-3 border-white border-solid focus:border-0 text-[20px] w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='subject'
                    id='subjectField'
                    value={testData.subject}
                    required
                    onChange={changeHandler}
                    />
                </fieldset>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='syllabusField' className='itim text-lg'>Syllabus</label>
                <input
                    type='text'
                    className='bg-neutral-800 border-2 px-3 border-white border-solid focus:border-0 text-[20px] w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='syllabus'
                    id='syllabusField'
                    value={testData.syllabus}
                    required
                    onChange={changeHandler}
                    />
                </fieldset>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='testDateField' className='itim text-lg'>Test Date</label>
                <input
                    type='Date'
                    className='bg-neutral-800 border-2 px-3 border-white border-solid focus:border-0 text-[20px] w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='testDate'
                    id='testDateField'
                    value={testData.testDate}
                    required
                    onChange={changeHandler}
                    />
                </fieldset>
                <button type='submit' className='itim bg-[#63a73a] px-4 py-2 text-xl rounded-[10px] w-1/3'>Schedule Test</button>
            </form>
        </div>
    )
}
