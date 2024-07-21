import React from 'react';

export const JeePage = () => {

    const Rectangle65 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719233995/maths11_dj3zm9.png";
    const Rectangle69 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234904/Rectangle_69_vqicir.png";
    const Rectangle71 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234975/Rectangle_71_ckxsoa.png";
    const Rectangle50 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719234801/Rectangle_50_nidzhb.png";

    return (
        <div className='flex flex-col mx-auto mt-5 max-w-[1280px] gap-4'>

            <div className='w-full flex items-center mb-5'>
                <h1 className='text-5xl font-bold mr-auto itim m-3'>JOIN ENTERANCE EXAMINATION (Jee)</h1>
            </div>
            <div className='itim text-xl'>JEE (Joint Entrance Examination) is a standardized test in India for admission to undergraduate engineering programs. It consists of two parts: JEE Main and JEE Advanced. JEE Main is the initial test, serving as a qualifier for JEE Advanced and for admissions to NITs, IIITs, and other top institutions. JEE Advanced is specifically for admission to the prestigious Indian Institutes of Technology (IITs). The exam covers Physics, Chemistry, and Mathematics at a high school level. It's known for its rigorous difficulty and competitive nature, with millions of students taking it annually. Success in JEE often requires extensive preparation and is considered a significant achievement in the Indian education system.</div>
            <div className='itim text-xl flex gap-2'>if you need futher details please refer
                <a className='itim text-xl underline text-blue-500 cursor-pointer' href='https://en.wikipedia.org/wiki/Joint_Entrance_Examination' target='_blank'>wikipedia</a>
            </div>
            <div className='flex flex-wrap'>
                <div className='w-1/2 p-[106px]'>
                    <div className='w-[407px] h-[301px] text-5xl font-itim mb-[107px] cursor-pointer' onClick={()=>{window.open("https://drive.google.com/drive/folders/1UPVzUSRDk-D4qeWOLnJm9qfM2rAkD5bV?usp=sharing",'_blank')}}>
                        <img src={Rectangle65} alt="maths" />
                    </div>
                    <div className='w-[407px] h-[301px] text-5xl font-itim cursor-pointer' onClick={()=>{window.open("https://drive.google.com/drive/folders/1S9KF4295JccZtr5PgUmhC3MKgy9XF0Yg?usp=sharing",'_blank')}}>
                        <img src={Rectangle69} alt="chemistry" />
                    </div>
                </div>
                <div className='w-1/2 p-[106px]'>
                    <div className='w-[407px] h-[301px] text-5xl font-itim mb-[107px] cursor-pointer' onClick={()=>{window.open("https://drive.google.com/drive/folders/174I-ikOenBZmEF9Vp9vvltXuR9yKExE0?usp=sharing",'_blank')}}>
                        <img src={Rectangle50} alt="physics" />
                    </div>
                </div>
            </div>
        </div>
    );
};
