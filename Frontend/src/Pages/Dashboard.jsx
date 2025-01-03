import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Dashboard = () => {
    const [Data,setData]=useState({});
    const fetchDashboardData= async()=>{
    const token=localStorage.getItem('Token');
    if(!token){
        throw new Error('User not authenticated');
    }
    const dec=jwtDecode(token);
    const {role,id}=dec;
    
    const response=await axios.get(`/${role}/dashboard`,{
        params:{id},
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('dashboard data', response.data.data);
    setData(response.data.data);
    }
    useEffect(()=>{
        fetchDashboardData();
    },[]);
    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <div className='itim h-[250px] w-[1280px] p-5 bg-[#d9d9d9] bg-opacity-10 border-[1px] border-[#ffffffad]	 rounded-[20px] gap-7 flex items-start'>
                <div className='h-[200px] w-[200px] rounded-full bg-slate-600 bg-opacity-50'><img /></div>
                <div className='flex flex-col justify-center items-start py-12'>
                    <div className='text-5xl itim text-white'>Welcome back, {Data.name} 👋 </div>
                    <div className='text-2xl'>Keep it up and  improve  your progress</div>
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='itim text-4xl'>{Data.email}</div>
                <div className='itim text-4xl'>{Data.name}</div>
            </div>
        </div>
    )
}
