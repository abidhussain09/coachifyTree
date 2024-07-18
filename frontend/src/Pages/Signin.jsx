import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';
import {auth} from '../../src/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, setValue } from '../store/booleanSlice';


export const Signin = () => {

  const booleanValue = useSelector((state) => state.booleanValue);
  const dispatch = useDispatch();

  const [UserMessage, setUserMessage] = useState({
    name: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitHandler = async (event) => {
    const {name,password}=UserMessage;
    event.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,name,password);
      console.log("Login Successfull")
      toast.success('Signed in successfully!');
      dispatch(setValue(false));
      setTimeout(()=>{
        goBack();
      },4000)
    }
    catch(err){
      console.log(err);
      toast.error("Invalid Credential");
    }
    setUserMessage({
      name: '',
      password: '',
    });
    // console.log("signing In");
    // console.log(UserMessage);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    // Use history.goBack() if you're using React Router v5
    // Use navigate(-1) if you're using React Router v6 with a useNavigate hook
    // For simplicity, window.history.back() is used here
    // window.history.back();
    navigate('/');
  };

  return (
    <div className="relative w-full h-full  flex flex-col items-center justify-center px-4">
      <div className="h-24 w-full  mt-4 rounded"></div> 
      <div className="absolute top-4 left-4">
        <button onClick={goBack} className="flex items-center justify-center text-white p-2">
          <ImCross className="text-2xl text-white" />
        </button>
      </div>
      <div className="text-5xl text-white itim mb-8">Login with mobile</div>
      <form onSubmit={SubmitHandler} className="flex flex-col w-full max-w-md">
        <input
          type='email'
          placeholder='Enter your E-mail id'
          name='name'
          value={UserMessage.name}
          autoComplete='off'
          onChange={changeHandler}
          className="bg-[rgba(80,116,128,1)] text-[20px] p-4 mb-4 w-full rounded"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            name='password'
            value={UserMessage.password}
            autoComplete='off'
            onChange={changeHandler}
            className="bg-[rgba(80,116,128,1)] text-[20px] p-4 mb-4 w-full rounded pr-10"
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
        <button
          type='submit'
          className="bg-[rgba(99,167,106,1)] text-[25px] p-4 w-full rounded text-aliceblue itim font-roboto"
        >
          <h6 className="flex items-center justify-center">Sign In <FiSend /></h6>
        </button>
      </form>
      <ToastContainer />
      <div className="flex items-center mt-8">
        <span className="text-xs text-white mr-2">Don't have an account?</span>
        <button
          className="text-[11px] text-white underline"
          onClick={()=>{navigate('/signup')}}
        >
          Signup
        </button>
      </div>
      {/* Add more content or spacing here to increase the length of the page */}
      <div className="h-24 w-full  mt-15 rounded"></div> {/* Example of adding more content */}
    </div>
  );
};
