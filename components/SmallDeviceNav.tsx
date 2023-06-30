'use client';

import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image';
import Link from 'next/link'
import { Fragment, useState } from 'react';
import AuthProviders from './AuthProviders';
import SignInModal from './SignInForm';
import CustomButton from './CustomButton';
import Modal from './Modal';

const SmallDeviceNav = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex-col relative" >

            <div className={` ${openModal ? 'fixed inset-0 bg-black bg-opacity-40 blur' : 'bg-opacity-0'}`} />

            <Menu as="div" className="relative inline-block text-left" onMouseLeave={() => setOpenModal(false)}>
                <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white' onClick={() => setOpenModal(true)}>

                    <Image
                        src='/burger.svg'
                        width={40}
                        height={40}
                        alt='Navbar'
                        className='xl:hidden flex'
                        onClick={() => setOpenModal(true)}
                    />
                </Menu.Button>

                <Transition
                    show={openModal}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="tranform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md bg-gradient-to-r from-transparent from-20% to-background shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">

                            <Menu.Item>
                                {({ active }) => (
                                    <Link href='/home' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center mt-2 w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        Home
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href='/about' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center w-full rounded-md px-2 py-2 text-sm`}>
                                        About
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href='/pricing' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center w-full rounded-md px-2 py-2 text-sm`}>
                                        Pricing
                                    </Link>
                                )}
                            </Menu.Item>
                            <hr className="h-px my-1 bg-gray-700 border-0" />
                        </div>
                        <div className="px-1 py-1 flexCenter">
                            <Menu.Item>
                                <div>
                                    {/* <Link href='/auth/signin'> */}
                                    {/* <CustomButton
                                            type='button'
                                            handleClick={() => setIsOpen(true)}
                                            title="Get Started"
                                            containerStyles="hover:outline-helper outline outline-1 outline-primary"
                                        /> */}
                                    {/* </Link> */}
                                        <Modal />
                                    {/* <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
                                </div>
                                {/* <AuthProviders /> */}
                            </Menu.Item>
                        </div>

                    </Menu.Items>

                </Transition>
            </Menu>
        </div >
    )
}

export default SmallDeviceNav
