import { PopoverGroup } from '@headlessui/react'
import ResumeIcon from '@mui/icons-material/AssignmentInd';
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-[88px] z-40 bg-white/5 backdrop-blur-md w-[95vw] rounded-b-[32px]" />
      <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 bg-white rounded-full w-[95vw]`}>
        <header className="text-dm-black w-full">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link href={"/"}>
                <img className="h-10 w-auto" src="logo.PNG" alt="" />
              </Link>
            </div>

            <div className="flex lg:hidden">
              <a href="/resume" className='xl:hidden mx-4 my-0 p-2 hover:bg-gray-300 rounded-full'>
                <ResumeIcon fontSize='large' />
              </a>
            </div>

            {/* Right Icons */}
            <PopoverGroup className="hidden lg:flex lg:gap-x-14 font-semibold leading-6 text-lg">
              <div className="relative transition-none mt-0.5">
                <a href={"/#aboutCard"} className='group transition duration-300'>
                  About
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-eazy-main-100"></span>
                </a>
              </div>
              <div className="relative transition-none mt-0.5">
                <a href={"#projectsCard"} className='group transition duration-300'>
                  Projects
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-eazy-main-100"></span>
                </a>
              </div>
              <div className="relative transition-none mt-0.5">
                <a href={"#contactCard"} className='group transition duration-300'>
                  Contact
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-eazy-main-100"></span>
                </a>
              </div>
              <div className="relative transition-none">
                <a href="/resume" className='hover:text-indigo-500 text-eazy-main-100 rounded-full'>
                  <ResumeIcon />
                </a>
              </div>
            </PopoverGroup>
          </nav >
        </header >
      </div>
    </>
  )
}