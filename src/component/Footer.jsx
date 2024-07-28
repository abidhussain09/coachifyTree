import React from 'react'
import location from "../assets/Location.svg"
import Email from "../assets/Email.svg"
import { Link } from 'react-router-dom'
import Smartphone from "../assets/Smartphone.svg"
import logo from "../assets/LOGO(XL).png"
import loca from "../assets/Group 24.svg"

export const Footer = () => {
    return (
        <div className='flex bg-black mx-auto flex-col sm:w-[1519px] sm:h-[480px] h-[450px] w-[380px] justify-center items-center itim mt-8 '>
            <div className='flex flex-wrap gap-8 sm:gap-[340px] mb-[64px] flex-col sm:flex-row'>
                <div className='sm:flex hidden'>
                    <img src={location} height={67} w={67} />
                    <div>
                        <p>Find Us</p>
                        <p>Hindpiri, Ranchi</p>
                    </div>
                </div>
                <div className='sm:flex hidden'>
                    <img src={Smartphone} height={67} w={67} />
                    <div>
                        <p>Call Us</p>
                        <p>9031799862</p>
                    </div>
                </div>
                <div className='sm:flex hidden flex-wrap gap-2 items-center sm:flex-row flex-col'>
                    <img src={Email} height={67} w={67} />
                    <div>
                        <p className='hidden sm:flex'>Mail Us</p>
                        <p>coachifytree@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='h-[2px] w-[1261px] sm:bg-white sm:mb-[60px]'></div>
            <div className='flex  flex-col sm:flex-row gap-8 sm:gap-[340px] items-center justify-center'>
                <div className='flex gap-3 items-center justify-center'>
                    <div>
                        <img src={logo} height={78} width={93} />
                    </div>
                    <div>
                        <p className='text-[24px] sm:flex hidden'>Caochify Tree</p>
                        <p>nudging towards</p>
                        <p>excellance...</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-[36px] '>Quick Links</p>
                    <Link to="/" className='text-[#999999]'>HOME</Link>
                    <Link to="/about" className='text-[#999999]'>ABOUT US</Link>
                    <Link to="/academic" className='text-[#999999]'>ACADEMIC</Link>
                    <Link to="/contact" className='text-[#999999]'>CONTACT US</Link>
                </div>
                <div className='sm:flex hidden gap-3 justify-center items-center'>
                    <img height={59} width={63} src={loca}/>
                    <p>Location on map</p>
                </div>
                <div className='sm:hidden flex flex-col'>
                    <p className='text-[36px] '>Get in Touch</p>
                    <div className='flex mb-5 items-center'>
                        <img src={Email} height={43} width={33} alt="email--" />
                        <p>coachifytree@gmail.com</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
