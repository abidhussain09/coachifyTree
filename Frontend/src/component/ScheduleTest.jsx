import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const ScheduleTest = () => {
    const [testData, setTestData] = useState({
        class: "",
        subject: "",
        syllabus: "",
        testDate: "",
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setTestData((prev) => ({ ...prev, [name]: value }));
    }

    async function SubmitHandler(event) {
        event.preventDefault();
        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                console.error("No token found, authentication required!");
                toast.error("You must be logged in to schedule a test");
                return;
            }
            await axios.post('/tests/add', testData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTestData({
                class: "",
                subject: "",
                syllabus: "",
                testDate: "",
            });

            toast.success(" Test Added Successfully!");
        } catch (error) {
            console.error("Error adding test:", error.response?.data || error.message);
            toast.error(" Failed to add test");
        }
    }

    return (
        <div className='flex flex-col w-full max-w-[1020px] items-center h-auto gap-6 p-6 bg-black/40 border-2 border-[#545454] rounded-[20px] shadow-lg'>
            {/* Header */}
            <div className='text-3xl sm:text-5xl font-bold text-[#9ee174] itim'>
                Schedule Test
            </div>
            <div className='text-sm sm:text-lg text-gray-300 text-center px-3 max-w-[600px]'>
                Here you can schedule upcoming tests for your students. Fill in the details below and assign the test date.
            </div>

            {/* Form */}
            <form
                className='flex flex-col gap-6 w-full sm:w-2/3'
                onSubmit={SubmitHandler}
            >
                {/* Class */}
                <fieldset className='flex flex-col gap-2'>
                    <label htmlFor='classField' className='itim text-base sm:text-lg text-gray-200'>
                        Class
                    </label>
                    <input
                        type='text'
                        name='class'
                        id='classField'
                        value={testData.class}
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                        placeholder='Enter class (e.g., 9, 10)'
                        className='bg-neutral-800 border-2 border-white rounded-md px-3 py-2 text-white placeholder-gray-400 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#63a73a]'
                    />
                </fieldset>

                {/* Subject */}
                <fieldset className='flex flex-col gap-2'>
                    <label htmlFor='subjectField' className='itim text-base sm:text-lg text-gray-200'>
                        Subject
                    </label>
                    <input
                        type='text'
                        name='subject'
                        id='subjectField'
                        value={testData.subject}
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                        placeholder='Enter subject name'
                        className='bg-neutral-800 border-2 border-white rounded-md px-3 py-2 text-white placeholder-gray-400 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#63a73a]'
                    />
                </fieldset>

                {/* Syllabus */}
                <fieldset className='flex flex-col gap-2'>
                    <label htmlFor='syllabusField' className='itim text-base sm:text-lg text-gray-200'>
                        Syllabus
                    </label>
                    <input
                        type='text'
                        name='syllabus'
                        id='syllabusField'
                        value={testData.syllabus}
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                        placeholder='Enter syllabus details'
                        className='bg-neutral-800 border-2 border-white rounded-md px-3 py-2 text-white placeholder-gray-400 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#63a73a]'
                    />
                </fieldset>

                {/* Test Date */}
                <fieldset className='flex flex-col gap-2'>
                    <label htmlFor='testDateField' className='itim text-base sm:text-lg text-gray-200'>
                        Test Date
                    </label>
                    <input
                        type='date'
                        name='testDate'
                        id='testDateField'
                        value={testData.testDate}
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                        className='bg-neutral-800 border-2 border-white rounded-md px-3 py-2 text-white placeholder-gray-400 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#63a73a]'
                    />
                </fieldset>

                {/* Submit */}
                <button
                    type='submit'
                    className='itim bg-[#63a73a] hover:bg-[#4d8f2f] transition duration-200 px-6 py-3 text-lg sm:text-xl rounded-[12px] text-white shadow-md'
                >
                    Schedule Test
                </button>
            </form>

            <ToastContainer className="text-base" />
        </div>
    );
};
