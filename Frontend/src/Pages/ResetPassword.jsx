import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSend } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
        <div className="flex items-center justify-center h-full w-screen">
            <div className="w-full mx-2 sm:mx-0 sm:w-1/3 h-full border-2 border-dashed border-neutral-700 flex flex-col bg-black items-center justify-center gap-4 py-8 px-4">
                <div className="text-2xl sm:text-4xl text-white itim ">Welcome to Coachify</div>
                <div className=" text-white text-sm itim">nudging towards excellence...</div>
                <div className="text-xl sm:text-3xl text-white itim ">Reset Password</div>
                {/* Form */}

                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4">
                    {/* New Password */}
                    <div className="flex-col flex gap-2">
                        <div className="text-white itim">Enter New Password</div>
                        <div className='flex w-full gap-2'>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className="bg-neutral-800 text-[16px] sm:text-[20px] p-4  w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <div
                                className="bg-neutral-800 h-[62px] p-4 text-white cursor-pointer rounded"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash className='text-3xl' /> : <FaEye className='text-3xl' />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex-col flex gap-2">
                        <div className="text-white itim">Confirm Password</div>
                        <div className='flex w-full gap-2'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                className="bg-neutral-800 text-[16px] sm:text-[20px] p-4  w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div
                                className="bg-neutral-800 h-[62px] p-4 text-white cursor-pointer rounded"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash className='text-xl sm:text-3xl' /> : <FaEye className='text-xl sm:text-3xl' />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#63a73a] text-[20px] sm:text-[25px] p-4 w-full rounded text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
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
    );
};

export default ResetPassword;
