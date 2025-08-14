import { useState, useRef, useEffect } from 'react';
import Logo from "../assets/LOGO(XL).png";
import signup from "../assets/signup.png";
import dashboardImg from "../assets/Dashboard.png";
import login from "../assets/Login.png";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { X, Menu } from 'lucide-react';

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
        <nav className='bg-black w-screen md:w-[1280px] sm:w-full h-20'>
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
                        className="p-2 rounded text-white focus:outline-none z-50"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Sidebar for mobile */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full bg-black w-3/4 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out md:hidden shadow-lg`}
            >
                <div className="flex items-center justify-end px-4 py-3 border-b border-black">
                    <button onClick={() => setIsOpen(false)} className="text-white text-4xl focus:outline-none">
                        &times;
                    </button>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <NavItem to="/">HOME</NavItem>
                    <NavItem to="/about">ABOUT US</NavItem>
                    <NavItem to="/academic">ACADEMIC</NavItem>
                    <NavItem to="/contact">CONTACT US</NavItem>
                </div>
                <div className="pt-5 pb-4 border-t border-black px-4">
                    <div className="flex flex-col gap-10 items-center">
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


        </nav>
    );
};
