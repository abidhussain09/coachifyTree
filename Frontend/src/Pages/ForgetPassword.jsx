import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend } from "react-icons/fi";
import { FaUnlockAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/'); // Adjust if needed
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/forgot-password', { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            <div className="w-full mx-2 sm:mx-0 sm:w-1/3 h-full flex flex-col bg-black border-2 border-dashed border-neutral-700 items-center justify-center p-8 gap-4">
                <div className="text-4xl text-white itim w-full text-center">Welcome to Coachify</div>
                <div className="text-white itim text-center w-full">nudging towards excellence...</div>
                <div className="text-5xl text-white w-full">
                    <FaUnlockAlt className='text-center w-full'/>
                </div>
                <div className="text-xl text-white josefin w-full text-center">Trouble logging in?</div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-8">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <div className="text-white itim">Enter Your Email</div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-neutral-800 text-[16px] sm:text-[20px] p-4  w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#63a73a] text-[20px] sm:text-[25px] p-5 w-full rounded text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
                        disabled={loading}
                    >
                        <h6 className="flex items-center justify-center">
                            {loading ? "Sending..." : "Send Reset Link"} <FiSend />
                        </h6>
                    </button>
                </form>
            <ToastContainer />
            </div>
        </div>

    );
};

export default ForgetPassword;
