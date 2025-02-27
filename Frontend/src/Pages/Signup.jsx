import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setEmail } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { IconContext } from "react-icons";
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
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      const requestBody =  {id: Date.now(), email, password, role, name};

      const response = await axios.post('/signup', requestBody);

      // console.log(response.data);
      toast.success(response.data.message);

      // dispatch(setEmail(UserMessage.email))
      localStorage.setItem("pendingEmail",UserMessage.email);
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

    <div className="flex items-center justify-center min-h-screen w-full ">
    <div className="relative w-[550px] h-[927px] flex flex-col bg-black items-center justify-center ">
      {/* Back button */}
      <div className="absolute top-4 left-2">
        <button onClick={goBack} className="flex items-center justify-center text-white p-1">
          <ImCross className=" text-white" />
        </button>
      </div>
      <div className="absolute top-[45px] left-9">
      <div className="text-4xl text-white itim mb-8 ">Welcome to Coachify</div>
      </div>
      <div className="absolute top-[88px] left-12">
      <div className=" text-white itim mb-8 ">nudging towards excellence...</div>
      </div>
      <div className="absolute w-full top-[150px] left-12 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-[470px] bg-transparent ">
        {/* Role Dropdown */}
        <select
          name="role"
          value={UserMessage.role}
          onChange={changeHandler}
          className="bg-neutral-800 text-[18px] p-2 mb-4 w-[82px] h-[53px] text-white rounded-lg"
          required
        >
          <option value="Guest">Guest</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Name Input for Students */}
        <div className='flex'>

          <div className='p-2'>
          <div className='text-white itim '> First name</div>
          <input
            type='text'
            placeholder='Enter your first name'
            name='name'
            value={UserMessage.name}
            autoComplete='off'
            onChange={changeHandler}
            className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          </div>
          <div className='p-2'>
          <div className='text-white itim '> Last name</div>
          <input
            type='text'
            placeholder='Enter your first name'
            name='name'
            value={UserMessage.name}
            autoComplete='off'
            onChange={changeHandler}
            className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />
          </div>
        </div>


        {/* Email Input */}
        <div className='p-2'>
          
        <div className='text-white itim '>Email Address</div>
        <input
          type='email'
          placeholder='Enter your E-mail id'
          name='email'
          value={UserMessage.email}
          autoComplete='off'
          onChange={changeHandler}
          className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        </div>

        {/* Password Input */}
        <div className="relative p-2">
        <div className='text-white itim '> Password</div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Create your password'
            name='password'
            value={UserMessage.password}
            autoComplete='off'
            onChange={changeHandler}
            className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <IconContext.Provider value={{ className: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-[20px] text-white cursor-pointer' }}>
            {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
          </IconContext.Provider>
        </div>

        {/* Confirm Password Input */}
        <div className="relative p-2">
        <div className='text-white itim '>Confirm Password</div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm your password'
            name='confirmPassword'
            value={UserMessage.confirmPassword}
            autoComplete='off'
            onChange={changeHandler}
            className="bg-neutral-800 text-[20px] p-4 mb-4 w-full rounded pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <IconContext.Provider value={{ className: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-[20px] text-white cursor-pointer' }}>
            {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
          </IconContext.Provider>
        </div>

        {/* Password Error */}
        {passwordError && <div className="text-red-500 text-xs mb-4">{passwordError}</div>}

        {/* Submit Button */}
        <button
          type='submit'
          className="bg-[#63a73a] text-[25px] p-4 w-full rounded-lg text-aliceblue itim font-roboto hover:bg-green-600 transition duration-300"
        >
          <h6 className="flex items-center justify-center ">Sign Up <FiSend /></h6>
        </button>
      </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />


      {/* Verification Message */}
      {
        verification &&
        <div className="itim text-xl text-green-500 text-center mt-4">Verification e-mail sent, please verify</div>
      }
    </div>
    </div>
  );
};
