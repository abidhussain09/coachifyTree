import React, { useState, useRef, useEffect } from 'react';
import Logo from "../assets/LOGO(XL).png";
import signup from "../assets/signup.png";
import dashboardImg from "../assets/Dashboard.png"
import login from "../assets/Login.png";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const booleanValue = useSelector((state) => state.booleanValue);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const NavItem = ({ to, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col my-[18px] items-center content-center p-[7px] rounded-[12px] itim ${isActive ? 'active' : ''}`
            }
            onClick={() => setIsOpen(false)}
        >
            {children}
        </NavLink>
    );

    return (
        <nav className='bg-black w-screen md:w-[1280px] sm:w-full h-20 '>
            <div className='flex justify-between'>
                <div className='flex gap-16'>
                    <div className='my-[18px] ml-[51px]'>
                        <img src={Logo} height={76} width={60} alt="Logo" />
                    </div>
                    <div className='hidden md:flex gap-16'>
                        <NavItem to="/">HOME</NavItem>
                        <NavItem to="/about">ABOUT US</NavItem>
                        <NavItem to="/academic">ACADEMIC</NavItem>
                        <NavItem to="/contact">CONTACT US</NavItem>
                    </div>
                </div>
                <div className='hidden md:flex my-[18px] gap-[39px] mr-[38px]'>
                    {!booleanValue ? (
                        <NavLink
                            className={({ isActive }) =>
                                `flex gap-1 items-center justify-center bg-[#63a73a] w-[103px] h-[43px] rounded-[12px] itim ${isActive ? 'active' : ''}`
                            }
                            to="/signup"
                        >
                            <img src={signup} alt="Sign up" />
                            sign up
                        </NavLink>
                    ) : (
                        <NavLink
                            className={({ isActive }) =>
                                `flex gap-1 items-center justify-center bg-[#63a73a] w-[140px] h-[43px] rounded-[12px] itim ${isActive ? 'active' : ''}`
                            }
                            to="/dashboard"
                        >
                            <img src={dashboardImg} height={20} width={20} alt="DashBoard" />
                            Dashboard
                        </NavLink>
                    )}
                    <NavLink
                        className={({ isActive }) =>
                            `flex gap-1 items-center justify-center bg-[#63a73a] w-[103px] h-[43px] rounded-[12px] itim ${isActive ? 'active' : ''}`
                        }
                        to={!booleanValue ? '/signin' : '/signout'}
                    >
                        <img src={login} alt="Sign in/out" />
                        {!booleanValue ? 'sign in' : 'sign out'}
                    </NavLink>
                </div>
                <div className='md:hidden flex items-center mr-4'>
                    <button
                        onClick={toggleSidebar}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            // <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            // </svg>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Sidebar for mobile */}
            {isOpen && (
                <div ref={sidebarRef} className="md:hidden bg-black p-4 ">
                    <div className="px-2 pt-3 pb-3 space-y-1 sm:px-3">
                        <NavItem to="/">HOME</NavItem>
                        <NavItem to="/about">ABOUT US</NavItem>
                        <NavItem to="/academic">ACADEMIC</NavItem>
                        <NavItem to="/contact">CONTACT US</NavItem>
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-700">
                        <div className="flex justify-center items-center px-5 flex-wrap gap-2">
                            {!booleanValue ? (
                                <NavLink
                                    to="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="flex gap-1 items-center justify-center bg-[#63a73a] w-[103px] h-[43px] rounded-[12px] itim"
                                >
                                    <img src={signup} alt="Sign up" />
                                    sign up
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex gap-1 items-center justify-center bg-[#63a73a] w-[140px] h-[43px] rounded-[12px] itim"
                                >
                                    <img src={dashboardImg} height={20} width={20} alt="DashBoard" />
                                    Dashboard
                                </NavLink>
                            )}
                            <NavLink
                                to={!booleanValue ? '/signin' : '/signout'}
                                onClick={() => setIsOpen(false)}
                                className="flex gap-1 items-center justify-center bg-[#63a73a] w-[103px] h-[43px] rounded-[12px] itim"
                            >
                                <img src={login} alt="Sign in/out" />
                                {!booleanValue ? 'sign in' : 'sign out'}
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
};
