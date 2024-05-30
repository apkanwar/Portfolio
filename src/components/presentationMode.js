import { useState, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import styles from '@/styles/imageShine.module.css'

export default function PresentationMode() {
  const [activeTab, setActiveTab] = useState("P1");
  const [data, setData] = useState([]);

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
      setData(data);
      console.log('Fetched Data!');
    } catch (error) {
      console.error('Error Fetching Data:', error);
    }
  };

  return (
    <section id="projectsCard" className="w-full bg-artic-blue py-24">
      <div className="mx-auto max-w-5xl flex flex-col rounded bg-white border-solid border-2 border-dm-black">
        <div className="py-8 w-full flex justify-center items-center bg-dm-black">
          <p className="font-dText font-semibold text-white text-2xl">
            PROJECTS OVERVIEW
          </p>
        </div>
        <div className="w-full flex flex-col">
          <Tabs value={activeTab} orientation="vertical">
            <div className="md:min-w-[16rem] md:max-w-[16rem]">
              <TabsHeader
                className="p-0 rounded-none bg-transparent"
                indicatorProps={{ className: "shadow-none rounded-none bg-dm-black/10" }}
              >
                {data.map(({ key, label }) => (
                  <Tab key={key} value={key} onClick={() => setActiveTab(key)} className="p-4 text-lg text-dm-black font-semibold font-headings">
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </div>
            <div className="bg-dm-black min-h-[500px] py-6">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full">
                <TabsBody className="h-full">
                  {data.map(({ key, desc, logo, git }) => (
                    <TabPanel key={key} value={key} className="py-0 text-white h-full" >
                      <div className="flex flex-col items-center font-dText h-full">
                        <div className={styles.shine}>
                          <img src={logo} />
                        </div>
                        <div className="py-8 text-lg leading-loose">
                          {desc}
                        </div>
                        <div className="w-full flex flex-row items-center justify-between absolute bottom-0">
                          <Link href={key}>
                            <div className="flex justify-center items-center">
                              <button className="py-2 px-4 rounded-full font-dText text-md font-semibold hover:bg-gray-700 text-white transition ease-in duration-200">
                                LEARN MORE
                              </button>
                            </div>
                          </Link>
                          <Link href={git}>
                            <button className="p-2 rounded-full font-dText text-md font-semibold hover:bg-gray-700 text-white transition ease-in duration-200">
                              <GitHubIcon />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                </TabsBody>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}