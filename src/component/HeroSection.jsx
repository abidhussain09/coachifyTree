import React from 'react'
import tagLine from '../assets/tagline.svg'
import Logo from '../assets/LOGO(XL).png'
export const HeroSection = () => {
    return (
        <div className='mx-auto flex gap-5 mt-[120px]'>
            <div className='flex flex-col gap-[89px] itim justify-center h-[496px] w-[628px]'>
                <img height={253} width={630} src={tagLine} />
                <button className='hover:scale-105 flex w-[308px] h-[71px] rounded-[27px] text-[40px] items-center justify-center bg-[#63a73a]'>
                    Get Started!
                </button>
            </div>
            <div className='flex items-center justify-center h-[496px] w-[628px]' >
                <img height={496} width={628} src={Logo} />
            </div>
        </div>
    )
}
