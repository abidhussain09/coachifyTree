import React from 'react';

export const NeetPage = () => {

  const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719233995/maths11_dj3zm9.png";
  const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234904/Rectangle_69_vqicir.png";
  const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234975/Rectangle_71_ckxsoa.png";
  const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234801/Rectangle_50_nidzhb.png";

  return (
    <div className='flex flex-col mx-auto mt-5 max-w-screen-lg px-4'>
      <div className='flex items-center mb-5'>
        <h1 className='text-3xl sm:text-5xl font-bold itim m-3 text-center'> NATIONAL ENTRANCE cum ELIGIBILITY TEST (NEET)</h1>
      </div>
      
      <div className='text-lg sm:text-xl itim gap-4 flex flex-col text-center mb-6'>
        <p>NEET (National Eligibility cum Entrance Test) is India's standardized medical entrance exam for undergraduate programs in medicine and dentistry. It's conducted annually by the National Testing Agency (NTA) for admission to MBBS, BDS, AYUSH, and other medical courses in India's government and private colleges.</p>
        <p>The exam covers Physics, Chemistry, and Biology (Zoology and Botany) at the higher secondary level. It's known for its competitive nature, with over a million students typically appearing each year. NEET replaced multiple state and institution-level entrance exams, creating a unified national-level test.</p>
        <p>NEET is mandatory for Indian students seeking medical education abroad as well. The exam's difficulty and high stakes make it a significant challenge for aspiring medical students, often requiring extensive preparation.</p>
      </div>

      <div className='itim text-lg sm:text-xl mb-6'>
        If you need further details, please refer to
        <a className='underline text-blue-500 ml-1' href='https://en.wikipedia.org/wiki/National_Eligibility_cum_Entrance_Test_(Undergraduate)' target='_blank' rel='noopener noreferrer'>Wikipedia</a>.
      </div>

      <div className='flex flex-wrap justify-center gap-4'>
        <div className='flex flex-col items-center p-4 sm:p-8 w-full sm:w-1/2'>
          <div className='flex flex-col items-center mb-8 cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1BERnC0AqNWvo_WhJ6iCbBTn-mB_j58De?usp=sharing", '_blank') }}>
            <img src={Rectangle71} alt="biology" className='w-full h-auto max-w-xs sm:max-w-none' />
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/132unzjB-8MpXWOGK48CzaSUDgcfkAgvz?usp=sharing", '_blank') }}>
            <img src={Rectangle69} alt="chemistry" className='w-full h-auto max-w-xs sm:max-w-none' />
          </div>
        </div>
        <div className='flex flex-col items-center p-4 sm:p-8 w-full sm:w-1/2'>
          <div className='flex flex-col items-center mb-8 cursor-pointer' onClick={() => { window.open("https://drive.google.com/drive/folders/1MbLgIo0YpVLg3aJ84D9cKiR7m5sgNMd1?usp=sharing", '_blank') }}>
            <img src={Rectangle50} alt="physics" className='w-full h-auto max-w-xs sm:max-w-none' />
          </div>
        </div>
      </div>
    </div>
  );
};
