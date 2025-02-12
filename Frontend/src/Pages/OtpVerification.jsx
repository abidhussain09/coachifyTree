import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export const OTPVerification = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem('pendingEmail')); // Retrieve email from localStorage
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    // Check verification status when the component loads
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

            // Clear email from localStorage after successful verification
            localStorage.removeItem('pendingEmail');

            // Redirect to dashboard or login page
            setTimeout(()=>{
                navigate('/dashboard', { replace: true });
            },3000);
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
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-20">
            <h2 className="text-3xl font-bold mb-6 text-center">Verify OTP</h2>

            <form onSubmit={handleOTPSubmit} className="flex flex-col w-full max-w-md">
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="p-3 mb-4 border rounded bg-[rgba(80,116,128,1)] text-white"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-green-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>

            <button
                onClick={handleResendOTP}
                className="mt-4 text-blue-500 underline"
            >
                Resend OTP
            </button>

            <ToastContainer />
        </div>
    );
};
