import React from 'react';

export const Class11 = () => {
  // Define the image sources as constants
  const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719233995/maths11_dj3zm9.png";
  const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234904/Rectangle_69_vqicir.png";
  const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234975/Rectangle_71_ckxsoa.png";
  const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234801/Rectangle_50_nidzhb.png";

  return (
    <div className='flex flex-col mx-auto mt-5'>
      
      <div className='w-full flex items-center mb-5'>
        <h1 className='text-5xl font-bold mr-auto'>Class 11</h1> 
      </div>
      
      <div className='flex flex-wrap'>
        <div className='w-1/2 p-[106px]'>
          <div className='w-[407px] h-[301px] text-5xl font-itim mb-[107px]'>
            <img src={Rectangle65} alt="maths" />
          </div>
          <div className='w-[407px] h-[301px] text-5xl font-itim'>
            <img src={Rectangle69} alt="chemistry" />
          </div>
        </div>
        <div className='w-1/2 p-[106px]'>
          <div className='w-[407px] h-[301px] text-5xl font-itim mb-[107px]'>
            <img src={Rectangle50} alt="physics" />
          </div>
          <div className='w-[407px] h-[301px] text-5xl font-itim'>
            <img src={Rectangle71} alt="biology" />
          </div>
        </div>
      </div>
    </div>
  );
};
