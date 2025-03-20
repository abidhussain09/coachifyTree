import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SideBar } from '../component/SideBar';
import { PerformanceAnalysis } from '../component/PerformanceAnalysis'
import { Notice } from '../component/Notice'
import { SubjectWiseAnalysis } from "../component/SubjectWiseAnalysis"
import { UpcomingTest } from '../component/UpcomingTest';
import { ScheduleTest } from '../component/ScheduleTest';
import { UploadNotice } from '../component/UploadNotice';
import { VerifyUser } from '../component/VerifyUser';
import { UploadSheetData } from '../component/UploadSheetData';
import { VerificationRequest } from '../component/verificationRequest';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Dashboard = () => {
    const [Data, setData] = useState({});
    const [name, setName] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const [selectedOption, setSelectedOption] = useState("Notice");

    const StudentOptions = ["Performance Analysis", "Subject-wise Analysis", "Upcoming Tests", "Notice"];
    const TeacherOptions = ["Schedule Test", "Upload Notice", "Upcoming Tests", "Notice"];
    const AdminOptions = ["Verify User", "Upload sheet Data", "Upcoming Tests", "Notice"];
    const [userRole, setUserRole] = useState('');

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('Token');
        if (!token) {
            throw new Error('User not authenticated');
        }
        const dec = jwtDecode(token);
        const { role, id, email } = dec;
        console.log(role);
        setUserRole(role);

        const response = await axios.get(`/${role}/dashboard`, {
            params: { id },
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("dashboard data", response.data.data);
        setData(response.data.data);
        setName(response.data.data.name);

        if (role === "Admin") {
            setIsVerified(true);
            return;
        }

        
        setIsVerified(response.data.data.isVerified);
        // setIsVerified(verificationResponse.data.verified);
    }
    useEffect(() => {
        fetchDashboardData();
        // if(userRole==="Student"){
        //     setSelectedOption("Performance Analysis");
        // }
        // if(userRole==="Teacher"){
        //     setSelectedOption("Schedule Test")
        // }
    }, []);

    return (
        <div className='flex flex-col items-center justify-center p-5 gap-5'>
            
            {/* Dashboard Header - Always Visible */}
            <div className='itim h-[250px] w-[1280px] p-5 bg-[#d9d9d9] bg-opacity-10 border-[1px] border-[#ffffff84] rounded-[20px] gap-7 flex items-start'>
                <div className='h-[200px] w-[200px] rounded-full bg-slate-600 bg-opacity-50'>
                    <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1735969470/panda_hf9tep.png" alt="profile" />
                </div>
                <div className='flex flex-col justify-center items-start py-12'>
                    <div className='text-5xl itim text-white'>Welcome back, {name} 👋</div>
                    <div className='text-2xl'>Keep it up and improve your progress</div>
                </div>
            </div>

            {/* Main Dashboard Section */}
            <div className='flex gap-3 w-[1280px]'>

                {/* Sidebar */}
                <div className='flex flex-col gap-8 itim bg-[#d9d9d9] bg-opacity-10 h-[800px] w-1/4 rounded-[20px] border-[1px] border-[#ffffff84]'>
                    <div className='flex items-center flex-col pt-10'>
                        <p className='text-4xl'>DASHBOARD</p>
                        <div className='bg-white h-[2px] w-[200px]'></div>
                    </div>
                    {userRole === "Student" && <SideBar options={StudentOptions} onSelect={setSelectedOption} selected={selectedOption} />}
                    {userRole === "Teacher" && <SideBar options={TeacherOptions} onSelect={setSelectedOption} selected={selectedOption} />}
                    {userRole === "Admin" && <SideBar options={AdminOptions} onSelect={setSelectedOption} selected={selectedOption} />}
                </div>

                {/* Dashboard Content */}
                <div className='itim text-4xl bg-[#d9d9d9] bg-opacity-10 h-[800px] w-3/4 rounded-[20px] border-[1px] border-[#ffffff84] p-5'>

                    {/* Notice & Upcoming Tests are always accessible */}
                    {selectedOption === "Upcoming Tests" && <UpcomingTest />}
                    {selectedOption === "Notice" && <Notice />}

                    {/* Admin has full access */}
                    {userRole === "Admin" && (
                        <>
                            {selectedOption === "Verify User" && <VerifyUser />}
                            {selectedOption === "Upload sheet Data" && <UploadSheetData />}
                        </>
                    )}

                    {/* Verified Students & Teachers can access their sections */}
                    {isVerified && userRole !== "Admin" && (
                        <>
                            {selectedOption === "Performance Analysis" && <PerformanceAnalysis email={Data.email}/>}
                            {selectedOption === "Subject-wise Analysis" && <SubjectWiseAnalysis email={Data.email} />}
                            {selectedOption === "Schedule Test" && <ScheduleTest />}
                            {selectedOption === "Upload Notice" && <UploadNotice />}
                        </>
                    )}

                    {/* If unverified and selecting a restricted section, show Verification Request */}
                    {!isVerified && userRole !== "Admin" && selectedOption !== "Upcoming Tests" && selectedOption !== "Notice" && (
                        <VerificationRequest email={Data.email} name={name}/>
                    )}
                    
                </div>
            </div>
        </div>
    );
};