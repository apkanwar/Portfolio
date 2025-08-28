import { useState, useEffect } from "react";
import Link from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ResumeIcon from '@mui/icons-material/AssignmentInd';


export default function AboutMe() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const response = await fetch('/api/links');
            if (!response.ok) {
                throw new Error('Failed to Fetch Data');
            }
            const { data } = await response.json();
            for (let i = 0; i < data.length; i++) {
                if (data[i].name == 'GitHub')
                    data[i].icon = <GitHubIcon />
                else if (data[i].name == 'LinkedIn')
                    data[i].icon = <LinkedInIcon />
                else if (data[i].name == 'Resume')
                    data[i].icon = <ResumeIcon />
            }
            setLinks(data);
        } catch (error) {
            console.error('Error Fetching Data:', error);
        }
    };

    return (
        <div id="aboutCard" className="relative isolate overflow-hidden bg-dm-black py-24 sm:py-32">
            <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>
            <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
                <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="mx-auto max-w-5xl lg:mx-0">
                    <h2 className="text-4xl font-dText font-semibold tracking-tight text-white sm:text-6xl">Get To Know Me</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300 font-dText">
                        As a software developer, I focus on designing and creating applications that prioritize user interface and user experience. I've worked on various projects, both in teams and individually, which has given me a solid understanding of the unique challenges and benefits of each setting. On this site, you'll find a collection of the projects I've worked on throughout my career.
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-1 lg:grid-cols-3">
                        {links.map((link) => (
                            <Link key={link.name} href={link.link}>
                                <div className="flex flex-row text-white font-dText border-solid border border-white/30 rounded-xl p-6 justify-between items-center hover:bg-white/10 cursor-pointer">
                                    <div className="flex flex-row">
                                        {link.icon}
                                        <h2 className="pl-2">{link.name}</h2>
                                    </div>
                                    <span className="text-4xl">
                                        &#8677;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
