import React from 'react'
import location from "../assets/Location.svg"
import Email from "../assets/Email.svg"
import Smartphone from "../assets/Smartphone.svg"
import logo from "../assets/LOGO(XL).png"
import loca from "../assets/Group 24.svg"

export const Footer = () => {
    return (
        <div className='flex bg-black flex-col w-[1519px] h-[480px] justify-center items-center itim mt-8'>
            <div className='flex gap-[340px] mb-[64px]'>
                <div className='flex'>
                    <img src={location} height={67} w={67} />
                    <div>
                        <p>Find Us</p>
                        <p>Hindpiri, Ranchi</p>
                    </div>
                </div>
                <div className='flex'>
                    <img src={Smartphone} height={67} w={67} />
                    <div>
                        <p>Call Us</p>
                        <p>9031799862</p>
                    </div>
                </div>
                <div className='flex'>
                    <img src={Email} height={67} w={67} />
                    <div>
                        <p>Mail Us</p>
                        <p>coachifytree@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='h-[2px] w-[1261px] bg-white mb-[60px]'></div>
            <div className='flex gap-[340px] items-center justify-center'>
                <div className='flex gap-3'>
                    <div>
                        <img src={logo} height={78} width={93} />
                    </div>
                    <div>
                        <p className='text-[24px]'>Caochify Tree</p>
                        <p>nudging towards</p>
                        <p>excellance...</p>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-[36px]'>Links</p>
                    <a>HOME</a>
                    <a>ABOUT US</a>
                    <a>CONTACT US</a>
                </div>
                <div className='flex gap-3 justify-center items-center'>
                    <img height={59} width={63} src={loca}/>
                    <p>Location on map</p>
                </div>
            </div>

        </div>
    )
}
