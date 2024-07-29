"use client"
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, CogIcon, TvIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { faQuestionCircle, faSearch, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';


import { Bebas_Neue, Anton } from 'next/font/google'
import logo from '../../../assets/img.webp'

type props = {
    title: string
}
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }
 
// If loading a variable font, you don't need to specify the font weight
const bebas_neue = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const anton = Anton({ weight: "400", subsets: ["latin"] })

export default function TopNav({title}:props) {

    const [active, setActive] = useState(1)
    
    return (
     <div>
        <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <p className={`${bebas_neue.className} text-2xl`}>{title}</p>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  
                  <a
                    href="#"
                    onClick={() => setActive(2)}
                    className={`inline-flex ${bebas_neue.className} items-center border-b-2 px-1 pt-1 text-lg font-medium ${active===2?"border-slate-300":"border-transparent text-black"} hover:border-b-4 hover:border-slate-300 hover:text-gray-700`}
                  >
                    Transactions Management
                  </a>
                  {/* <a
                    href="#"
                    onClick={() => setActive(3)}
                    className={`inline-flex ${bebas_neue.className} items-center border-b-2 px-1 pt-1 text-lg font-medium ${active===3?"border-slate-300":"border-transparent text-black"} hover:border-b-4 hover:border-slate-300 hover:text-gray-700`}
                  >
                    Float and Open Account Management
                  </a>
                  <a
                    href="#"
                    onClick={() => setActive(4)}
                    className={`inline-flex ${bebas_neue.className} items-center border-b-2 px-1 pt-1 text-lg font-medium ${active===4?"border-slate-300":"border-transparent text-black"} hover:border-b-4 hover:border-slate-300 hover:text-gray-700`}
                  >
                    Reports
                  </a> */}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* <button
                  type="button"
                  className="rounded-full bg-white p-1 text-black hover:bg-slate-100 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="rounded-full bg-white p-1 text-black hover:bg-slate-100 hover:text-gray-500 focus:outline-none">
                     <CogIcon className="h-6 w-6" aria-hidden="true"/>
                     
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', `block px-4 py-2 text-lg text-gray-700 ${bebas_neue.className}`)}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', `block px-4 py-2 text-lg text-gray-700 ${bebas_neue.className}`)}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/logout"
                            className={classNames(active ? 'bg-gray-100' : '', `block px-4 py-2 text-lg text-gray-700 ${bebas_neue.className}`)}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
            
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => setActive(2)}
                className={`block ${bebas_neue.className} border-l-4 py-2 pl-3 pr-4 text-base font-medium  ${active===2?'text-black border-slate-500 bg-slate-50':'text-gray-500 border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                Transactions Management
              </Disclosure.Button>
              {/* <Disclosure.Button
                as="a"
                href="#"
                onClick={() => setActive(3)}
                className={`block ${bebas_neue.className} border-l-4 py-2 pl-3 pr-4 text-base font-medium  ${active===3?'text-black border-slate-500 bg-slate-50':'text-gray-500 border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                Float and Open Account Management
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => setActive(4)}
                className={`block ${bebas_neue.className} border-l-4 py-2 pl-3 pr-4 text-base font-medium  ${active===4?'text-black border-slate-500 bg-slate-50':'text-gray-500 border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                Reports
              </Disclosure.Button> */}
            </div>
            <div className="border-t border-gray-200 pb-3 relative">
              <div className="flex justify-center items-center absolute right-0 mt-2 mr-5 z-40 hover:bg-slate-200 rounded-[50%] cursor-pointer p-2">
                <div className="">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className={`${bebas_neue.className} block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800`}
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className={`${bebas_neue.className} block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800`}
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/logout"
                  className={`${bebas_neue.className} block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800`}
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
     </div>
    );
  }
  