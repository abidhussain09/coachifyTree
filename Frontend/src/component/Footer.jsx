import React from 'react'
import location from "../assets/Location.svg"
import Email from "../assets/Email.svg"
import { Link } from 'react-router-dom'
import Smartphone from "../assets/Smartphone.svg"
import phone from "../assets/Phone.svg"
import logo from "../assets/LOGO(XL).png"
import loca from "../assets/Group 24.svg"

export const Footer = () => {
    return (
        <div className='flex mx-auto items-center flex-col w-full itim mt-8 sm:h-96 pt-2 border-neutral-800 border-solid border-t-4 gap-2' style={{backgroundImage:"url('https://res.cloudinary.com/dh26dmbg3/image/upload/v1743681540/joshua-michaels-WKF7Z1QoSww-unsplash_breucj.jpg')",
                                                                                                                                        backgroundSize: "cover",
                                                                                                                                        backgroundPosition: "top",}}>
            <div className='flex sm:flex-row flex-col basis-11/12 w-full sm:gap-0 gap-4'>
                <div className='flex flex-col basis-1/3 items-center justify-center'>
                    <img src={logo} alt="logo" className='h-20 sm:h-32'/>
                    <div className='flex'>
                        <img src={location} alt="" className='h-10 mt-2'/>
                        <p className='itim text-md sm:text-lg mt-4'>Hindpiri, Ranchi (834001)</p>
                    </div>
                </div>
                <div className='flex flex-col basis-1/3 items-center justify-center gap-2 sm:gap-4'>
                    <h1 className='itim text-2xl sm:text-3xl text-center'>LINKS</h1>
                    <Link  to="/" className='border-2 border-white itim  h-[28px] w-[135px] sm:h-[34px] rounded-[20px] text-md sm:text-lg text-center'>HOME</Link>
                    <Link to="/about" className='border-2 border-white itim  h-[28px] w-[135px] sm:h-[34px] rounded-[20px] text-md sm:text-lg text-center'>ABOUT</Link>
                    <Link to="/contact" className='border-2 border-white itim  h-[28px] w-[135px] sm:h-[34px] rounded-[20px] text-md sm:text-lg text-center'>CONTACT US</Link>
                    <Link to="/academic" className='border-2 border-white itim  h-[28px] w-[135px] sm:h-[34px] rounded-[20px] text-md sm:text-lg text-center'>ACADEMICS</Link>
                </div>
                <div className='flex flex-col basis-1/3 items-center justify-center gap-2 sm:gap-8'>
                    <h1 className='itim text-2xl sm:text-3xl text-left sm:w-[300px]'>SUPPORT</h1>
                    <div className='flex sm:w-[300px] items-center justify-start gap-2'>
                        <div className='h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] rounded-full border-2 border-white items-center justify-center flex'><img src={phone} alt="Call" className=' sm:h-12'/></div>
                        <div className='flex flex-col'>
                            <p className='itim text-md sm:text-lg'>Call us</p>
                            <p className='itim text-md sm:text-lg'>9031799862</p>
                        </div>
                    </div>
                    <div className='flex sm:w-[300px] items-center justify-start gap-2'>
                        <div className='h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] rounded-full border-2 border-white items-center justify-center flex'><img src={Email} alt="Mail" className='sm:h-12'/></div>
                        <div className='flex flex-col'>
                            <p className='itim text-md sm:text-lg'>Mail Us</p>
                            <p className='itim text-sm sm:text-lg'>coachifytree@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='itim text-xs sm:text-lg text-center basis-1/12 mb-2 text-wrap w-full sm:px-0 px-4'>
            Copyright © 2025: Designed and Maintained by <Link to='/team' className='text-2xl text-blue-300'>coachify coreteam</Link>
            </div>
        </div>
    )
}
