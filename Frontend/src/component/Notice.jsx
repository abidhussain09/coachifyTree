import React from 'react'

export const Notice = () => {
  const notices=[
    {
      title:"NOTICE 1",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 2",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 3",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 4",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 5",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 6",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 7",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 8",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 9",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 10",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 11",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
    {
      title:"NOTICE 12",
      desc:"this is first notice you are getting form us, plz don't ignore it"
    },
  ]
  return (
    <div className='flex items-center justify-center h-full flex-wrap gap-4 p-2 overflow-y-auto'>
      {
        notices.map((notice)=>{
          return <div className='flex gap-4 px-2 py-4 w-[280px] h-[350px] flex-col items-center  rounded-[20px] bg-neutral-800'>
            <h3 className='text-2xl'>{notice.title}</h3>
            <p className='text-lg text-wrap'>{notice.desc}</p>
          </div>
        })
      }
    </div>
  )
}
