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
      {
        notices.map((notice)=>{
          return <div className='flex gap-4 px-2 py-4 w-[280px] h-[350px] flex-col items-center  rounded-[20px] bg-neutral-800'>
            <h3 className='text-2xl'>{notice.title}</h3>
            <p className='text-lg text-wrap'>{notice.content}</p>
          </div>
        })
      }
    </div>
  )
}
