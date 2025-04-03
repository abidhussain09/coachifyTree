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
        <div className='flex mx-auto flex-col w-full itim mt-8 h-96 pt-2 border-neutral-800 border-solid border-t-4' style={{backgroundImage:"url('https://res.cloudinary.com/dh26dmbg3/image/upload/v1743681540/joshua-michaels-WKF7Z1QoSww-unsplash_breucj.jpg')",
                                                                                                                                        backgroundSize: "cover",
                                                                                                                                        backgroundPosition: "top",}}>
            <div className='flex basis-11/12 w-full'>
                <div className='flex flex-col basis-1/3 items-center justify-center'>
                    <img src={logo} alt="logo" height={130} width={160}/>
                    <div className='flex gap-2'>
                        <img src={location} alt="" height={50} width={50}/>
                        <p className='itim text-lg mt-4'>Hindpiri, Ranchi (834001)</p>
                    </div>
                </div>
                <div className='flex flex-col basis-1/3 items-center justify-center gap-4'>
                    <h1 className='itim text-3xl text-center'>LINKS</h1>
                    <Link  to="/" className='border-2 border-white itim w-[135px] h-[34px] rounded-[20px]  text-lg text-center'>HOME</Link>
                    <Link to="/about" className='border-2 border-white itim w-[135px] h-[34px] rounded-[20px]  text-lg text-center'>ABOUT</Link>
                    <Link to="/contact" className='border-2 border-white itim w-[135px] h-[34px] rounded-[20px]  text-lg text-center'>CONTACT US</Link>
                    <Link to="/academic" className='border-2 border-white itim w-[135px] h-[34px] rounded-[20px]  text-lg text-center'>ACADEMICS</Link>
                </div>
                <div className='flex flex-col basis-1/3 items-center justify-center gap-8'>
                    <h1 className='itim text-3xl text-left w-[300px]'>SUPPORT</h1>
                    <div className='flex w-[300px] items-center justify-start gap-2'>
                        <div className='h-[60px] w-[60px] rounded-full border-2 border-white items-center justify-center flex'><img src={phone} alt="" height={50} width={50}/></div>
                        <div className='flex flex-col'>
                            <p className='itim text-lg'>Call us</p>
                            <p className='itim text-lg'>9031799862</p>
                        </div>
                    </div>
                    <div className='flex w-[300px] items-center justify-start gap-2'>
                        <div className='h-[60px] w-[60px] rounded-full border-2 border-white items-center justify-center flex'><img src={Email} alt="" height={50} width={50}/></div>
                        <div className='flex flex-col'>
                            <p className='itim text-lg'>Mail Us</p>
                            <p className='itim text-lg'>coachifytree@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='itim text-lg text-center basis-1/12 mb-2 text-wrap'>
            Copyright © 2025: Designed and Maintained by coachify coreteam
            </div>
        </div>
    )
}
