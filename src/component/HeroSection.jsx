import React from 'react'
import tagLine from '../assets/tagline.svg'
import Logo from '../assets/LOGO(XL).png'
export const HeroSection = ({scrollToDiv}) => {
    return (
        <div className='mx-auto flex flex-wrap gap-5 my-[120px]'>
            <div className='flex flex-col gap-[89px] itim justify-center sm:h-[496px] sm:w-[628px] w-[284px] h-[164px]'>
                <img height={253} width={630} src={tagLine} />
                <button className='hover:scale-110 flex sm:w-[308px] sm:h-[71px] w-[163px] h-[43px] rounded-[27px] sm:text-[40px] text-2xl items-center justify-center bg-[#63a73a] p-3' onClick={scrollToDiv}>
                    Get Started!
                </button>
            </div>
            <div className='hidden md:flex items-center justify-center h-[496px] w-[628px]' >
                <img height={496} width={628} src={Logo} />
            </div>
        </div>
    )
}
