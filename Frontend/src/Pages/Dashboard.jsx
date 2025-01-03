import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Dashboard = () => {
    const [email,setEmail]=useState("");
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
    console.log('dashboard data', response.data);

    }
    useEffect(()=>{
        fetchDashboardData();
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
