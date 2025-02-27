import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSend } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const goBack = () => {
        navigate('/'); // Adjust if needed
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/reset-password', { token, newPassword });
            toast.success(response.data.message);
            
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="relative w-[550px] h-[927px] flex flex-col bg-black items-center justify-center">
                {/* Back button */}
                <div className="absolute text-xl top-4 left-2">
                    <button onClick={goBack} className="flex items-center justify-center text-white p-1">
                        <ImCross className="text-white" />
                    </button>
                </div>
                <div className="absolute top-[50px] left-9">
          <div className="text-4xl text-white itim mb-8 ">Welcome to Coachify</div>
          </div>
          <div className="absolute top-[90px] left-12">
          <div className=" text-white itim mb-8 ">nudging towards excellence...</div>
          </div>
                {/* Title */}
                <div className="absolute top-[170px] left-[175px]">
                    <div className="text-3xl text-white itim mb-8">Reset Password</div>
                </div>

                {/* Form */}
                <div className="absolute w-full top-[250px] p-5 left-12 items-center justify-center">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
                        {/* New Password */}
                        <div className="p-2 relative">
                            <div className="text-white itim">Enter New Password</div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <IconContext.Provider value={{ className: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-[20px] text-white cursor-pointer' }}>
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
                            </IconContext.Provider>
                        </div>

                        {/* Confirm Password */}
                        <div className="p-2 relative">
                            <div className="text-white itim">Confirm Password</div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#63a73a] text-[25px] p-4 w-full rounded text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
                            disabled={loading}
                        >
                            <h6 className="flex items-center justify-center">
                                {loading ? "Processing..." : "Reset Password"} <FiSend />
                            </h6>
                        </button>
                    </form>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ResetPassword;
