import Link from "next/link";
import { useState, useEffect } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function ProjectsView() {
  const [dataLeft, setDataL] = useState([]);
  const [dataRight, setDataR] = useState([]);

  useEffect(() => {
    fetchProjectOverview();
  }, []);

  const fetchProjectOverview = async () => {
    try {
      const response = await fetch('/api/projectOverview');
      if (!response.ok) {
        throw new Error('Failed to Fetch Data');
      }
      const { data } = await response.json();
      let dataLeft = [], dataRight = [];
      for (let x = 0; x < data.length; x++) {
        if (data[x].key % 2 != 0) {
          dataLeft.push(data[x]);
        } else {
          dataRight.push(data[x]);
        }
      }
      setDataL(dataLeft);
      setDataR(dataRight);
      console.log('Fetched Data!');
    } catch (error) {
      console.error('Error Fetching Data:', error);
    }
  };

  return (
    <section id="projectsCard" className="mx-4 xl:mx-auto bg-artic-blue py-24">
      <div className="mx-auto max-w-5xl flex flex-col">
        <div className="py-8 w-full flex justify-center items-center bg-dm-black rounded-xl">
          <p className="font-dText font-semibold text-white text-2xl">
            PROJECTS OVERVIEW
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
          <div className="flex flex-col gap-8">
            {dataLeft.map(({ key, label, desc, git }) => (
              <div key={key} value={key} className="bg-dm-black rounded-xl p-16">
                <h2 className="font-headings text-xl font-semibold text-eazy-main-90">{label}</h2>
                <div className="py-8 text-lg leading-loose text-white font-dText">
                  {desc}
                </div>
                <Link href={git}>
                  <div className="flex justify-end items-end">
                    <button className="p-4 rounded-full hover:bg-gray-700 hover:text-eazy-main-90 text-eazy-main-75 transition ease-in duration-200">
                      <GitHubIcon fontSize="large" />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {dataRight.map(({ key, label, desc, git }) => (
              <div key={key} value={key} className="bg-dm-black rounded-xl p-16">
              <h2 className="font-headings text-xl font-semibold text-eazy-main-90">{label}</h2>
              <div className="py-8 text-lg leading-loose text-white font-dText">
                {desc}
              </div>
              <Link href={git}>
                <div className="flex justify-end items-end">
                  <button className="p-4 rounded-full hover:bg-gray-700 hover:text-eazy-main-90 text-eazy-main-75 transition ease-in duration-200">
                    <GitHubIcon fontSize="large" />
                  </button>
                </div>
              </Link>
            </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}