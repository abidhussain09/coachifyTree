import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setValue } from '../store/booleanSlice';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url;

export const Signin = () => {
  const dispatch = useDispatch();
  const [UserMessage, setUserMessage] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = UserMessage;
    try {
      const response = await axios.post('/signin', { email, password });
      const token = response.data.token;
      localStorage.setItem('Token', token);
      toast.success('Signed in successfully!');
      dispatch(setValue(false));
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Invalid Credentials');
    }
    setUserMessage({ email: '', password: '' });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-1/3 h-[80vh] flex flex-col bg-black border-2 border-dashed border-neutral-700 items-center justify-center gap-2">
        <div className="text-5xl text-white itim text-left w-full px-6">Welcome back</div>
        <div className="text-white itim mb-4 text-start w-full px-7 text-xl">Please sign in to continue</div>
        <form onSubmit={SubmitHandler} className="flex flex-col w-full max-w-md">
          <div className='flex-col flex gap-2'>
            <div className='text-white itim'>Email Address</div>
            <input
              type="email"
              placeholder="Enter your E-mail ID"
              name="email"
              value={UserMessage.email}
              autoComplete="off"
              onChange={changeHandler}
              className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex-col flex gap-2">
            <div className='text-white itim'>Password</div>
            <div className="flex w-full gap-2 ">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                value={UserMessage.password}
                autoComplete="off"
                onChange={changeHandler}
                className="bg-neutral-800 text-[20px] p-4  mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <div
                className="bg-neutral-800 h-[62px] p-4 text-white cursor-pointer rounded"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash className='text-3xl'/> : <FaEye className='text-3xl'/>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#63a73a] text-[25px] p-4 w-full rounded text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
          >
            <h6 className="flex items-center justify-center">Sign In <FiSend /></h6>
          </button>
        </form>
        <ToastContainer />
        <p className="text-sm text-white">
          Forgot password? <Link to="/forgetpassword" className="text-blue-500">Reset it here</Link>
        </p>
      </div>
    </div>
  );
};
