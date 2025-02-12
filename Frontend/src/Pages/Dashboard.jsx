import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SideBar } from '../component/SideBar';
import {PerformanceAnalysis} from '../component/PerformanceAnalysis'
import {Notice} from '../component/Notice'
import {SubjectWiseAnalysis} from "../component/SubjectWiseAnalysis"
import { UpcomingTest } from '../component/UpcomingTest'; 

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Dashboard = () => {
    const [Data,setData]=useState({});

    const [selectedOption,setSelectedOption]=useState("Performance Analysis");

    const options=["Performance Analysis","Subject-wise Analysis","Upcoming Tests","Notice"];

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
        <div className='flex flex-col items-center justify-center p-5 gap-5'>
            <div className='itim h-[250px] w-[1280px] p-5 bg-[#d9d9d9] bg-opacity-10 border-[1px] border-[#ffffff84]	 rounded-[20px] gap-7 flex items-start'>
                <div className='h-[200px] w-[200px] rounded-full bg-slate-600 bg-opacity-50'><img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1735969470/panda_hf9tep.png"/></div>
                <div className='flex flex-col justify-center items-start py-12'>
                    <div className='text-5xl itim text-white'>Welcome back, {Data.name} 👋 </div>
                    <div className='text-2xl'>Keep it up and  improve  your progress</div>
                </div>
            </div>
            <div className='flex gap-3 w-[1280px]'>
                <div className='flex flex-col gap-8 itim bg-[#d9d9d9] bg-opacity-10 h-[1136px] w-1/4 rounded-[20px] border-[1px] border-[#ffffff84]'>
                    <div className='flex items-center flex-col pt-10'>
                        <p className='text-4xl'>DASHBOARD</p>
                        <div className='bg-white h-[2px] w-[200px]'></div>
                    </div>
                        <SideBar options={options} onSelect={setSelectedOption} selected={selectedOption}/>
                </div>
                <div className='itim text-4xl bg-[#d9d9d9] bg-opacity-10 h-[1136px] w-3/4 rounded-[20px] border-[1px] border-[#ffffff84]'>
                    {selectedOption ==="Performance Analysis" && <PerformanceAnalysis/>}
                    {selectedOption ==="Subject-wise Analysis" && <SubjectWiseAnalysis/>}
                    {selectedOption ==="Upcoming Tests" && <UpcomingTest/>}
                    {selectedOption ==="Notice" && <Notice/> }
                </div>
            </div>
        </div>
    )
}
