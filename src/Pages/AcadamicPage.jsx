import React, { useState } from 'react'
import { useEffect } from 'react'
import academicpic1 from "../assets/academicpic1.png"


export const AcadamicPage = () => {
  const [data,setData]=useState([]);
async function randomQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const output = await response.json();
  setData(output);
}
useEffect(()=>{
  randomQuote();
},[]);
  return (
    <div className='mx-auto flex gap-5 mt-5'>
      <div className='border-2 border-[#545454] rounded-[30px] flex flex-col gap-3'>
        <div className='w-[543px] h-[350px] p-4'>
        { data.length>0 && <p className='text-[#d8973c] text-[40px] itim '>{data.content}</p>}
        </div>
        <div>{data.length>0 && <p className='text-[#63a73a] text-[40px] itim p-4 '>-{data.author}</p>}</div>
      </div>
      <div className='border-2 border-[#545454] rounded-[30px]'>
        <img src={academicpic1} h={570} w={631}/>
      </div>
    </div>
  )
}
