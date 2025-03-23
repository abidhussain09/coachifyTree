import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL
export const Notice = () => {
  const [notices,setNotices]=useState([]);
  async function getNotices(){
    try{
      const data=await axios.get('/notices/');
      setNotices(data.data);
      console.log(notices);
    }
    catch(error){
      console.log(error);
      console.log("error in fetching the notices");
    }
  };
  useEffect(()=>{
    console.log("fetching");
    getNotices();
  },[]);

  return (
    <div className='flex items-center justify-center h-full flex-wrap gap-4 p-2 overflow-y-auto'>
      {notices.map((notice, index) => (
    <div
      key={index}
      className="flex gap-4 px-4 py-6 w-[280px] h-[350px] flex-col items-center rounded-[20px] 
                bg-neutral-800 text-white  border-2 border-transparent 
                  hover:border-[#63a73a] hover:bg-neutral-900"
    >
      <h3 className="text-2xl border-b-2 border-white text-wrap">{notice.title}</h3>
      <p className="text-lg text-wrap ">{notice.content}</p>
    </div>
  ))}
    </div>
  )
}
