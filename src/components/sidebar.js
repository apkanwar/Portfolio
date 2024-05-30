import Link from 'next/link'
import { useState } from 'react'
import ResumeContent from './resumeContent'
import styles from '@/styles/resume.module.css'

export default function SideBar() {
    const [open, setOpen] = useState('true')

    const closeTab = () => {
        const SideBar = document.getElementById("sidebar");
        const SideBarTab = document.getElementById("sidebar-tab");
        const ResumeContent = document.getElementById("resumeContent");

        if (open == 'true') {
            setOpen('false')
            SideBar.style.display = "none"
            SideBarTab.style.borderBottomRightRadius = "1rem"
            SideBarTab.style.borderTopRightRadius = "1rem"
            ResumeContent.style.width = "calc(100% - 9rem)"
        } else {
            setOpen('true')
            SideBar.style.display = "block"
            SideBarTab.style.borderBottomRightRadius = "0"
            SideBarTab.style.borderTopRightRadius = "0"
            ResumeContent.style.width = "calc(100% - 29rem)"
        }
    }

    return (
        <div>
            <div id="sidebar-tab" className='fixed min-h-[calc(100%-3rem)] ml-7 px-2 flex flex-col items-center justify-between bg-dm-black rounded-l-2xl'>
                <div id='menu-icon' className={styles.menuIcon} onClick={closeTab}>
                    <div id="bar1" className={styles.bar}></div>
                    <div id="bar2" className={styles.bar}></div>
                    <div id="bar3" className={styles.bar}></div>
                </div>
                <Link href="/" className='my-8 pb-1 px-[11.55px] text-5xl hover:bg-white hover:text-eazy-main-100 text-white rounded-full'>
                    &#8612;
                </Link>
            </div>

            <div id="sidebar" className='fixed min-h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] ml-24 flex flex-col text-center w-80 bg-dm-black justify-stretch rounded-r-2xl'>
                <div className='w-full align-top max-w-xl'>
                    <img className='w-fit px-20 py-6' src="/profile_pic.png" alt="Atinderpaul Kanwar" />
                </div>
                <h2 className='font-headings text-white text-3xl uppercase font-semibold'>Atinderpaul Kanwar</h2>
                <h3 className='font-headings text-white text-lg uppercase font-semibold p-3'>Software Developer</h3>

                <div className='pt-8'>
                    <ul className={styles.leftNav}>
                        <Link href={"#objectives"}>
                            <li className={styles.nav}>Objectives</li>
                        </Link>
                        <Link href={"#work"}>
                            <li className={styles.nav}>Work Experience</li>
                        </Link>
                        <Link href={"#education"}>
                            <li className={styles.nav}>Education</li>
                        </Link>
                        <Link href={"#skills"}>
                            <li className={styles.nav}>Skills</li>
                        </Link>
                    </ul>
                </div>
            </div>

            <ResumeContent />
        </div>
    )
}