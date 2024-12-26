import React, { useEffect, useState } from 'react';
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';
import {auth} from '../../src/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export const Signup = () => {
  const [verification,SetVerification]=useState(false);
  const [UserMessage, setUserMessage] = useState({
    phoneNumber:'',
    password:'',
    confirmPassword:'',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate=useNavigate();
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
    const {phoneNumber,password}=UserMessage;
    if (!isValidEmail(phoneNumber)) {
      toast.error("Invalid Email");
  }
    try{
      const userCredential =await createUserWithEmailAndPassword(auth,phoneNumber,password);
      const user=userCredential.user;
      await sendEmailVerification(user);
      SetVerification(true);
      toast.success("A verification email is send");
      toast.success("Please verify to login");
      // console.log("Account Created");
      // toast.success('Account Created Sucessfully, Proceed to Signin!');
      setTimeout(()=>{
        navigate("/signin");
      },5000)
    }
    catch(err){
      console.log(err);
    }
    setPasswordError('');
    setUserMessage({
      phoneNumber:'',
    password:'',
    confirmPassword:'',
    });
  };


  // Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
      <div className="h-24 w-full  mt-4 rounded"></div>
      <div className="absolute top-4 left-4">
        <button onClick={goBack} className="flex items-center justify-center text-white p-2">
          <ImCross className="text-2xl text-white" />
        </button>
      </div>
      <div className="text-5xl text-white itim mb-8">Sign Up with mobile</div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
        <input
          type='email'
          placeholder='Enter your E-mail id'
          name='phoneNumber'
          value={UserMessage.phoneNumber}
          autoComplete='off'
          onChange={changeHandler}
          className="bg-[rgba(80,116,128,1)] text-[20px] p-4 mb-4 w-full rounded"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Create your password'
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
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm your password'
            name='confirmPassword'
            value={UserMessage.confirmPassword}
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
        {passwordError && <div className="text-red-500 text-xs mb-4">{passwordError}</div>}
        <button
          type='submit'
          className="bg-[#63a73a] text-[25px] p-4 w-full rounded text-aliceblue itim font-roboto"
        >
          <h6 className="flex items-center justify-center">Sign Up <FiSend /></h6>
        </button>
      </form>
      <ToastContainer />
      <div className="flex items-center mt-8">
        <span className="text-xs text-white mr-2">Already have an account?</span>
        <button
          className="text-[11px] text-white underline"
          onClick={()=>{navigate("/signin")}}
        >
          Sign In
        </button>
      </div>
      {
        verification&&
      <div className="itim text-xl text-green-500">Verification e-mail send, please verify</div>
      }
    </div>
  );
};

