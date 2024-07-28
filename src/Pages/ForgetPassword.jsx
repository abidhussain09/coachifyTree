import React, { useState } from 'react';
import { auth } from '../../src/firebase'; // Adjust the path as needed
import { sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent. Check your inbox.');
        } catch (error) {
            setError('Error sending password reset email. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex items-center justify-center my-[100px] mx-auto itim rounded-[20px] border-white border-2 p-4 sm:p-6 max-w-sm sm:max-w-md'>
            <div className='w-full sm:w-[628px] flex flex-col gap-4 sm:gap-8 items-center justify-center'>
                <h2 className='itim text-3xl sm:text-4xl text-center'>Reset Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:gap-5 items-center'>
                    <input
                        type="email"
                        value={email}
                        className='bg-black border-white border-2 rounded-md h-[44px] w-[280px] sm:w-[400px] p-2 itim'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit" className='bg-[#63a76a] rounded-[20px] text-xl sm:text-2xl p-3 sm:w-[400px] w-[280px]'>
                        Reset Password
                    </button>
                </form>
                {message && <p style={{ color: 'green' }} className='itim text-lg sm:text-xl'>{message}</p>}
                {error && <p style={{ color: 'red' }} className='itim text-lg sm:text-xl'>{error}</p>}
                <ToastContainer />
            </div>
        </div>
    );
}
