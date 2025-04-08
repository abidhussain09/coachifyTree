import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const UpcomingTest = () => {
  const [testData, setTestData] = useState([]);

  async function getScheduledTests() {
    try {
      const response = await axios.get('/tests/');
      
      const sortedTests = response.data.sort((a, b) => new Date(a.testDate) - new Date(b.testDate));

      setTestData(sortedTests);
      console.log(sortedTests);
    } catch (error) {
      console.log("Error in fetching the upcoming test data:", error);
    }
  }

  useEffect(() => {
    getScheduledTests();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-auto w-[1020px] gap-4 p-4'>
      <div className='flex basis-1/12 w-full gap-2'>
        <div className='rounded-[20px] bg-[#63a73a] basis-2/12 text-2xl flex justify-center items-center'>
          <div>Test Date</div>
        </div>
        <div className='rounded-[20px] bg-[#63a73a] basis-2/12 text-2xl flex justify-center items-center'>
          <div>Subject</div>
        </div>
        <div className='rounded-[20px] bg-[#63a73a] basis-8/12 text-2xl flex justify-center items-center'>
          <div>Syllabus</div>
        </div>
      </div>
      <div className='flex basis-11/12 w-full gap-2 flex-col'>
        {testData.map((test, index) => (
          <div key={index} className='flex text-lg itim text-start gap-2 overflow-auto'>
            <div className='rounded-[20px] bg-neutral-800 basis-2/12 p-4'>
              {new Date(test.testDate).toISOString().split("T")[0]}
            </div>
            <div className='rounded-[20px] bg-neutral-800 basis-2/12 p-4'>
              {test.subject}
            </div>
            <div className='rounded-[20px] bg-neutral-800 basis-8/12 p-4'>
              {test.syllabus}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
