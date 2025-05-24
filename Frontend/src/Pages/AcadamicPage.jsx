import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const YOUR_GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_Google_api_key;

const spreadsheetId = '1-CNTtsseHMRvnKXqdD5P6ounZdi-x7RkMvHKzDkgFjo';
const sheetName = 'Sheet1';
const apiKey = YOUR_GOOGLE_SHEETS_API_KEY;

export const AcadamicPage = () => {
  const [data, setData] = useState([]);

  const [quotes, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const booleanValue = useSelector((state) => state.booleanValue);
  const dispatch = useDispatch();

console.log(quotes)
  const fetchQuotesFromSheet=async()=> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
;
    try {
      const response= await fetch(url);
      if(!response.ok)
      {
        throw new Error(`Error fetching sheet: ${response.statusText}`);
      }

      const data=await response.json();
      const rows=data.values;

      if (!rows || rows.length < 2) {
        throw new Error('No quote data found');
      }
      const quotesArray = rows.slice(1);
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      const [randomQuote, randomAuthor] = quotesArray[randomIndex];
      console.log(randomQuote)
 console.log(randomAuthor);
      
      setQuote(randomQuote || 'No quote available');
      setAuthor(randomAuthor || 'Unknown');
    }
    catch (error) {
      console.log(error);
      console.error('Failed to fetch quote from sheet:', error);
      setQuote('Success is not final; failure is not fatal: It is the courage to continue that counts.');
      setAuthor('Winston Churchill');
    }
  }

  useEffect(() => {
    fetchQuotesFromSheet();
  }, []);

  const Neet = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144504/coachifytreeapp/impejezsumx32b5nh4d1.png";
  const academicpic1 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144501/coachifytreeapp/br2gfaiu67aludef2rdy.png";
  const Jee = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144500/coachifytreeapp/bqg2rsi0534gmyxwjykm.png";

  return (
    <div className='mx-auto sm:gap-16 gap-16 flex flex-col justify-center items-center'>
      <div className='mx-auto flex flex-wrap gap-5 mt-5'>
        <div className='border-2 border-[#545454] rounded-[30px] flex flex-col gap-3 md:h-[700px] h-[300px] md:max-w-[580px] max-w-[340px]'>
          <div className='h-[400px] p-4 m-2'>
          <p className='text-[#d8973c] sm:text-[40px] text-[24px] itim'>{quotes}</p>

          </div>
          <div><p className='text-[#63a73a] sm:text-[40px] text-[24px] itim p-4'>-{author}</p>
          </div>
        </div>
        <div className='border-2 border-[#545454] rounded-[30px] sm:flex hidden'>
          <img src={academicpic1} alt="Academic" height={570} width={631} />
        </div>
      </div>
      <div className='itim text-[40px] md:text-5xl'>Class wise Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px] justify-center items-center'>
        <Link to="/comingSoon">
          <div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class1to5_s6o6y5.png)` }}>Class 1st to 5th</div>
        </Link>
        <Link to="/comingSoon">
          <div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class6to8_siunjw.png)` }}>Class 6th to 8th</div>
        </Link>

          <Link to="/academic/class9"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class9_xvbqgt.png)` }} >Class 9th</div></Link>
        
            <Link to="/academic/class10"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer  ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class10_z63347.png)` }}>Class 10th</div></Link>
        
        
            <Link to="/academic/class11"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class11_q3bvl5.png)` }}>Class 11th</div></Link>

        
            <Link to="/academic/class12"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class12_ks2piz.png)` }}>Class 12th</div></Link>
      </div>
      <div className='itim sm:text-[70px] text-4xl'>Competitive Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px] items-center justify-center'>
        
            <Link to="/academic/Neet"><div className="sm:w-[630px] w-[300px] sm:h-[305px] h-[150px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer " style={{ backgroundImage: `url(${Neet})` }}>NEET</div></Link>

            <Link to="/academic/Jee" ><div className='sm:w-[630px] w-[300px] sm:h-[305px] h-[150px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(${Jee})` }}><p>I</p>IT-JEE</div></Link>
        
      </div>
    </div>
  );
}
;
