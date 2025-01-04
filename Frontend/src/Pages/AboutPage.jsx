import React from 'react';

export const AboutPage = () => {
  const photo1 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1735975380/Rectangle_2751_vwxxru.png";
  const photo2 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1735975381/Rectangle_2757_nhuxab.png";
  const photo3 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1735975381/Rectangle_2753_xkgqh7.png"
  return (
    <div className="flex flex-col items-center max-w-[1280px] mx-auto px-4">
      
      {/* About Us Section */}
      <div className="w-full mt-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#d8973c] underline decoration-white decoration-1 underline-offset-8">
          About Us
        </h1>
      </div>

      {/* About Us Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
        {/* Left Column: Text */}
        <div className="flex items-center justify-center p-6 border rounded-3xl shadow-md">
          <p className="text-lg md:text-xl text-center">
            Welcome to Coachify Tree, where we believe that behind every champion,
            there is always a coach. Our platform is dedicated to empowering
            students on their journey to success, both academically and personally.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="shadow-md overflow-hidden ">
          <img
            src={photo1}
            alt="maths"
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="w-full text-center mt-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-[#d8973c] underline decoration-white decoration-1 underline-offset-8">
          Misssion Statement
        </h1>
      </div>

      {/* Our Mission Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-16">
        {/* Left Column: Image */}
        <div className="shadow-md overflow-hidden ">
          <img
            src={photo2}
            alt="maths"
            className="block w-full h-auto"
          />
        </div>

        {/* Right Column: Text */}
        <div className="flex items-center justify-center p-6 border rounded-3xl shadow-md">
          <p className="text-lg  text-justify">
            At Coachify Tree, our mission is clear: we strive to equip students with the
            knowledge, skills, and confidence necessary to excel in all aspects of life.
            We are committed to inspiring a passion for learning, nurturing critical
            thinking abilities, and developing individuals who are not only academically
            proficient but also ethical and responsible.
            <br />
            <br/>
            By leveraging innovative educational resources and personalized coaching, we
            aim to support students in reaching their full potential. Whether it's mastering
            complex concepts, preparing for exams, or developing essential life skills, our
            dedicated team is here to guide and mentor every step of the way.
            <br />
            <br />
            Join us at Coachify and let us help you unleash your true academic and personal
            greatness. Together, we'll pave the way towards a future where every student
            can thrive and achieve their dreams.
          </p>
        </div>
      </div>
      <div className="w-full mt-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#d8973c] underline decoration-white decoration-1 underline-offset-8">
        Coachify Tree offers <br/>specialized branches :
        </h1>
      </div>

      {/* About Us Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
        {/* Left Column: Text */}
        <div className="flex items-center justify-center p-6 border rounded-3xl shadow-md">
          <p>
            <p className='itim text-[#63A76A] text-2xl'>Coachify Education:</p>
            <p className='underline decoration-1 text-xl'>Personalized support for academic excellence.</p>
            <br/><p className='text-lg itim text-justify'>Coachify Education provides tailored learning experiences to help students excel academically. We offer personalized coaching, study plans, and interactive tools to match each student’s needs. We empower students to reach their full potential, regardless of their starting point.</p>
            <br/>
            <p className='itim text-[#63A76A] text-2xl'>Coachify Library: </p>
            <p className='underline text-xl decoration-1'>Resources promoting lifelong learning and curiosity.</p>
            <br/><p className='text-lg itim text-justify'>The Coachify Library is an extensive collection of resources designed to spark curiosity and inspire continuous learning. From books and articles to online courses, we provide tools for personal growth and intellectual development. The library supports both students and professionals in their lifelong learning journey.

</p>
            <br/>
            <p className='itim text-[#63A76A] text-2xl'>Coachify Health: </p>
            <p className='underline text-xl decoration-1'>Encouraging physical, mental, and emotional well being.</p>
             <br/> <p className='text-lg itim text-justify'>Coachify Health promotes holistic well-being, focusing on physical, mental, and emotional health. Our services help users develop resilience and stress-management skills. By prioritizing health, Coachify ensures that individuals thrive academically and personally.</p>
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="shadow-md overflow-hidden ">
          <img
            src={photo3}
            alt="maths"
            className="block w-full h-auto"
          />
        </div>
      </div>

    </div>
  );
};
