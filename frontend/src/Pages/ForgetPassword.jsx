import React from 'react'
import { auth } from '../../src/firebase'; // Adjust the path as needed
import { sendPasswordResetEmail } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, setValue } from '../store/booleanSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

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
        <div className='flex items-center justify-center my-[100px] mx-auto itim rounded-[20px] border-white border-2 p-6'>
            <div className='w-[628px] h-[300px] flex flex-col gap-8 items-center justify-center'>
                <h2 className='itim text-4xl'>Reset Password</h2>
                <div className='flex flex-col gap-2'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <input
                        type="email"
                        value={email}
                        className='bg-black border-white border-2 rounded-md h-[44px] w-[400px] p-2 itim m-2'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        />
                    <button type="submit" className='bg-[#63a76a] rounded-[20px] text-2xl p-3'>Reset Password</button>
                </form>
                {message && <p style={{ color: 'green' }} className='itim text-xl'>{message}</p>}
                {error && <p style={{ color: 'red' }} className='itim text-xl'>{error}</p>}
                <ToastContainer />
                </div>
            </div>
        </div>
    )
}
