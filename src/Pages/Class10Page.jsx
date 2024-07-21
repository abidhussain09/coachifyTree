import React from 'react';

export const Class10 = () => {
  // Define the image sources as constants
  const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719216902/Rectangle_68_pwhl5m.png";
  const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719216617/Rectangle_69_tfosqc.png";
  const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719216293/Rectangle_71_qncuku.png";
  const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719221302/Rectangles50_l3fsmi.png";

  return (
    <div className='flex flex-col mx-auto mt-5'>
      
      <div className='w-full flex items-center mb-5'>
        <h1 className='text-5xl font-bold mr-auto'>Class 10</h1> 
      </div>
      
      <div className='flex flex-wrap'>
        <div className='w-1/2 p-[106px]'>
          <div className='w-[407px] h-[301px] text-5xl font-itim mb-[107px] cursor-pointer' onClick={()=>{window.open("https://drive.google.com/drive/folders/1ixn6uLGh4Jo5d5KBaaWwK08KGWAkfNRz?usp=sharing",'_blank')}}>
            <img src={Rectangle65} alt="maths" />
          </div>
          <div className='w-[407px] h-[301px] text-5xl font-itim cursor-pointer' onClick={()=>{window.open("https://drive.google.com/drive/folders/1CdTPtCjRvnE8QBAPBeGvlUnKVtHGtwVL?usp=sharing",'_blank')}}>
            <img src={Rectangle69} alt="social science" />
          </div>
        </div>
        <div className='w-1/2 p-[106px]'>
          <div className='w-[407px] h-[301px] text-5xl font-itim mb-[107px] cursor-pointer' onClick={()=>{window.open("https://drive.google.com/drive/folders/1g056bAq7MkylMs4xxjrx-OUvw9abzvuV?usp=sharing",'_blank')}}>
            <img src={Rectangle50} alt="science" />
          </div>
          <div className='w-[407px] h-[301px] text-5xl font-itim cursor-pointers' onClick={()=>{window.open("https://drive.google.com/drive/folders/1e1WOR2JM9cQRyAZRp3lzgH8B1Lvn4O-6?usp=sharing",'_blank')}}>
            <img src={Rectangle71} alt="english" />
          </div>
        </div>
      </div>
    </div>
  );
};
