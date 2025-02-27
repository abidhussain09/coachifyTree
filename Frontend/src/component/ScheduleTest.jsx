import React, { useState } from 'react'

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
        console.log(testData);
        setTestData({
            class:"",
            subject:"",
            syllabus:"",
            testDate:"",
        })
    }
    return (
        <div className='flex flex-col items-center justify-center h-[800px] w-[960px] gap-4 p-4'>
            ScheduleTest
            <form className='flex flex-col gap-2 w-full items-center justify-center' onSubmit={SubmitHandler}>
                <fieldset className='flex flex-col w-2/3 p-2'>
                <label htmlFor='classField' className='itim text-lg'>Class Name</label>
                <input
                    type='text'
                    className='bg-[#d9d9d950] itim text-lg rounded-[10px] h-[40px] p-4'
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
                    className='bg-[#d9d9d950] itim text-lg rounded-[10px] h-[40px] p-4'
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
                    className='bg-[#d9d9d950] itim text-lg rounded-[10px] h-[40px] p-4'
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
                    className='bg-[#d9d9d950] itim text-lg rounded-[10px] h-[40px] p-4'
                    name='testDate'
                    id='testDateField'
                    value={testData.testDate}
                    required
                    onChange={changeHandler}
                    />
                </fieldset>
                <button type='submit' className='itim bg-[#63a73a] px-4 py-2 text-xl rounded-[20px] w-1/3'>Schedule Test</button>
            </form>
        </div>
    )
}
