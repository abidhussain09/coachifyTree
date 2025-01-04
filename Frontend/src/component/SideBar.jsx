import React from 'react'

export const SideBar = ({ options, onSelect, selected }) => {
    return (
        <div className='flex flex-col gap-4 text-xl items-center my-5'>
            {
                options.map((option) => (
                    <button key={option} onClick={()=>onSelect(option)}
                        className={`py-4  mb-2 text-center w-full  itim ${selected === option ? "bg-[#63a73a] border-[1px] border-[#ffffff84]" : "hover:bg-gray-600 bg-[#080909]"
                            }`}
                    >{option}</button>
                ))
            }
        </div>
    )
}
