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
    <div className='mx-auto flex flex-wrap gap-4 my-[140px]'>
      <div className=' flex flex-col gap-[45px] w-[740px] h-[582px] rounded-[28px] border-2 border-white bg-cont1 p-[36px]'>
        <div className='flex justify-between '>
          <p className='text-[36px]'>Send us a message</p>
          <img src={Email} height={50} width={60} />
        </div>
        <form onSubmit={SubmitHandler}>
          <fieldset>
            <input
              type='text'
              placeholder='Enter your name'
              name='name'
              value={UserMessage.name}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md h-[42px] w-[300px] p-2 itim m-2' />
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={UserMessage.email}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md h-[42px] w-[300px] p-2 itim m-2' />
          </fieldset>
          <br />
          <fieldset>
            <input
              type='text'
              placeholder='Enter your phone number'
              name='phonenumber'
              value={UserMessage.phonenumber}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md h-[42px] w-[300px] p-2 itim m-2' />
            <input
              type='text'
              placeholder='Enter your subject'
              name='subject'
              value={UserMessage.subject}
              autoComplete='off'
              onChange={changeHandler}
              required
              className='bg-black border-white border-2 rounded-md h-[42px] w-[300px] p-2 itim m-2' />
          </fieldset>
          <br />
          <input
            type='text'
            placeholder='Enter your message'
            name='message'
            value={UserMessage.message}
            autoComplete='off'
            onChange={changeHandler}
            required
            className='bg-black border-white border-2 rounded-md h-[42px] w-[616px] p-2 itim m-2' />
          <br />
          <br />
          <button type='submit' className='bg-black border-white flex justify-center items-center gap-2 border-2 rounded-md p-2 itim m-2 h-[70px] w-[150px] text-[20px]'>
            <p>Submit</p>
            <FiSend />
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className='w-[438px] h-[582px] rounded-[28px] border-2 border-white bg-cont2 p-[36px]'>
        <p className='itim text-[36px]'>Contact Information</p>
        <div className='items-center justify-center flex flex-col h-[500px] gap-4'>
          <img width={90} height={50} src={Mail} />
          <p className='text-[26px] itim'>coachifytree@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
