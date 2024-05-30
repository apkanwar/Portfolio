import { useEffect, useState } from "react";

export default function ResumeContent() {
    const [objectives, setObjectives] = useState([]);
    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        fetchResumeContent();
    }, []);

    const fetchResumeContent = async () => {
        try {
            const response = await fetch('/api/resumeData');
            if (!response.ok) {
                throw new Error('Failed to Fetch Data');
            }
            const { data } = await response.json();

            //Set Variables
            setObjectives(data[0].objectives);
            setWorkExperience(data[0].work);
            setEducation(data[0].education);
        } catch (error) {
            console.error('Error Fetching Data:', error);
        }
    };

    return (
        <div id="resumeContent" className="w-[calc(100%-29rem)] ml-auto bg-white m-6 rounded-2xl">
            <div className="flex flex-row justify-between items-center p-5 font-headings uppercase font-semibold">
                <h1 className="text-3xl">My Resume</h1>
                <h3 className="text-xl">Updated:
                    <span className="text-eazy-main-100"> June 1, 2024</span>
                </h3>
            </div>
            <hr />
            <div id="objectives" className="flex flex-col p-8 gap-6">
                <div className="flex flex-row items-center gap-4">
                    <img src="/icons/objectives.png" />
                    <h2 className="font-headings font-semibold text-2xl uppercase">Objectives</h2>
                </div>
                <p className="font-dText text-lg">
                    {objectives}
                </p>
            </div>

            <div id="work" className="flex flex-col p-8 gap-6">
                <div className="flex flex-row items-end gap-4">
                    <img src="/icons/work_experience.png" />
                    <h2 className="font-headings font-semibold text-2xl uppercase">Work Experience</h2>
                </div>
                {workExperience.map(({ key, title, company, duration, details }) => (
                    <div key={key} className="px-4 flex flex-col">
                        <div className="flex flex-row justify-between items-center font-headings font-semibold text-xl uppercase">
                            <h3> {title} </h3>
                            <h3> {duration} </h3>
                        </div>
                        <h4 className="text-md font-headings uppercase my-2 text-eazy-main-100"> {company} </h4>
                        <ul className="list-disc ml-12 font-dText text-lg">
                            {details.map(info => {
                                return (
                                    <li key={info} className="my-3"> {info} </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>

            <div id="education" className="flex flex-col p-8 gap-6">
                <div className="flex flex-row items-end gap-4">
                    <img src="/icons/education.png" />
                    <h2 className="font-headings font-semibold text-2xl uppercase">Education</h2>
                </div>
                {education.map(({ key, title, institution, duration, details }) => (
                    <div key={key} className="px-4 flex flex-col">
                        <div className="flex flex-row justify-between items-center font-headings font-semibold text-xl uppercase">
                            <h3> {title} </h3>
                            <h3> {duration} </h3>
                        </div>
                        <h4 className="text-md font-headings uppercase my-2 text-eazy-main-100"> {institution} </h4>
                        <ul className="list-disc ml-12 font-dText text-lg">
                            {details.map(info => {
                                return (
                                    <li key={info} className="my-3"> {info} </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}