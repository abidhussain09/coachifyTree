import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AcadamicPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 

  async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const output = await response.json();
    setData(output);
  }

  useEffect(() => {
    randomQuote();
  }, []);

  const Neet = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144504/coachifytreeapp/impejezsumx32b5nh4d1.png";
  const academicpic1 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144501/coachifytreeapp/br2gfaiu67aludef2rdy.png";
  const Jee = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144500/coachifytreeapp/bqg2rsi0534gmyxwjykm.png";

  return (
    <div className='mx-auto gap-10 flex flex-col'>
      <div className='mx-auto flex flex-wrap gap-5 mt-5'>
        <div className='border-2 border-[#545454] rounded-[30px] flex flex-col gap-3 max-w-[620px]'>
          <div className=' h-[400px] p-4 m-2'>
            {data.length > 0 && <p className='text-[#d8973c] text-[40px] itim '>{data.content}</p>}
          </div>
          <div>{data.length > 0 && <p className='text-[#63a73a] text-[40px] itim p-4 '>-{data.author}</p>}</div>
        </div>
        <div className='border-2 border-[#545454] rounded-[30px]'>
          <img src={academicpic1} alt="Academic" height={570} width={631} />
        </div>
      </div>
      <div className='itim text-[70px]'>Class wise Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px]'>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center'>Class 1st to 5th</div>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center'>Class 6th to 8th</div>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center' onClick={() => navigate('/class9')}>Class 9th</div> 
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center' onClick={() => navigate('/class10')}>Class 10th</div>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center' onClick={() => navigate('/class11')}>Class 11th</div>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center' onClick={() => navigate('/class12')}>Class 12th</div>
      </div>
      <div className='itim text-[70px]'>Competitive Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px]'>
        <div className="w-[630px] h-[305px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center" style={{backgroundImage: `url(${Neet})`}}>NEET</div>
        <div className='w-[630px] h-[305px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center' style={{backgroundImage: `url(${Jee})`}}><p>I</p>IT-JEE</div>
      </div>
    </div>
  );
}
