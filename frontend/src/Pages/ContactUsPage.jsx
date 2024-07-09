import React, { useState } from 'react'
import Email from "../assets/Email.svg"
import Mail from "../assets/Mail.png"
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactUsPage = () => {
  const [UserMessage, setUserMessage] = useState({
    name: "",
    email: "",
    phonenumber: "",
    subject: "",
    message: ""
  });
  function changeHandler(event) {
    const { name, value} = event.target;
    setUserMessage((prev) => ({ ...prev, [name]: value }));
  }
  function SubmitHandler(event) {
    event.preventDefault();
    console.log("Printing the data submitted");
    console.log(UserMessage);
    setUserMessage({
      name: "",
      email: "",
      phonenumber: "",
      subject: "",
      message: ""
    });
    toast.success('Form submitted successfully!');
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
              className='bg-black border-white border-2 rounded-md h-[42px] w-[300px] p-2 itim m-2' />
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={UserMessage.email}
              autoComplete='off'
              onChange={changeHandler}
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
              className='bg-black border-white border-2 rounded-md h-[42px] w-[300px] p-2 itim m-2' />
            <input
              type='text'
              placeholder='Enter your subject'
              name='subject'
              value={UserMessage.subject}
              autoComplete='off'
              onChange={changeHandler}
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
