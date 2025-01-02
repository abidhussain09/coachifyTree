import React, { useEffect, useState } from 'react'

export const Dashboard = () => {
    const [email,setEmail]=useState("");
    useEffect(()=>{

    },[]);
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='itim text-xl'>Hello User</div>
            <div className='w-full h-[2px] bg-white'></div>
            <div className='flex '>
                <div>{email}</div>
                <div></div>
            </div>
        </div>
    )
}
