import Link from 'next/link'
import { useEffect, useState } from 'react'
import ResumeContent from './resumeContent'
import styles from '@/styles/resume.module.css'
import ResumeIcon from '@mui/icons-material/AssignmentInd';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export default function SideBar() {
    const [open, setOpen] = useState('true');
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width <= 1024) {
            closeTab();
        }
    }, []);

    const closeTab = () => {
        const SideBar = document.getElementById("sidebar");
        const SideBarTab = document.getElementById("sidebar-tab");
        const ResumeContent = document.getElementById("resumeContent");

        if (open == 'true') {
            setOpen('false')
            SideBar.style.display = "none"
            SideBarTab.style.borderBottomRightRadius = "1rem"
            SideBarTab.style.borderTopRightRadius = "1rem"
            if (width >= 960)
                ResumeContent.style.width = "calc(100% - 9rem)"
        } else {
            setOpen('true')
            SideBar.style.display = "block"
            SideBarTab.style.borderBottomRightRadius = "0"
            SideBarTab.style.borderTopRightRadius = "0"
            if (width >= 960)
                ResumeContent.style.width = "calc(100% - 29rem)"
        }
    }

    return (
        <div className='select-none'>
            <div id="sidebar-tab" className='lg:fixed lg:min-h-[calc(100%-3rem)] m-7 lg:m-0 lg:ml-7 px-2 flex lg:flex-col flex-row items-center justify-between bg-dm-black rounded-l-2xl'>
                <div className='text-center xl:block hidden'>
                    <div id='menu-icon' className={`${styles.menuIcon} group hover:bg-white`} onClick={closeTab}>
                        <div id="bar1" className={`${styles.bar} group-hover:bg-eazy-main-100`}></div>
                        <div id="bar2" className={`${styles.bar} group-hover:bg-eazy-main-100`}></div>
                        <div id="bar3" className={`${styles.bar} group-hover:bg-eazy-main-100`}></div>
                    </div>
                    <a target="_blank" href="files/resume.pdf" className='px-2 py-4 hover:bg-white hover:text-eazy-main-100 text-white rounded-full'>
                        <ResumeIcon fontSize='large' />
                    </a>
                </div>
                <Link href="/" className='my-2 mx-8 lg:my-8 lg:mx-0 pb-1 px-[11.55px] text-5xl hover:bg-white hover:text-eazy-main-100 text-white rounded-full'>
                    &#8612;
                </Link>
                <a target="_blank" href="/files/resume.pdf" className='xl:hidden mx-8 my-0 lg:my-8 lg:mx-0 p-2 hover:bg-white hover:text-eazy-main-100 text-white rounded-full'>
                    <ResumeIcon fontSize='large' />
                </a>
            </div>

            <div id="sidebar" className='hidden xl:flex fixed min-h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] ml-24 flex-col text-center w-80 bg-dm-black justify-stretch rounded-r-2xl'>
                <div className='w-full align-top max-w-xl'>
                    <img className='w-fit px-20 py-6' src="/profile_pic.png" alt="Atinderpaul Kanwar" />
                </div>
                <h2 className='font-headings text-white text-3xl uppercase font-semibold'>Atinderpaul Kanwar</h2>
                <h3 className='font-headings text-white text-lg uppercase font-semibold p-3'>Software Developer</h3>

                <div className='pt-8'>
                    <ul className={styles.leftNav}>
                        <a href={"#objectives"}>
                            <li className={styles.nav}>Objectives</li>
                        </a>
                        <a href={"#work"}>
                            <li className={styles.nav}>Work Experience</li>
                        </a>
                        <a href={"#education"}>
                            <li className={styles.nav}>Education</li>
                        </a>
                        <a href={"#hobbies"}>
                            <li className={styles.nav}>Hobbies</li>
                        </a>
                    </ul>
                </div>
            </div>

            <ResumeContent />
        </div>
    )
}