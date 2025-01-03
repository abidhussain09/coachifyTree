import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setValue } from '../store/booleanSlice';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Signin = () => {

  const dispatch=useDispatch();
  const [UserMessage, setUserMessage] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = UserMessage;

    try {
      const response = await axios.post('/signin', { email, password });

      // Extract JWT token from the response
      const token = response.data.token;

      // Store token in localStorage (or cookies, depending on your preference)
      localStorage.setItem('Token', token);

      console.log("Login Successful", response.data);
      toast.success('Signed in successfully!');
      
      // Redirect to the home page or dashboard after successful login
      dispatch(setValue(false));
      setTimeout(() => {
        navigate('/dashboard'); // Update route as per your app structure
      }, 2000);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Invalid Credentials');
    }

    setUserMessage({
      email: '',
      password: '',
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <button onClick={goBack} className="flex items-center justify-center text-white p-2">
          <ImCross className="text-2xl text-white" />
        </button>
      </div>
      
      {/* Title */}
      <div className="text-5xl text-white itim mb-8 text-center">Login</div>

      <form onSubmit={SubmitHandler} className="flex flex-col w-full max-w-md">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your E-mail ID"
          name="email"
          value={UserMessage.email}
          autoComplete="off"
          onChange={changeHandler}
          className="bg-[rgba(80,116,128,1)] text-[20px] p-4 mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            name="password"
            value={UserMessage.password}
            autoComplete="off"
            onChange={changeHandler}
            className="bg-[rgba(80,116,128,1)] text-[20px] p-4 mb-4 w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <IconContext.Provider value={{ className: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-[20px] text-white cursor-pointer' }}>
            {showPassword ? (
              <FaEyeSlash onClick={togglePasswordVisibility} />
            ) : (
              <FaEye onClick={togglePasswordVisibility} />
            )}
          </IconContext.Provider>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#63a73a] text-[25px] p-4 w-full rounded text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
        >
          <h6 className="flex items-center justify-center">Sign In <FiSend /></h6>
        </button>
      </form>

      <ToastContainer />

      {/* Signup Link */}
      <div className="flex items-center my-8">
        <span className="text-xl text-white mr-2">Don't have an account?</span>
        <button
          className="text-xl text-white underline hover:text-green-300 transition duration-300"
          onClick={() => navigate('/signup')}
        >
          Signup
        </button>
      </div>

      {/* Forgot Password Link */}
      <p className="text-sm text-white">
        Forgot password? <Link to="/resetpassword" className="text-blue-500">Reset it here</Link>
      </p>
    </div>
  );
};
