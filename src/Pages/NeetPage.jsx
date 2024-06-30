import React from 'react';

export const NeetPage = () => {

    const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719233995/maths11_dj3zm9.png";
    const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234904/Rectangle_69_vqicir.png";
    const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234975/Rectangle_71_ckxsoa.png";
    const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234801/Rectangle_50_nidzhb.png";

    return (
        <div className='flex flex-col mx-auto mt-5 max-w-[1280px] gap-10'>

            <div className='w-full flex items-center mb-5'>
                <h1 className='text-5xl font-bold mr-auto itim'>National Eligibility cum Entrance Test (NEET)</h1>
            </div>
            <div className='text-xl itim gap-4 flex flex-col'>
                <p>NEET (National Eligibility cum Entrance Test) is India's standardized medical entrance exam for undergraduate programs in medicine and dentistry. It's conducted annually by the National Testing Agency (NTA) for admission to MBBS, BDS, AYUSH, and other medical courses in India's government and private colleges</p>
                <p>The exam covers Physics, Chemistry, and Biology (Zoology and Botany) at the higher secondary level. It's known for its competitive nature, with over a million students typically appearing each year. NEET replaced multiple state and institution-level entrance exams, creating a unified national-level test.
                </p>
                <p>NEET is mandatory for Indian students seeking medical education abroad as well. The exam's difficulty and high stakes make it a significant challenge for aspiring medical students, often requiring extensive preparation.</p>
            </div>
            <div className='itim text-xl flex gap-2'>if you need futher details please refer
                <a className='itim text-xl underline text-blue-500 cursor-pointer' href='https://en.wikipedia.org/wiki/National_Eligibility_cum_Entrance_Test_(Undergraduate)' target='_blank'>wikipedia</a>
            </div>
            <div className='flex flex-wrap max-w-[1280px] gap-40 mx-auto'>
                <div className='flex justify-around gap-60'>
                    <div className='w-[407px] h-[301px] text-5xl font-itim'>
                        <img src={Rectangle71} alt="biology" />
                    </div>
                    <div className='w-[407px] h-[301px] text-5xl font-itim'>
                        <img src={Rectangle69} alt="chemistry" />
                    </div>
                </div>
                <div className='flex justify-around gap-60'>
                    <div className='w-[407px] h-[301px] text-5xl font-itim '>
                        <img src={Rectangle50} alt="physics" />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
