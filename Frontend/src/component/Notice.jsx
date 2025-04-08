import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url;

export const Notice = () => {
  const [notices, setNotices] = useState([]);

  async function getNotices() {
    try {
      const data = await axios.get('/notices/');
      setNotices(data.data);
    } catch (error) {
      console.log("error in fetching the notices", error);
    }
  }

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <div className='flex flex-wrap items-center justify-center gap-4 p-2 overflow-y-auto max-h-[720px]'>
      {notices.map((notice, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 
                     px-4 py-6 
                     w-full max-w-[280px] 
                     h-auto min-h-[280px] 
                     rounded-[20px] bg-neutral-800 text-white 
                     border-2 border-transparent 
                     hover:border-[#63a73a] hover:bg-neutral-900"
        >
          <h3 className="text-xl sm:text-2xl border-b-2 border-white break-words text-center">
            {notice.title}
          </h3>
          <p className="text-base sm:text-lg break-words text-center">
            {notice.content}
          </p>
        </div>
      ))}
    </div>
  );
};
