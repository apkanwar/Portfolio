import { useState } from 'react'
import { Dialog, PopoverGroup, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='bg-dm-black pt-4 transition-none'>
      <header className="bg-white text-dm-black rounded-full w-[95vw] m-auto">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href={"/"}>
              <img className="h-10 w-auto" src="logo.PNG" alt="" />
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Middle Icons */}
          <PopoverGroup className="hidden lg:flex lg:gap-x-14 font-semibold leading-6 text-lg">
            <div className="relative transition-none">
              <a href="/#aboutCard" >
                About
              </a>
            </div>
            <div className="relative transition-none">
              <Link href={"/resume"}>
                Resume
              </Link>
            </div>
            <div className="relative transition-none">
              <a href={"#contactCard"}>
                Contact
              </a>
            </div>
          </PopoverGroup>

          {/* Right Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Popover className="relative font-semibold leading-6 text-lg">
              <PopoverButton className="transition-none px-6 py-3 transition ease-in duration-200 
              rounded-full hover:bg-gray-300 text-dm-black">
                Projects
              </PopoverButton>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  anchor="bottom"
                  className="divide-y divide-dm-black/50 rounded-xl bg-white/90 text-sm/6 [--anchor-gap:24px]"
                >
                  <div className="p-3">
                    <div className="block rounded-lg py-2 px-3 transition hover:bg-white/5">
                      <Link href={"/"}>
                        <p className="font-semibold text-dm-black">Project 1</p>
                        <p className="text-dm-black/50">Measure actions your users take</p>
                      </Link>
                    </div>

                    <div className="block rounded-lg py-2 px-3 transition hover:bg-white/5">
                      <Link href={"/"}>
                        <p className="font-semibold text-dm-black">Project 2</p>
                        <p className="text-dm-black/50">Start integrating products and tools</p>
                      </Link>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
          </div>
        </nav >

        {/* Mobile Menu */}
        < Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen} >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="#">
                <img
                  className="h-8 w-auto"
                  src="/logo.PNG"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="my-6 divide-y divide-gray-500/10 text-base font-semibold leading-9">
                <div className="space-y-2 py-6">
                  <div className="relative transition-none">
                    <Link href={"/resume"}>
                      Resume
                    </Link>
                  </div>
                </div>
                <div className="py-6">
                  <div className="block rounded-lg py-2 transition hover:bg-white/5">
                    <Link href={"/"}>
                      <p className="font-semibold text-dm-black">Project 1</p>
                      <p className="text-dm-black/50">Measure actions your users take</p>
                    </Link>
                  </div>

                  <div className="block rounded-lg py-2 transition hover:bg-white/5">
                    <Link href={"/"}>
                      <p className="font-semibold text-dm-black">Project 2</p>
                      <p className="text-dm-black/50">Start integrating products and tools</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog >
      </header >
    </div>
  )
}