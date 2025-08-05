import React, { useState } from 'react'
import { HeroSection } from '../component/HeroSection'
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
  const scrollToDiv = () => {
    const targetDiv = document.getElementById('targetDiv');
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const navigate = useNavigate();
  const [studentMessage, setstudentMessage] = useState({
    name: "",
    email: "",
    phonenum: "",
    class: ""
  })
  const [contributorMessage, setcontributorMessage] = useState({
    name: "",
    email: "",
    phonenum: "",
  })
  function changeHandler(event) {
    const { name, value } = event.target;
    setstudentMessage((prev) => ({ ...prev, [name]: value }));
  }
  function changeHandler2(event) {
    const { name, value } = event.target;
    setcontributorMessage((prev) => ({ ...prev, [name]: value }));
  }
  async function SubmitHandlerStudent(event) {
    event.preventDefault();
    try {
      await emailjs.send(
        import.meta.env.VITE_EmailjsServiceId,
        import.meta.env.VITE_EmailjsTemplateId_booksessionForm,
        studentMessage,
        import.meta.env.VITE_EmailjsPublicKey
      );
      toast.success('Form submitted successfully!');
      toast.success('We will contact you!');
      setstudentMessage({
        name: "",
        email: "",
        phonenum: "",
        class: ""
      });
    }
    catch (err) {
      toast.error("Failed to send Email");
      toast.error("Please try again");
      console.log(err);
    }
  }
  function SubmitHandlerContributor(event) {
    event.preventDefault();
    setcontributorMessage({
      name: "",
      email: "",
      phonenum: "",
    })
  }

  return (
    <div className='mx-auto flex flex-col justify-center items-center overflow-hidden'>
      <HeroSection scrollToDiv={scrollToDiv} />

      {/* About Section */}
      <div id='targetDiv'
        className='sm:max-w-[1280px] sm:w-auto flex flex-col gap-4 justify-center items-center h-[760px] sm:m-[120px] m-8 w-[300px] border-[#545454] border-2 rounded-[20px]'
        style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719379882/homeabout_s98vph.png)` }}>
        <h2 className='itim sm:text-[70px] text-[32px] text-[#9ee174] text-center text-wrap'>"Nudging Towards Excellence"</h2>
        <p className='sm:text-[36px] text-[18px] text-center itim px-[124px] sm:w-auto w-[500px]'>We aim to guide students subtly and effectively, helping them make progress in a positive and encouraging manner.</p>
        <p className='sm:text-[36px] text-[18px] text-center itim px-[124px] sm:w-auto w-[500px]'>We believe in continuous effort , small actions taken to motivate students, providing them with regular feedback, encouragement, and support to keep them on the path to success.</p>
        <p className='sm:text-[36px] text-[18px] text-center itim px-[124px] sm:w-auto w-[500px]'>Our aim is not limited to academic achievements of students but also includes the development of critical thinking, creativity, resilience, and social responsibility</p>
      </div>

      {/* 🚀 Features Section */}
      <div className='sm:max-w-[1280px] w-full px-6 sm:px-16 my-12 flex flex-col gap-12'>
        <h2 className='itim sm:text-[55px] text-[28px] text-center text-[#63a76a]'>
          Key Features of CoachifyTree
        </h2>
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-8'>
          {/* Feature Card */}
          <div className='border-2 border-[#545454] rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg bg-black/40'>
            <div className='w-full h-[200px] rounded-md mb-4 flex items-center justify-center'>
              <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1719379882/homeabout_s98vph.png" alt="" />
            </div>
            <h3 className='text-[22px] text-[#9ee174] font-semibold mb-2'>Role-based Dashboards</h3>
            <p className='text-[16px] text-gray-200'>Personalized dashboards for Students, Teachers, Admins with distinct functionalities.</p>
          </div>


          <div className='border-2 border-[#545454] rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg bg-black/40'>
            <div className='w-full h-[200px] rounded-md  mb-4 flex items-center justify-center'>
            <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1754359314/Screenshot_2025-08-05_071424_y3pjbx.png" alt="" />
            </div>
            <h3 className='text-[22px] text-[#9ee174] font-semibold mb-2'>Secure Authentication</h3>
            <p className='text-[16px] text-gray-200'>Ensure data security with smooth user access control.</p>
          </div>

          <div className='border-2 border-[#545454] rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg bg-black/40'>
            <div className='w-full h-[200px] rounded-md mb-4 flex items-center justify-center'>
              <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1754359157/Screenshot_2025-08-05_071309_j2cybj.png" alt="" />
            </div>
            <h3 className='text-[22px] text-[#9ee174] font-semibold mb-2'>Live Data Visualization</h3>
            <p className='text-[16px] text-gray-200'>Real-time performance analytics and progress tracking.</p>
          </div>

          <div className='border-2 border-[#545454] rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg bg-black/40'>
            <div className='w-full h-[200px] rounded-md  mb-4 flex items-center justify-center'>
              <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1754359770/Screenshot_2025-08-05_073553_fmzudt.png" alt="" />
            </div>
            <h3 className='text-[22px] text-[#9ee174] font-semibold mb-2'>Teacher Tools</h3>
            <p className='text-[16px] text-gray-200'>Teachers can schedule tests, publish notices, and manage academic content effortlessly.</p>
          </div>

          <div className='border-2 border-[#545454] rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg bg-black/40'>
            <div className='w-full h-[200px] rounded-md 0 mb-4 flex items-center justify-center'>
              <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1754358732/Screenshot_2025-08-05_071320_jbwdh3.png" alt="" />
            </div>
            <h3 className='text-[22px] text-[#9ee174] font-semibold mb-2'>Admin Management</h3>
            <p className='text-[16px] text-gray-200'>Admins can manage students, teachers, and fellow admins with full control over the ecosystem.</p>
          </div>

          <div className='border-2 border-[#545454] rounded-[20px] p-6 flex flex-col items-center text-center shadow-lg bg-black/40'>
            <div className='w-full h-[200px] rounded-md  mb-4 flex items-center justify-center'>
              <img src="https://res.cloudinary.com/dh26dmbg3/image/upload/v1754359980/Screenshot_2025-08-05_074242_j5r0lv.png" alt="" />
            </div>
            <h3 className='text-[22px] text-[#9ee174] font-semibold mb-2'>CoachifyID Verification</h3>
            <p className='text-[16px] text-gray-200'>
              For actual coaching students, a unique <span className="text-[#9ee174] font-medium">CoachifyID</span> is verified
              to unlock personalized dashboards, exclusive study material, and progress tracking.
            </p>
          </div>

        </div>
      </div>

      {/* Existing Sections (unchanged) */}
      <div className='flex flex-wrap sm:gap-5 sm:flex-row flex-col gap-12 sm:my-[120px] my-[50px] mx-auto'>
        <div style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381445/connectwithus_oibnzn.png)` }} className='w-[628px] h-[614px] sm:flex hidden flex-col itim p-6'>
          <div className='flex text-[64px] gap-4 mt-[345px]'><p className='text-[#63a73a]'>CONNECT</p><p>WITH US</p></div>
          <p className='text-[20px]'>We aim to inspire a love for learning, foster critical thinking, and cultivate ethical and responsible individuals.</p>
        </div>
        <div style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1722138209/Rectangle_74_p5cehj.png)` }} className='w-[300px] h-[400px] sm:hidden flex items-center justify-center flex-col itim p-1'>
          <div className='flex text-[32px] gap-4 mt-[210px]'><p className='text-[#63a73a]'>CONNECT</p><p>WITH US</p></div>
          <p className='text-[16px] m-2'>We aim to inspire a love for learning, foster critical thinking, and cultivate ethical and responsible individuals.</p>
        </div>

        <div className='sm:w-[628px] sm:h-[614px] w-[300px] h-[450px] itim flex flex-col sm:gap-10 gap-7 items-center border-[#545454] border-2 rounded-[20px] justify-center' style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719383522/bookyoursession_ihzzml.png)` }}>
          <h2 className='sm:text-[40px] text-[28px]'>Book Your free Session</h2>
          <form className='flex flex-col sm:gap-9 gap-5 items-center justify-center' onSubmit={SubmitHandlerStudent}>
            <fieldset>
              <input
                type='text'
                placeholder='Enter student name'
                name='name'
                value={studentMessage.name}
                autoComplete='off'
                onChange={changeHandler}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] w-[280px] h-[35px] p-2 itim m-2' />
            </fieldset>
            <fieldset>
              <input
                type='text'
                placeholder='Enter your phone number'
                name='phonenum'
                value={studentMessage.phonenum}
                autoComplete='off'
                onChange={changeHandler}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] w-[280px] h-[35px] p-2 itim m-2' />
            </fieldset>
            <fieldset>
              <input
                type='text'
                placeholder='Enter your Email'
                name='email'
                value={studentMessage.email}
                autoComplete='off'
                onChange={changeHandler}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] w-[280px] h-[35px] p-2 itim m-2' />
            </fieldset>
            <fieldset>
              <input
                type='text'
                placeholder='Enter your studying class'
                name='class'
                value={studentMessage.class}
                autoComplete='off'
                onChange={changeHandler}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] w-[280px] h-[35px] p-2 itim m-2' />
            </fieldset>
            <button type='submit' className='bg-[#63a76a] sm:w-[558px] sm:h-[70px] h-[40px] w-[280px] rounded-[20px] sm:text-[32px] text-[24px] mb-5'>Continue to Schedule</button>
          </form>
        </div>
      </div>

      <div className='flex flex-wrap gap-5 sm:my-[120px] my-[50px] mx-auto'>
        <div className='sm:w-[628px] sm:h-[614px] w-[300px] h-[400px] itim border-[#545454] border-2 rounded-[20px] flex flex-col sm:gap-10 items-center justify-center' style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719383522/bookyoursession_ihzzml.png)` }}>
          <div>
            <h2 className='flex gap-2 sm:text-[55px] text-[30px] sm:mx-0 mx-3'><p className='text-[#ff671f]'>Join,</p><p className='text-[#ffffff]'>Bestow,</p><p className='text-[#63a76a]'>Impact</p></h2>
            <h4 className='sm:text-[20px] max-w-[480px] mt-0 text-center text-[16px]'>Contribute to greatness, share your expertise, enrich our commonwealth.</h4>
          </div>
          <form className='flex flex-col sm:gap-9 gap-4 sm:mt-0 mt-3 items-center justify-center' onSubmit={SubmitHandlerContributor}>
            <fieldset>
              <input
                type='text'
                placeholder='Enter your name'
                name='name'
                value={contributorMessage.name}
                autoComplete='off'
                onChange={changeHandler2}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] h-[35px] w-[280px] p-2 itim m-2' />
            </fieldset>
            <fieldset>
              <input
                type='text'
                placeholder='Enter your phone number'
                name='phonenum'
                value={contributorMessage.phonenum}
                autoComplete='off'
                onChange={changeHandler2}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] h-[35px] w-[280px] p-2 itim m-2' />
            </fieldset>
            <fieldset>
              <input
                type='email'
                placeholder='Enter your Email'
                name='email'
                value={contributorMessage.email}
                autoComplete='off'
                onChange={changeHandler2}
                required
                className='bg-black border-white border-2 rounded-md sm:h-[44px] sm:w-[558px] h-[35px] w-[280px] p-2 itim m-2' />
            </fieldset>

            <button type='submit' className='bg-[#63a76a] sm:w-[558px] sm:h-[70px] w-[280px] h-[35px] rounded-[20px] sm:text-[32px] text-[25px] sm:mb-10 '
              onClick={() => window.open("https://forms.gle/w2wgqYWJ5Bk6w7Q36", "_blank")}>make a start</button>
          </form>
        </div>
        <div style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381444/dosomething_mzpelu.png)` }} className='w-[628px] h-[614px] sm:flex hidden'></div>
      </div>

      <div className='flex flex-wrap gap-5 sm:my-[120px] my-[50px] mx-auto'>
        <div className='mx-auto sm:w-[628px] sm:h-[334px] h-[100px] w-[300px] itim sm:text-[55px] text-[24px] rounded-[20px] border-2 border-[#545454] flex items-center justify-center cursor-pointer' style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381444/academicpencil_bgiutj.png)`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} onClick={() => { navigate("/academic") }}>Explore our Academic</div>
        <div className='mx-auto sm:w-[628px] sm:h-[334px] h-[100px] w-[300px] itim sm:text-[55px] text-[24px] rounded-[20px] border-2 border-[#545454] flex items-center justify-center cursor-pointer' style={{ background: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719381445/art_l5sxmq.png)` }} onClick={() => { navigate("/comingSoon") }}>Explore our Art Gallery</div>
      </div>

      <ToastContainer />
    </div>
  )
}
