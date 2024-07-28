import React, { useState } from 'react'
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';


const Email = 'https://res.cloudinary.com/dh26dmbg3/image/upload/v1721299919/Email_tnkvfn.svg';
const Mail = 'https://res.cloudinary.com/dh26dmbg3/image/upload/v1721299920/Mail_bnkufn.png';
export const ContactUsPage = () => {

  const booleanValue = useSelector((state) => state.booleanValue);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [UserMessage, setUserMessage] = useState({
    name: "",
    email: "",
    phonenumber: "",
    subject: "",
    message: ""
  });
  function changeHandler(event) {
    const { name, value } = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  }
  async function SubmitHandler(event) {
    event.preventDefault();
    if (booleanValue) {
      navigate('/signin');
    }
    else {
      console.log("Printing the data submitted");
      console.log(UserMessage);
      try{
        const result=await emailjs.send(
          import.meta.env.VITE_EmailjsServiceId,
          import.meta.env.VITE_EmailjsTemplateId_contactForm,
          UserMessage,
          import.meta.env.VITE_EmailjsPublicKey
        );
        console.log('Email sent successfully:', result.text);
        toast.success('Form submitted successfully!');
        setUserMessage({
          name: "",
          email: "",
          phonenumber: "",
          subject: "",
          message: ""
        });
      }
      catch(err){
        toast.error("Failed to send Email");
        toast.error("Please try again");
        console.log(err);
      }
    }
  }
  return (
    <div className='mx-auto flex flex-wrap sm:gap-4 gap-10 my-[140px] items-center justify-center'>
      <div className=' flex flex-col gap-[45px] sm:w-[740px] sm:h-[582px] w-[300px] rounded-[28px] border-2 border-white bg-cont1 p-[36px]'>
        <div className='flex justify-between '>
          <p className='sm:text-[36px] text-4xl'>Send us a message</p>
          <img src={Email} height={50} width={60} className='hidden sm:flex'/>
        </div>
        <form onSubmit={SubmitHandler} className='flex items-center sm:items-start justify-center flex-col'>
          <fieldset className='flex items-center justify-center sm:flex-row flex-col'>
            <input
              type='text'
              placeholder='Enter your name'
              name='name'
              value={UserMessage.name}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md sm:h-[42px] sm:w-[300px] h-[35px] w-[280px] p-2 itim m-2' />
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={UserMessage.email}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md sm:h-[42px] sm:w-[300px] h-[35px] w-[280px] p-2 itim m-2' />
          </fieldset>
          <br className='sm:flex hidden'/>
          <fieldset>
            <input
              type='text'
              placeholder='Enter your phone number'
              name='phonenumber'
              value={UserMessage.phonenumber}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md sm:h-[42px] sm:w-[300px] h-[35px] w-[280px] p-2 itim m-2' />
            <input
              type='text'
              placeholder='Enter your subject'
              name='subject'
              value={UserMessage.subject}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md sm:h-[42px] sm:w-[300px] h-[35px] w-[280px] p-2 itim m-2' />
          </fieldset>
          <br className='sm:flex hidden' />
          <input
            type='text'
            placeholder='Enter your message'
            name='message'
            value={UserMessage.message}
            autoComplete='off'
            onChange={changeHandler}
            required
            className='bg-black border-white border-2 rounded-md sm:h-[42px] sm:w-[616px] h-[35px] w-[280px] p-2 itim m-2' />
          <br className='sm:flex hidden' />
          <br  className='sm:flex hidden'/>
          <button type='submit' className='bg-[#63a73a] border-white flex justify-center items-center gap-2 border-2 rounded-md p-2 itim m-2 h-[70px] w-[150px] text-[20px]'>
            <p>Submit</p>
            <FiSend />
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className='sm:w-[438px] sm:h-[582px] w-[300px] h-[500px] rounded-[28px] border-2 border-white bg-cont2 p-[36px]'>
        <p className='itim sm:text-[36px] text-4xl'>Contact Information</p>
        <div className='items-center justify-center flex flex-col h-[500px] gap-4'>
          <img width={90} height={50} src={Mail} />
          <p className='text-[26px] itim'>coachifytree@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
