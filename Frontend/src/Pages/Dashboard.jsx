import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SideBar } from '../component/SideBar';
import {PerformanceAnalysis} from '../component/PerformanceAnalysis'
import {Notice} from '../component/Notice'
import {SubjectWiseAnalysis} from "../component/SubjectWiseAnalysis"
import { UpcomingTest } from '../component/UpcomingTest'; 
import { ScheduleTest } from '../component/ScheduleTest';
import { UploadNotice } from '../component/UploadNotice';
import { VerifyUser } from '../component/VerifyUser';
import { UploadSheetData } from '../component/UploadSheetData';
import { VerificationRequest } from '../component/verificationRequest';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Dashboard = () => {
    const [Data,setData]=useState({});
    const [name,setName]=useState("");
    //const [isVerified, setIsVerified] = useState(null);

    const [selectedOption,setSelectedOption]=useState("");

    const StudentOptions=["Performance Analysis","Subject-wise Analysis","Upcoming Tests","Notice"];
    const Teacheroptions=["Schedule Test","Upload Notice","Upcoming Tests","Notice"];
    const AdminOptions=["Verify User","Upload sheet Data","Upcoming Tests","Notice"];
    const [userRole,setUserRole]=useState('');

    const fetchDashboardData= async()=>{
    const token=localStorage.getItem('Token');
    if(!token){
        throw new Error('User not authenticated');
    }
    const dec=jwtDecode(token);
    const {role,id,email}=dec;
    console.log(role);
    setUserRole(role);
    
    // const verificationResponse = await axios.get(`/user/verification-status`, {
    //     params: { email },
    //     headers: { Authorization: `Bearer ${token}` },
    // });

    //setIsVerified(verificationResponse.data.isVerified); 

    // if (verificationResponse.data.isVerified) {
                const response = await axios.get(`/${role}/dashboard`, {
                    params: { id },
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("dashboard data", response.data.data);
                setData(response.data.data);
            //}
    setName(response.data.data.name);
    }
    useEffect(()=>{
        fetchDashboardData();
        // if(userRole==="Student"){
        //     setSelectedOption("Performance Analysis");
        // }
        // if(userRole==="Teacher"){
        //     setSelectedOption("Schedule Test")
        // }
    },[]);

    // if (isVerified === false) {
    //     return <VerificationRequest />;
    // }
    return (
        <div className='flex flex-col items-center justify-center p-5 gap-5'>
            <div className='itim h-[250px] w-[1280px] p-5 bg-[#d9d9d9] bg-opacity-10 border-[1px] border-[#ffffff84]	 rounded-[20px] gap-7 flex items-start'>
                <div className='h-[200px] w-[200px] rounded-full bg-slate-600 bg-opacity-50'><img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1735969470/panda_hf9tep.png"/></div>
                <div className='flex flex-col justify-center items-start py-12'>
                    <div className='text-5xl itim text-white'>Welcome back, {name} 👋 </div>
                    <div className='text-2xl'>Keep it up and  improve  your progress</div>
                </div>
            </div>
            <div className='flex gap-3 w-[1280px]'>
                <div className='flex flex-col gap-8 itim bg-[#d9d9d9] bg-opacity-10 h-[800px] w-1/4 rounded-[20px] border-[1px] border-[#ffffff84]'>
                    <div className='flex items-center flex-col pt-10'>
                        <p className='text-4xl'>DASHBOARD</p>
                        <div className='bg-white h-[2px] w-[200px]'></div>
                    </div>
                    {  userRole==="Student" &&
                        <SideBar options={StudentOptions} onSelect={setSelectedOption} selected={selectedOption}/>
                    }
                    {
                        userRole==="Teacher" &&
                        <SideBar options={Teacheroptions} onSelect={setSelectedOption} selected={selectedOption}/>
                    }
                    {
                        userRole==="Admin" &&
                        <SideBar options={AdminOptions} onSelect={setSelectedOption} selected={selectedOption}/>
                    }
                </div>
                <div className='itim text-4xl bg-[#d9d9d9] bg-opacity-10 h-[800px] w-3/4 rounded-[20px] border-[1px] border-[#ffffff84]'>
                    {selectedOption ==="Performance Analysis" && <PerformanceAnalysis/>}
                    {selectedOption ==="Subject-wise Analysis" && <SubjectWiseAnalysis/>}
                    {selectedOption ==="Upcoming Tests" && <UpcomingTest/>}
                    {selectedOption ==="Notice" && <Notice/> }
                    {selectedOption==="Schedule Test" && <ScheduleTest/>}
                    {selectedOption==="Upload Notice" && <UploadNotice/>}
                    {selectedOption==="Verify User" && <VerifyUser/>}
                    {selectedOption==="Upload sheet Data" && <UploadSheetData/>}
                    {/* {selectedOption===" " && <VerificationRequest/>} */}
                </div>
            </div>
        </div>
    )
}
