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
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="relative w-[550px] h-[927px] flex flex-col bg-black items-center justify-center">
                {/* Back button */}
                <div className="absolute text-xl top-4 left-2">
                    <button onClick={goBack} className="flex items-center justify-center text-white p-1">
                        <ImCross className="text-white" />
                    </button>
                </div>
                <div className="absolute top-[50px] left-9">
                    <div className="text-4xl text-white itim mb-8">Welcome to Coachify</div>
                </div>
                <div className="absolute top-[90px] left-12">
                    <div className="text-white itim mb-8">nudging towards excellence...</div>
                </div>
                {/* Title */}
                <div className="absolute top-[170px] left-[175px] p-2 flex flex-col items-center text-center">
                 <div className="text-6xl text-white">
                  <FaUnlockAlt />
                  </div>
                  <div className="text-xl text-white josefin mt-2">Trouble logging in?</div>
                </div>

                {/* Form */}
                <div className="absolute w-full top-[300px] p-5 left-12 items-center justify-center">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
                        {/* Email Input */}
                        <div className="p-2 relative">
                            <div className="text-white itim">Enter Your Email</div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#63a73a] text-[25px] p-5 w-full rounded text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
                            disabled={loading}
                        >
                            <h6 className="flex items-center justify-center">
                                {loading ? "Sending..." : "Send Reset Link"} <FiSend />
                            </h6>
                        </button>
                    </form>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgetPassword;
