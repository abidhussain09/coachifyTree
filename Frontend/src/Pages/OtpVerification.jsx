import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export const OTPVerification = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem('pendingEmail'));
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkVerificationStatus = async () => {
            if (!email) {
                navigate('/signup', { replace: true });
                return;
            }

            try {
                const response = await axios.post('/check-verification', { email });
                if (response.data.isVerified) {
                    toast.info('Your email is already verified!');
                    navigate('/signin', { replace: true });
                }
            } catch (error) {
                console.error('Error checking verification status:', error);
            }
        };

        checkVerificationStatus();
    }, [email, navigate]);

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/verify-otp', { email, otp });
            toast.success(response.data.message);

            localStorage.removeItem('pendingEmail');

            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 3000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'OTP verification failed!';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await axios.post('/resend-otp', { email });
            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to resend OTP!';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="w-screen min-h-[100px] flex flex-col items-center p-4">
            <div className="bg-black border-2 border-dashed border-neutral-700 
                            w-full sm:w-2/3 md:w-1/2 lg:w-1/3 
                            flex flex-col items-center justify-center 
                            px-6 pt-8 pb-6 gap-4 rounded-2xl shadow-lg">
                
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
                    Enter OTP for Verification
                </h2>
                
                <form onSubmit={handleOTPSubmit} className="flex flex-col w-full gap-4">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="bg-neutral-800 text-lg sm:text-xl p-3 sm:p-4 w-full rounded text-white 
                                   placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-[#63a73a] text-xl sm:text-2xl p-3 sm:p-4 w-full font-roboto 
                                    hover:bg-green-600 transition duration-300 text-white rounded-xl 
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                <button
                    onClick={handleResendOTP}
                    className="text-blue-400 hover:text-blue-500 underline font-medium mt-2"
                >
                    Resend OTP
                </button>

                <ToastContainer />
            </div>
        </div>
    );
};
