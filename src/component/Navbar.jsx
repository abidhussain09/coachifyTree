import React from 'react'
import Logo from "../assets/LOGO(XL).png"
import signup from "../assets/signup.png"
import login from "../assets/Login.png"
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='bg-black  w-[1280px] h-20 flex justify-between'>
            <div className='flex gap-16 '>
                <div className='my-[18px] ml-[51px]'>
                    <img src={Logo} height={76} width={60} />
                </div>
                <div className=' flex flex-col my-[18px] items-center content-center p-[7px] rounded-[12px] itim'><NavLink to="/">HOME</NavLink><div className='w-[53px] h-[4px] bg-white'></div>
                </div>
                <div className='my-[18px] items-center content-center p-[7px] rounded-[12px] itim'><NavLink to="/about">ABOUT US</NavLink></div>
                <div className='my-[18px] items-center content-center p-[7px] rounded-[12px] itim'><NavLink to="/academic">ACADEMIC</NavLink></div>
                <div className='my-[18px] items-center content-center p-[7px] rounded-[12px] itim'><NavLink to="/contact">CONTACT US</NavLink></div>
            </div>
            <div className='flex my-[18px] gap-[39px] mr-[38px]'>
                <div >
                    <NavLink className='flex gap-1 items-center justify-center bg-[#63a73a] w-[103px] h-[43px] rounded-[12px] itim' to="/signup">
                        <img src={signup} />
                        sign up
                    </NavLink>
                </div>
                <div >
                    <NavLink className='flex gap-1 items-center justify-center bg-[#63a73a] w-[103px] h-[43px] rounded-[12px] itim' to='/signin'>
                    <img src={login} />
                    sign in
                    </NavLink>
                </div>
            </div>
        </div>

    )
}
