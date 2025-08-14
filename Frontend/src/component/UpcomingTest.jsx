import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; 

export const UpcomingTest = () => {
  const [testData, setTestData] = useState([]);

  async function getScheduledTests() {
    try {
      const response = await axios.get('/tests/');

      const sortedTests = response.data.sort(
        (a, b) => new Date(a.testDate) - new Date(b.testDate)
      );

      setTestData(sortedTests);
    } catch (error) {
      console.log("Error in fetching the upcoming test data:", error);
    }
  }

  useEffect(() => {
    getScheduledTests();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-auto gap-4 p-4 w-full'>
      
      <div className='flex basis-1/12 w-full gap-2'>
        <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
          <div>Test Date</div>
        </div>

        <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
          <div>Class</div>
        </div>

        <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-2/12 text-base sm:text-2xl flex justify-center items-center p-2'>
          <div>Subject</div>
        </div>

        <div className='rounded-xl sm:rounded-[20px] bg-[#63a73a] basis-6/12 text-base sm:text-2xl flex justify-center items-center p-2'>
          <div>Syllabus</div>
        </div>
      </div>

      
      <div className='flex basis-11/12 w-full gap-2 flex-col'>
        {testData.map((test, index) => (
          <div
            key={index}
            className='flex text-xs sm:text-lg itim text-start gap-2 overflow-auto'
          >
            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 text-wrap'>
              {new Date(test.testDate).toISOString().split("T")[0]}
            </div>

            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 text-wrap'>
              {test.class}
            </div>

            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-2/12 p-2 sm:p-4 text-wrap'>
              {test.subject}
            </div>

            <div className='rounded-xl sm:rounded-[20px] bg-neutral-800 basis-6/12 p-2 sm:p-4 text-wrap'>
              {test.syllabus}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
