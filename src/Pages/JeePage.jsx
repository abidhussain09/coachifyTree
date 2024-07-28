import React from 'react';

export const JeePage = () => {

  const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719233995/maths11_dj3zm9.png";
  const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234904/Rectangle_69_vqicir.png";
  const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234975/Rectangle_71_ckxsoa.png";
  const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234801/Rectangle_50_nidzhb.png";

  return (
    <div className='flex flex-col mx-auto mt-5 max-w-screen-lg px-4'>
      <div className='flex items-center mb-5'>
        <h1 className='text-3xl sm:text-5xl font-bold itim m-3 text-center'>Joint Entrance Examination (JEE)</h1>
      </div>
      
      <div className='text-lg sm:text-xl itim gap-4 flex flex-col text-center mb-6'>
        <p>JEE (Joint Entrance Examination) is a standardized test in India for admission to undergraduate engineering programs. It consists of two parts: JEE Main and JEE Advanced. JEE Main is the initial test, serving as a qualifier for JEE Advanced and for admissions to NITs, IIITs, and other top institutions. JEE Advanced is specifically for admission to the prestigious Indian Institutes of Technology (IITs). The exam covers Physics, Chemistry, and Mathematics at a high school level. It's known for its rigorous difficulty and competitive nature, with millions of students taking it annually. Success in JEE often requires extensive preparation and is considered a significant achievement in the Indian education system.</p>
      </div>

      <div className='itim text-lg jsm:text-xl mb-6'>
        If you need further details, please refer to
        <a className='underline text-blue-500 ml-1' href='https://en.wikipedia.org/wiki/Joint_Entrance_Examination' target='_blank' rel='noopener noreferrer'>Wikipedia</a>.
      </div>

      <div className='flex flex-wrap justify-center gap-4'>
        <div className='flex flex-col items-center p-4 sm:p-8 w-full sm:w-1/2'>
          <div className='flex flex-col items-center mb-8 cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1UPVzUSRDk-D4qeWOLnJm9qfM2rAkD5bV?usp=sharing", '_blank') }}>
            <img src={Rectangle65} alt="maths" className='w-full h-auto max-w-xs sm:max-w-none' />
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1S9KF4295JccZtr5PgUmhC3MKgy9XF0Yg?usp=sharing", '_blank') }}>
            <img src={Rectangle69} alt="chemistry" className='w-full h-auto max-w-xs sm:max-w-none' />
          </div>
        </div>
        <div className='flex flex-col items-center p-4 sm:p-8 w-full sm:w-1/2'>
          <div className='flex flex-col items-center mb-8 cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/174I-ikOenBZmEF9Vp9vvltXuR9yKExE0?usp=sharing", '_blank') }}>
            <img src={Rectangle50} alt="physics" className='w-full h-auto max-w-xs sm:max-w-none' />
          </div>
          
        </div>
      </div>
    </div>
  );
};
