import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SideBar } from '../component/SideBar';
import { PerformanceAnalysis } from '../component/PerformanceAnalysis';
import { Notice } from '../component/Notice';
import { SubjectWiseAnalysis } from "../component/SubjectWiseAnalysis";
import { UpcomingTest } from '../component/UpcomingTest';
import { ScheduleTest } from '../component/ScheduleTest';
import { UploadNotice } from '../component/UploadNotice';
import { VerifyUser } from '../component/VerifyUser';
import { UploadSheetData } from '../component/UploadSheetData';
import { VerificationRequest } from '../component/verificationRequest';
import { ManageNotice } from '../component/ManageNotice';
import { ManageUpcomingTest } from '../component/ManageUpcomingTests';
import { ManageSheetDetails } from '../component/ManageSheetDetails';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url;

export const Dashboard = () => {
    const [Data, setData] = useState({});
    const [name, setName] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Notice");
    const [userRole, setUserRole] = useState('');

    const StudentOptions = ["Notice", "Upcoming Tests", "Performance Analysis", "Subject-wise Analysis"];
    const TeacherOptions = ["Manage Notice","Manage Upcoming Tests", "Schedule Test", "Upload Notice"];
    const AdminOptions = ["Notice", "Upcoming Tests", "Verify User","Manage Sheet Details", "Upload sheet Data"];

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('Token');
            if (!token) return;

            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.role);

            const response = await axios.get(`/${decodedToken.role}/dashboard`, {
                params: { id: decodedToken.id },
                headers: { Authorization: `Bearer ${token}` }
            });

            setData(response.data.data);
            setName(response.data.data.name);
            setIsVerified(decodedToken.role === "Admin" ? true : response.data.data.isVerified);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const getOptions = () => {
        if (userRole === "Student") return StudentOptions;
        if (userRole === "Teacher") return TeacherOptions;
        if (userRole === "Admin") return AdminOptions;
        return [];
    };

    return (
        <div className='w-screen mt-5 flex flex-col items-center gap-5 px-3 sm:px-5'>

            <div className='itim flex items-center lg:items-start w-full max-w-[1280px] sm:h-[220px] p-2 md:p-5 bg-[#d9d9d9] bg-opacity-10 border border-[#ffffff84] rounded-[20px] sm:gap-5'>
                
                <div className='md:h-[150px] md:w-[150px] md:mt-5 h-[70px] w-[70px]  rounded-full bg-slate-600 bg-opacity-50 overflow-hidden'>
                    <img className='w-full h-full object-cover' src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1735969470/panda_hf9tep.png" alt="profile" />
                </div>

                <div className='flex md:ml-5 md:mt-5 flex-col p-3 sm:p-4 justify-center items-center sm:items-center lg:items-start text-left'>
                    <div className='md:text-5xl text-[24px] itim text-white'>
                        Welcome back, {name} 👋
                    </div>
                    <div className='text-xs mt-1 md:ml-2 sm:text-base lg:text-2xl'>
                        Keep it up and improve your progress
                    </div>
                </div>
            </div>

            <div className='flex gap-3 flex-col sm:flex-row w-full max-w-[1280px]'>

                <div className='hidden sm:flex flex-col gap-8 itim bg-[#d9d9d9] bg-opacity-10 h-[800px] w-1/4 rounded-[20px] border-[1px] border-[#ffffff84]'>
                    <div className='flex items-center flex-col pt-10'>
                        <p className='text-4xl'>DASHBOARD</p>
                        <div className='bg-white h-[2px] w-[200px]'></div>
                    </div>
                    <SideBar options={getOptions()} onSelect={setSelectedOption} selected={selectedOption} />
                </div>

                <div className="sm:hidden flex justify-center mb-2">
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="text-base p-2 rounded-lg bg-[#2f2f2f] text-white border border-white"
                    >
                        {getOptions().map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className='itim text-4xl h-auto w-full sm:w-3/4 bg-[#d9d9d9] bg-opacity-10 rounded-[20px] border border-[#ffffff84] p-5 overflow-y-auto overflow-x-auto'>

                    {selectedOption === "Upcoming Tests" && <UpcomingTest />}
                    {selectedOption === "Notice" && <Notice />}

                    {userRole === "Admin" && selectedOption === "Verify User" && <VerifyUser />}
                    {userRole === "Admin" && selectedOption === "Upload sheet Data" && <UploadSheetData />}
                    {userRole === "Admin" && selectedOption === "Manage Sheet Details" && <ManageSheetDetails/>}

                    {isVerified && selectedOption === "Performance Analysis" && <PerformanceAnalysis email={Data.email} />}
                    {isVerified && selectedOption === "Subject-wise Analysis" && <SubjectWiseAnalysis email={Data.email} />}
                    {isVerified && selectedOption === "Schedule Test" && <ScheduleTest />}
                    {isVerified && selectedOption === "Upload Notice" && <UploadNotice />}
                    {isVerified && selectedOption === "Manage Notice" && <ManageNotice/>}
                    {isVerified && selectedOption === "Manage Upcoming Tests" && <ManageUpcomingTest/>}

                    {!isVerified && selectedOption !== "Upcoming Tests" && selectedOption !== "Notice" &&
                        <VerificationRequest email={Data.email} name={name} />
                    }

                </div>
            </div>
        </div>
    );
};
