import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



export const AcadamicPage = () => {
  const [data, setData] = useState([]);
  const [qoute, setquote] = useState('Success is not final; failure is not fatal; It is the courage to continue that counts.');
  const [author, setauthor] = useState('Winston Churchill');

  const booleanValue = useSelector((state) => state.booleanValue);
  const dispatch = useDispatch();


  async function randomQuote() {
    const url = 'https://random-quote-api3.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7d12f036c9msh57064ee2fa291cbp1c87f6jsnd119864c4e74',
        'x-rapidapi-host': 'random-quote-api3.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      console.log(data);
      if(!result){
        defaultQuote();
      }
      // console.log(result.data);
      setData({result});
      setquote(result.quote);
      console.log(qoute);
      setauthor(result.author);
      console.log(author);
    }
    catch (error) {
      console.log("first api falied trying second api");
      const response2 = await fetch("https://zenquotes.io/api/random");
      const output2 = await response2.json();
      setData(output2);
      setquote(output2.q);
      console.log(qoute);
      setauthor(output2.a);
      console.log(author);
    }
  }
  function defaultQuote(){
    setquote("Success is not final; failure is not fatal: It is the courage to continue that counts.");
    setauthor("Winston Churchill");
  }
  useEffect(() => {
    randomQuote();
  }, []);

  const Neet = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144504/coachifytreeapp/impejezsumx32b5nh4d1.png";
  const academicpic1 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144501/coachifytreeapp/br2gfaiu67aludef2rdy.png";
  const Jee = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1719144500/coachifytreeapp/bqg2rsi0534gmyxwjykm.png";

  return (
    <div className='mx-auto sm:gap-16 gap-16 flex flex-col justify-center items-center'>
      <div className='mx-auto flex flex-wrap gap-5 mt-5'>
        <div className='border-2 border-[#545454] rounded-[30px] flex flex-col gap-3 max-w-[620px]'>
          <div className='h-[400px] p-4 m-2'>
            {data.length > 0 ? <p className='text-[#d8973c] sm:text-[40px] text-[24px] itim '>{qoute}</p> : <p className='text-[#d8973c] text-[40px] itim'>"Success is not final; failure is not fatal: It is the courage to continue that counts."</p>}
          </div>
          <div>{data.length > 0 ? <p className='text-[#63a73a] sm:text-[40px] text-[24px] itim p-4 '>-{author}</p> : <p className='text-[#63a73a] text-[40px] itim p-4 '>-Winston Churchill</p>}</div>
        </div>
        <div className='border-2 border-[#545454] rounded-[30px] sm:flex hidden'>
          <img src={academicpic1} alt="Academic" height={570} width={631} />
        </div>
      </div>
      <div className='itim sm:text-[70px] text-5xl'>Class wise Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px] justify-center items-center'>
        <Link to="/comingSoon">
          <div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class1to5_s6o6y5.png)` }}>Class 1st to 5th</div>
        </Link>
        <Link to="/comingSoon">
          <div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class6to8_siunjw.png)` }}>Class 6th to 8th</div>
        </Link>
        {booleanValue ?
          <Link to="/signin"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class9_xvbqgt.png)` }} >Class 9th</div></Link> :
          <Link to="/academic/class9"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class9_xvbqgt.png)` }} >Class 9th</div></Link>
        }
        {
          booleanValue ?
            <Link to="/signin"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class10_z63347.png)` }}>Class 10th</div></Link> :
            <Link to="/academic/class10"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer  ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class10_z63347.png)` }}>Class 10th</div></Link>
        }
        {
          booleanValue ?
            <Link to="/signin"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class11_q3bvl5.png)` }}>Class 11th</div></Link>
            :
            <Link to="/academic/class11"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer ' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class11_q3bvl5.png)` }}>Class 11th</div></Link>
        }
        {
          booleanValue ?
            <Link to="/signin"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class12_ks2piz.png)` }}>Class 12th</div></Link>
            :
            <Link to="/academic/class12"><div className='sm:w-[407px] sm:h-[314px] h-[150px] w-[300px] itim sm:text-[48px] text-3xl rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class12_ks2piz.png)` }}>Class 12th</div></Link>
        }
      </div>
      <div className='itim sm:text-[70px] text-4xl'>Competitive Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px]'>
        {
          booleanValue ?
            <Link to="/signin"><div className="sm:w-[630px] w-[300px] sm:h-[305px] h-[150px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer " style={{ backgroundImage: `url(${Neet})` }}>NEET</div></Link>
            :
            <Link to="/academic/Neet"><div className="sm:w-[630px] w-[300px] sm:h-[305px] h-[150px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer " style={{ backgroundImage: `url(${Neet})` }}>NEET</div></Link>
        }
        {
          booleanValue ?
            <Link to="/signin" ><div className='sm:w-[630px] w-[300px] sm:h-[305px] h-[150px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(${Jee})` }}><p>I</p>IT-JEE</div></Link>
            :
            <Link to="/academic/Jee" ><div className='sm:w-[630px] w-[300px] sm:h-[305px] h-[150px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer' style={{ backgroundImage: `url(${Jee})` }}><p>I</p>IT-JEE</div></Link>
        }
      </div>
    </div>
  );
}
