import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
    {
        name: "Md Abid Hussain",
        image: "https://res.cloudinary.com/dh26dmbg3/image/upload/v1748071381/mark-basarab-y421kXlUOQk-unsplash_ztnogo.jpg",
        linkedin: "https://www.linkedin.com/in/md-abid-hussain-a49b69270/",
        github: "https://github.com/abidhussain09",
        email: "mailto:abidhussain09.w@gmail.com",
    },
    {
        name: "Roshan Perwez",
        image: "https://res.cloudinary.com/dh26dmbg3/image/upload/v1748071381/mark-basarab-y421kXlUOQk-unsplash_ztnogo.jpg",
        linkedin: "https://www.linkedin.com/in/roshan-perwez/",
        github: "https://github.com/perwezroshan",
        email: "mailto:perwezroshan07@gmail.com",
    },
    {
        name: "Mudassir Akram",
        image: "https://res.cloudinary.com/dh26dmbg3/image/upload/v1748071381/mark-basarab-y421kXlUOQk-unsplash_ztnogo.jpg",
        linkedin: "https://linkedin.com/in/jane",
        github: "https://github.com/janesmith",
        email: "mailto:jane@example.com",
    },
];

export const Team = () => {
    return (
        <div className="min-h-screen p-10">
            <h1 className="text-4xl font-bold text-center mb-10">Meet Our Team</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-neutral-800 shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-60 h-60 rounded-full object-cover mb-4"
                        />
                        <h2 className="text-3xl itim font-semibold mb-4">{member.name}</h2>
                        <div className="flex space-x-4 text-white">
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href={member.email}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-600"
                            >
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
