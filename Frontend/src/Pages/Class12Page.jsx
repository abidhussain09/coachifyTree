import React from 'react';

export const Class12 = () => {
  
  const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719233995/maths11_dj3zm9.png";
  const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234904/Rectangle_69_vqicir.png";
  const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234975/Rectangle_71_ckxsoa.png";
  const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234801/Rectangle_50_nidzhb.png";

  return (
    <div className='flex flex-col mx-auto mt-5 items-center justify-center sm:max-w-screen-md sm:px-0 px-4'>
      
      <div className='flex items-center mb-5'>
        <h1 className='sm:text-5xl text-3xl font-bold text-center'>Class 12</h1> 
      </div>
      
      <div className='flex flex-wrap justify-center sm:justify-between'>
        <div className='flex flex-col items-center p-10 sm:w-1/2 w-full'>
          <div className='flex flex-col items-center mb-8 cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/13wp8UX9wrkPs3-FgmUPGv6ANaSSu3gap?usp=sharing", '_blank') }}>
            <img src={Rectangle65} alt="maths" className='w-full mb-16 h-auto sm:max-w-none max-w-xs' />
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1abOl4ymu54b-s4M28tVHv_jaeztvgEfr?usp=sharing", '_blank') }}>
            <img src={Rectangle69} alt="chemistry" className='w-full h-auto sm:max-w-none max-w-xs' />
          </div>
        </div>
        <div className='flex flex-col items-center p-10 sm:w-1/2 w-full'>
          <div className='flex flex-col items-center mb-8 cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1R2eib53YTVL5-yQfBRewWarM4GgV474w?usp=sharing", '_blank') }}>
            <img src={Rectangle50} alt="physics" className='w-full h-auto mb-16 sm:max-w-none max-w-xs' />
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1-5E9ZE8uJpXuSCBXtAU1k4zDiNASoKHO?usp=sharing", '_blank') }}>
            <img src={Rectangle71} alt="biology" className='w-full h-auto sm:max-w-none max-w-xs' />
          </div>
        </div>
      </div>
    </div>
  );
};
