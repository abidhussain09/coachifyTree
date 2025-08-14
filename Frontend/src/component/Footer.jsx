import React from 'react'
import location from "../assets/Location.svg"
import Email from "../assets/Email.svg"
import { Link } from 'react-router-dom'
import Smartphone from "../assets/Smartphone.svg"
import phone from "../assets/Phone.svg"
import logo from "../assets/LOGO(XL).png"

export const Footer = () => {
    return (
        <div
            className="flex flex-col items-center w-full itim mt-8 sm:h-auto pt-6 border-neutral-800 border-t-4 gap-6"
            style={{
                backgroundImage: "url('https://res.cloudinary.com/dh26dmbg3/image/upload/v1743681540/joshua-michaels-WKF7Z1QoSww-unsplash_breucj.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}
        >
            {/* Main Content */}
            <div className="flex flex-col sm:flex-row w-full max-w-6xl gap-8 px-6 sm:px-0">
                
                {/* Logo & Location */}
                <div className="flex flex-col items-center text-center sm:text-left sm:items-start flex-1 gap-3">
                    <img src={logo} alt="logo" className="h-20 sm:h-28" />
                    <div className="flex items-center gap-2">
                        <img src={location} alt="location" className="h-8" />
                        <p className="text-white text-sm sm:text-lg">Hindpiri, Ranchi (834001)</p>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center sm:items-center flex-1 gap-3">
                    <h1 className="text-2xl sm:text-3xl text-white">LINKS</h1>
                    {[
                        { label: "HOME", to: "/" },
                        { label: "ABOUT", to: "/about" },
                        { label: "CONTACT US", to: "/contact" },
                        { label: "ACADEMICS", to: "/academic" }
                    ].map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            className="border-2 border-white text-white w-[135px] h-[34px] flex items-center justify-center rounded-full hover:bg-white hover:text-black transition duration-300 text-sm sm:text-lg"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Support */}
                <div className="flex flex-col items-center sm:items-start flex-1 gap-4">
                    <h1 className="text-2xl sm:text-3xl text-white">SUPPORT</h1>
                    
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white flex items-center justify-center">
                            <img src={phone} alt="Call" className="h-6 sm:h-8" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-lg text-white">Call us</p>
                            <p className="text-sm sm:text-lg text-white">9031799862</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white flex items-center justify-center">
                            <img src={Email} alt="Mail" className="h-6 sm:h-8" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-lg text-white">Mail Us</p>
                            <p className="text-xs sm:text-lg text-white break-all">coachifytree@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="text-center text-white text-xs sm:text-sm px-4 py-3 w-full bg-black/40">
                Copyright © 2025: Designed and Maintained by{" "}
                <Link to='/team' className="text-blue-300 font-bold hover:underline">
                    coachify coreteam
                </Link>
            </div>
        </div>
    )
}
