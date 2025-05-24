import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
    {
        name: "Md Abid Hussain",
        image: "https://via.placeholder.com/150",
        linkedin: "https://www.linkedin.com/in/md-abid-hussain-a49b69270/",
        github: "https://github.com/abidhussain09",
        email: "mailto:abidhussain09.w@gmail.com",
    },
    {
        name: "Roshan Perwez",
        image: "https://via.placeholder.com/150",
        linkedin: "https://www.linkedin.com/in/roshan-perwez/",
        github: "https://github.com/perwezroshan",
        email: "mailto:perwezroshan07@gmail.com",
    },
    {
        name: "Mudassir Akram",
        image: "https://via.placeholder.com/150",
        linkedin: "https://linkedin.com/in/jane",
        github: "https://github.com/janesmith",
        email: "mailto:jane@example.com",
    },
];

export const Team = () => {
    return (
        <div className="min-h-screen p-10">
            <h1 className="text-4xl font-bold text-center mb-10">Meet Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <div key={index} className="group perspective">
                        <div className="relative h-80 w-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                            {/* Front Side */}
                            <div className="absolute w-full h-full bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                />
                                <h2 className="text-xl font-semibold">{member.name}</h2>
                            </div>
                            {/* Back Side */}
                            <div className="absolute w-full h-full bg-blue-600 text-white shadow-lg rounded-2xl transform rotate-y-180 flex items-center justify-center gap-4 backface-hidden">
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="text-3xl hover:text-blue-300 transition" />
                                </a>
                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="text-3xl hover:text-gray-300 transition" />
                                </a>
                                <a href={member.email} target="_blank" rel="noopener noreferrer">
                                    <FaEnvelope className="text-3xl hover:text-red-300 transition" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
