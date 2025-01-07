import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/reset-password', { token, newPassword });
            toast.success(response.data.message);

            setTimeout(()=>{
                navigate('/signin')
            },3000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
            setTimeout(()=>{
                navigate('/signin')
            },3000);
        }
        setLoading(false);
    };

    return (
        <div className="itim flex flex-col gap-4 py-20 items-center justify-center w-full">
            <h2 className='text-5xl'>Reset Password</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-1/5'>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className='p-3 mb-4 border rounded bg-[rgba(80,116,128,1)] text-white text-center w-full'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading} 
                className={`bg-green-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
