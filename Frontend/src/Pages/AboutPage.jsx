import React from 'react';

export const AboutPage = () => {
  const photo1 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1735975380/Rectangle_2751_vwxxru.png";
  const photo2 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1735975381/Rectangle_2757_nhuxab.png";
  const photo3 = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1735975381/Rectangle_2753_xkgqh7.png";
  
  return (
    <div className="flex flex-col items-center max-w-[1280px] mx-auto px-4 text-white itim">
      
      {/* About Us Section */}
      <div className="w-full mt-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#d8973c] underline decoration-white decoration-1 underline-offset-8">
          About us
        </h1>
      </div>

      {/* About Us Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
        {/* Left Column: Text */}
        <div className="flex items-center justify-center p-6 bg-black rounded-lg">
          <p className="text-lg md:text-2xl text-center">
            Welcome to Coachify Tree, where we believe that behind every champion,
            there is always a coach. Our platform is dedicated to empowering
            students on their journey to success, both academically and personally.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={photo1}
            alt="A coach guiding a student"
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="w-full text-center mt-24 ">
      <h1 className="text-3xl md:text-4xl font-semibold text-[#d8973c] underline decoration-white decoration-1 underline-offset-8 itim ">
            Mission Statement
          </h1>
      </div>

      {/* Our Mission Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-16">
        {/* Left Column: Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={photo2}
            alt="A mission statement image"
            className="block w-full h-auto"
          />
        </div>

        {/* Right Column: Text */}
        <div className="flex items-center justify-center p-6 bg-black rounded-lg">
          <p className="text-lg md:text-2xl text-justify itim">
            At Coachify Tree, our mission is clear: we strive to provide the best coaching and mentoring services to students worldwide. We believe that every student has the potential to achieve greatness, and our goal is to help them unlock that potential. Through personalized coaching, academic resources, and a supportive community, we aim to guide students towards their dreams.
            <br />
            <br />
            We are committed to creating an environment where students can thrive, both academically and personally. Our team of experienced coaches is dedicated to providing the support and guidance needed to help students overcome challenges and reach their full potential.
          </p>
        </div>
      </div>

      {/* Specialized Branches Section */}
      <div className="w-full mt-24">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#d8973c] underline decoration-white decoration-1 underline-offset-8 itim">
          Coachify Tree offers specialized branches:
        </h1>
      </div>

      {/* Specialized Branches Content */}
      <div className=" grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
        {/* Left Column: Text */}
        <div className="flex flex-col justify-center p-6 bg-black  rounded-lg">
          <p className="text-lg md:text-2xl itim">
            <span className="text-[#63A76A] text-4xl">Coachify Education:</span>
            <br />
            <span className="underline decoration-1 text-2xl">Personalized support for academic excellence.</span>
            <br /><br />
            Coachify Education provides tailored learning experiences to help students excel academically. We offer personalized coaching, study plans, and interactive tools to match each student’s needs. We empower students to reach their full potential, regardless of their starting point.
            <br /><br />
            <span className="text-[#63A76A] text-4xl">Coachify Library:</span>
            <br />
            <span className="underline decoration-1 text-2xl">Resources promoting lifelong learning and curiosity.</span>
            <br /><br />
            From books and articles to online courses, we provide tools for personal growth and intellectual development. The library supports both students and professionals in their lifelong learning journey.
            <br /><br />
            <span className="text-[#63A76A] text-4xl">Coachify Health:</span>
            <br />
            <span className="underline decoration-1 text-2xl">Encouraging physical, mental, and emotional well-being.</span>
            <br /><br />
            Coachify Health promotes holistic well-being, focusing on physical, mental, and emotional health. Our services help users develop resilience and stress-management skills. By prioritizing health, Coachify ensures that individuals thrive academically and personally.
          </p>
        </div>

        {/* Right Column: Image */}
        
      </div>

    </div>
  );
};
