import React, { useState } from 'react'
import { HeroSection } from '../component/HeroSection'
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {
  const scrollToDiv = () => {
    const targetDiv = document.getElementById('targetDiv');
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };
    const navigate = useNavigate(); 
    const [studentMessage,setstudentMessage]=useState({
      name:"",
      email:"",
      phonenum:"",
      class:""
    })
    const [contributorMessage,setcontributorMessage]=useState({
      name:"",
      email:"",
      phonenum:"",
    })
    function changeHandler(event) {
      const { name, value} = event.target;
      setstudentMessage((prev) => ({ ...prev, [name]: value }));
    }
    function changeHandler2(event) {
      const { name, value} = event.target;
      setcontributorMessage((prev) => ({ ...prev, [name]: value }));
    }
    function SubmitHandlerStudent(event) {
      event.preventDefault();
      console.log("Printing the data submitted");
      console.log(studentMessage);
      // toast.success('Form submitted successfully!');
    }
    function SubmitHandlerContributor(event) {
      event.preventDefault();
      console.log("Printing the data submitted");
      console.log(contributorMessage);
      // toast.success('Form submitted successfully!');
    }
  return (
    <div className='mx-auto flex flex-col'>
      <HeroSection scrollToDiv={scrollToDiv}/>
      <div id='targetDiv'className='max-w-[1280px] flex flex-col gap-4 justify-center items-center h-[760px] m-[120px]'  style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719379882/homeabout_s98vph.png)` }}>
        <h2  className='itim text-[70px] text-[#63a73a] text-center'>"Nudging Towards Excellence"</h2>
        <p className='text-[36px] text-center itim px-[124px]'>We aim to guide students subtly and effectively, helping them make progress in a positive and encouraging manner.</p>
        <p className='text-[36px] text-center itim px-[124px]'>We believe in continuous effort , small actions taken to motivate students, providing them with regular feedback, encouragement, and support to keep them on the path to success.</p>
        <p className='text-[36px] text-center itim px-[124px]'>Our aim is not limited to academic achievements of students but also includes the development of critical thinking, creativity, resilience, and social responsibility</p>
      </div>
      <div className='flex flex-wrap gap-5 my-[120px] mx-auto'>
        <div style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381445/connectwithus_oibnzn.png)` }} className='w-[628px] h-[614px] flex flex-col itim p-6'>
          <div className='flex text-[64px] gap-4 mt-[345px]'><p className='text-[#63a73a]'>CONNECT</p><p>WITH US</p></div>
          <p className='text-[20px]'>We aim to inspire a love for learning, foster critical thinking, and cultivate ethical and responsible individuals.</p>
        </div>

        <div className='w-[628px] h-[614px] itim flex flex-col gap-10 items-center justify-center' style={{background:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719383522/bookyoursession_ihzzml.png)`}}>
          <h2 className='text-[40px]'>Book Your free Session</h2>
          <form className='flex flex-col gap-9 items-center justify-center' onSubmit={SubmitHandlerStudent}>
            <fieldset>
              <input 
              type='text'
              placeholder='Enter student name'
              name='name'
              value={studentMessage.name}
              autoComplete='off'
              onChange={changeHandler}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            <fieldset>
              <input 
              type='text'
              placeholder='Enter your phone number'
              name='phonenum'
              value={studentMessage.phonenum}
              autoComplete='off'
              onChange={changeHandler}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            <fieldset>
              <input 
              type='text'
              placeholder='Enter your Email'
              name='email'
              value={studentMessage.email}
              autoComplete='off'
              onChange={changeHandler}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            <fieldset>
              <input 
              type='text'
              placeholder='Enter your studying class'
              name='class'
              value={studentMessage.class}
              autoComplete='off'
              onChange={changeHandler}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            <button type='submit' className='bg-[#63a76a] w-[558px] h-[70px] rounded-[20px] text-[32px] mb-10'>Continue to Schedule</button>
          </form>
        </div>
      </div>
      <div className='flex flex-wrap gap-5 my-[120px] mx-auto'>
        <div className='w-[628px] h-[614px] itim flex flex-col gap-10 items-center justify-center' style={{background:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719383522/bookyoursession_ihzzml.png)`}}>
        <div>
        <h2 className='flex gap-2 text-[55px]'><p className='text-[#ff671f]'>Join,</p><p className='text-[#ffffff]'>Bestow,</p><p className='text-[#63a76a]'>Impact</p></h2>
        <h4 className='text-[20px] max-w-[480px] mt-0 text-center'>Contribute to greatness, share your expertise, enrich our commonwealth.</h4>
        </div>
          <form className='flex flex-col gap-9 items-center justify-center' onSubmit={SubmitHandlerContributor}>
            <fieldset>
              <input 
              type='text'
              placeholder='Enter your name'
              name='name'
              value={contributorMessage.name}
              autoComplete='off'
              onChange={changeHandler2}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            <fieldset>
              <input 
              type='text'
              placeholder='Enter your phone number'
              name='phonenum'
              value={contributorMessage.phonenum}
              autoComplete='off'
              onChange={changeHandler2}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            <fieldset>
              <input 
              type='email'
              placeholder='Enter your Email'
              name='email'
              value={contributorMessage.email}
              autoComplete='off'
              onChange={changeHandler2}
              className='bg-black border-white border-2 rounded-md h-[44px] w-[558px] p-2 itim m-2'/>
            </fieldset>
            
            <button type='submit' className='bg-[#63a76a] w-[558px] h-[70px] rounded-[20px] text-[32px] mb-10'>make a start</button>
          </form></div>
        <div  style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381444/dosomething_mzpelu.png)` }} className='w-[628px] h-[614px]'></div>
      </div>
      <div className='flex flex-wrap gap-5 my-[120px] mx-auto'>
        <div className='w-[628px] h-[334px] itim text-[55px] rounded-[20px] border-2 border-[#545454] flex items-center justify-center cursor-pointer' style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381444/academicpencil_bgiutj.png)` }} onClick={()=>{navigate("/academic")}}>Explore our Academic</div>
        <div className='w-[628px] h-[334px] itim text-[55px] rounded-[20px] border-2 border-[#545454] flex items-center justify-center' style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381445/art_l5sxmq.png)` }}>Explore our Art Gallery</div>
      </div>
    </div>
  )
}
