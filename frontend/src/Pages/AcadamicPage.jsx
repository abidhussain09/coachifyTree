import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



export const AcadamicPage = () => {
  const [data, setData] = useState([]);
  const [qoute,setquote]=useState("");
  const [author,setauthor]=useState("");

  const booleanValue = useSelector((state) => state.booleanValue);
  const dispatch = useDispatch();


  async function randomQuote() {
    try{
      const response = await fetch('https://api.quotable.io/random');
      const output = await response.json();
      setData(output);
      setquote(output.content);
      setauthor(output.author);
    }
    catch (error){
      console.log("first api falied trying second api");
      const response2 =await fetch("https://zenquotes.io/api/random");
      const output2= await response2.json();
      setData(output2);
      setquote(output2.q);
      console.log(qoute);
      setauthor(output2.a);
      console.log(author);
    }
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
            {data.length > 0 ? <p className='text-[#d8973c] text-[40px] itim '>{qoute}</p>:<p className='text-[#d8973c] text-[40px] itim'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae fugiat amet eum cumque reprehenderit omnis, distinctio, facilis aperiam qui earum esse! Reprehenderit, tenetur consequuntur </p>}
          </div>
          <div>{data.length > 0 ? <p className='text-[#63a73a] text-[40px] itim p-4 '>-{author}</p> :<p className='text-[#63a73a] text-[40px] itim p-4 '>-noone</p>}</div>
        </div>
        <div className='border-2 border-[#545454] rounded-[30px]'>
          <img src={academicpic1} alt="Academic" height={570} width={631} />
        </div>
      </div>
      <div className='itim text-[70px]'>Class wise Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px]'>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200'  style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class1to5_s6o6y5.png)`}}>Class 1st to 5th</div>
        <div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class6to8_siunjw.png)`}}>Class 6th to 8th</div>
        {booleanValue? 
        <Link to="/signin"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class9_xvbqgt.png)`}} >Class 9th</div></Link>:
        <Link to="/academic/class9"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class9_xvbqgt.png)`}} >Class 9th</div></Link>
        }
        {
          booleanValue?
          <Link to="/signin"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class10_z63347.png)`}}>Class 10th</div></Link>:
          <Link to="/academic/class10"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218468/class10_z63347.png)`}}>Class 10th</div></Link>
        }
        {
          booleanValue?
          <Link to="/signin"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class11_q3bvl5.png)`}}>Class 11th</div></Link>
          :
          <Link to="/academic/class11"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class11_q3bvl5.png)`}}>Class 11th</div></Link>
        }
        {
          booleanValue?
          <Link to="/signin"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-100' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class12_ks2piz.png)`}}>Class 12th</div></Link>
          :
          <Link to="/academic/class12"><div className='w-[407px] h-[314px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-100' style={{backgroundImage:`url(https://res.cloudinary.com/dh26dmbg3/image/upload/v1719218467/class12_ks2piz.png)`}}>Class 12th</div></Link>
        }
      </div>
      <div className='itim text-[70px]'>Competitive Content
      </div>
      <div className='flex flex-wrap gap-5 max-w-[1280px]'>
        {
          booleanValue?
          <Link to="/signin"><div className="w-[630px] h-[305px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200" style={{backgroundImage: `url(${Neet})`}}>NEET</div></Link>
          :
          <Link to="/academic/Neet"><div className="w-[630px] h-[305px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200" style={{backgroundImage: `url(${Neet})`}}>NEET</div></Link>
        }
        {
          booleanValue?
          <Link to="/signin" ><div className='w-[630px] h-[305px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage: `url(${Jee})`}}><p>I</p>IT-JEE</div></Link>
          :
          <Link to="/academic/Jee" ><div className='w-[630px] h-[305px] itim text-[48px] rounded-[20px] border-2 border-[#545454] flex justify-center items-center cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-gray-200' style={{backgroundImage: `url(${Jee})`}}><p>I</p>IT-JEE</div></Link>
        }
      </div>
    </div>
  );
}
