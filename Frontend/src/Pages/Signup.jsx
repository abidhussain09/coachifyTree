import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_Backend_Url; // Backend URL

export const Signup = () => {
  const [verification, SetVerification] = useState(false);
  const [UserMessage, setUserMessage] = useState({
    role: 'Guest', // Default role is set to Guest
    email: '',
    password: '',
    confirmPassword: '',
    name: '', // Field for name, only used for Students
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowCondfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowCondfirmPassword(!showConfirmPassword);
  };

  const goBack = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (UserMessage.password !== UserMessage.confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }
    const { role, email, password, name } = UserMessage;

    try {
      const requestBody = { id: Date.now(), email, password, role, name };

      const response = await axios.post('/signup', requestBody);

      // console.log(response.data);
      toast.success(response.data.message);

      // dispatch(setEmail(UserMessage.email))
      localStorage.setItem("pendingEmail", UserMessage.email);
      setTimeout(() => {
        navigate('/verify-otp');
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred!';
      console.error(errorMessage);
      toast.error(errorMessage);
    }

    setPasswordError('');
    setUserMessage({
      role: 'Guest', // Reset to default role
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-2/5 h-full flex flex-col bg-black border-2 border-dashed border-neutral-700 items-center justify-center gap-2 p-4 py-8">
        <div className="text-5xl text-white itim text-left w-full px-6">Welcome to Coachify</div>
        <div className=" text-white itim mb-4 text-start w-full px-7 text-xl ">nudging towards excellence...</div>

        <form onSubmit={handleSubmit} className="flex flex-col  w-11/12 gap-4">
          {/* Role Dropdown */}
          <select
            name="role"
            value={UserMessage.role}
            onChange={changeHandler}
            className="bg-neutral-800 text-[20px] p-2 w-full h-[53px] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="Guest">Guest</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          {/* Name Input for Students */}
          <div className='flex gap-4 w-full'>

            <div className='flex flex-col gap-2 w-full'>
              <div className='text-white itim '> First name</div>
              <input
                type='text'
                placeholder='Enter your first name'
                name='name'
                value={UserMessage.name}
                autoComplete='off'
                onChange={changeHandler}
                className="bg-neutral-800 text-[16px] p-4  w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <div className='text-white itim '> Last name</div>
              <input
                type='text'
                placeholder='Enter your last name'
                name='name'
                value={UserMessage.name}
                autoComplete='off'
                onChange={changeHandler}
                className="bg-neutral-800 text-[16px] p-4  w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>


          {/* Email Input */}
          <div className='flex flex-col gap-2'>

            <div className='text-white itim '>Email Address</div>
            <input
              type='email'
              placeholder='Enter your E-mail id'
              name='email'
              value={UserMessage.email}
              autoComplete='off'
              onChange={changeHandler}
              className="bg-neutral-800 text-[20px] p-4  w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex-col flex gap-2">
            <div className='text-white itim '> Password</div>
            <div className='flex w-full gap-2'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Create your password'
                name='password'
                value={UserMessage.password}
                autoComplete='off'
                onChange={changeHandler}
                className="bg-neutral-800 text-[20px] p-4  w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <div
                className="bg-neutral-800 h-[62px] p-4 text-white cursor-pointer rounded"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash className='text-3xl' /> : <FaEye className='text-3xl' />}
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex-col flex gap-2 ">
            <div className='text-white itim '>Confirm Password</div>
            <div className='flex w-full gap-2'>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
                name='confirmPassword'
                value={UserMessage.confirmPassword}
                autoComplete='off'
                onChange={changeHandler}
                className="bg-neutral-800 text-[20px] p-4  w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <div
                className="bg-neutral-800 h-[62px] p-4 text-white cursor-pointer rounded"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash className='text-3xl' /> : <FaEye className='text-3xl' />}
              </div>
            </div>
          </div>

          {/* Password Error */}
          {passwordError && <div className="text-red-500 text-md">{passwordError}</div>}

          {/* Submit Button */}
          <button
            type='submit'
            className="bg-[#63a73a] text-[25px] p-4 w-full rounded-lg text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
          >
            <div className="flex items-center justify-center gap-2">Sign Up <FiSend /></div>
          </button>
        </form>

        {/* Toast Notifications */}
        <ToastContainer />
        {/* Verification Message */}
        {
          verification &&
          <div className="itim text-xl text-green-500 text-center ">Verification e-mail sent, please verify</div>
        }
      </div>
    </div>
  );
};
