import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const UpcomingTest = () => {
  const [testData,setTestData]=useState([]);
  async function getScheduledTests() {
    try{
      const data=await axios.get('/tests/');
      setTestData(data.data);
      console.log(testData);
    }
    catch(error){
      console.log("Error is fetching the upcoming test data");
    }
  }
  useEffect(()=>{
    getScheduledTests();
  },[]);
  return (
    <div className='flex flex-col items-center justify-center h-[800px] w-[930px] gap-4 p-4'>
      <div className='flex basis-1/12 w-full gap-2'>
        <div className='rounded-[20px] bg-[#63a73a] basis-2/12 text-2xl flex justify-center items-center'><div>Test Date</div></div>
        <div className='rounded-[20px] bg-[#63a73a] basis-2/12 text-2xl flex justify-center items-center'><div>Subject</div></div>
        <div className='rounded-[20px] bg-[#63a73a] basis-8/12 text-2xl flex justify-center items-center'><div>Syllabus</div></div>
      </div>
      <div className='flex basis-11/12  w-full gap-2 flex-col '>
        {
          testData.map((test) => {
            return <div className='flex text-lg itim text-start gap-2 overflow-auto'>
              <div className='rounded-[20px] bg-neutral-800 basis-2/12 p-4'>
              {
                new Date(test.testDate).toISOString().split("T")[0]
              }
              </div>
              <div className='rounded-[20px] bg-neutral-800 basis-2/12 p-4'>
                {
                  test.subject
                }
              </div>
              <div className='rounded-[20px] bg-neutral-800 basis-8/12 p-4'>
                {
                  test.syllabus
                }
              </div>
            </div>
          })
        }

      </div>
    </div>
  )
}