import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="itim flex flex-col gap-4 py-20 items-center justify-center w-full">
            <h2 className='text-5xl'>Forgot Password</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-1/5'>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className='p-3 mb-4 border rounded bg-[rgba(80,116,128,1)] text-white text-center text-xl w-full'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}
                className={`bg-green-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        </div>
    );
};

export default ForgetPassword;
