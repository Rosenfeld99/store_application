import React from 'react'
import { FaBell } from 'react-icons/fa'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoSearchOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Nav = () => {
    const navigate = useNavigate()

    const handleSignOut = async (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
    return (
        <div className='flex items-center bg-[#131825] text-white w-full justify-end px-3 md:px-5 h-14 md:h-20 gap-3'>
            <div className=" flex justify-start w-full" >
                <form className=' w-full relative'>
                    <IoSearchOutline className=' absolute top-0 h-20 text-2xl left-0' />
                    <input type="search" placeholder='Search...' className=' w-full h-20 px-10 bg-transparent outline-none' />
                </form>
            </div>
            <div className=" text-xl hidden md:flex">
                <FaBell />
            </div>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className=" w-fit rounded-md pr-3 py-2 text-sm font-semibold hover:bg-[#ffffff1f]">
                    <div className='flex items-center gap-2 px-2 md:px-3'>
                        <img src="/banner_layout.png" className=' rounded-full h-5 w-5 ' alt="" />
                        <span className='flex items-center gap-1.5'>userName
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </div>
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Your profile
                                    </a>
                                )}
                            </Menu.Item>
                            <div >
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            // type="submit"
                                            onClick={handleSignOut}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Nav