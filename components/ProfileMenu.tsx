'use client';

import { ProfileMenuProps } from "@/types"
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";
import CustomButton from "./CustomButton";

const ProfileMenu = ({ session }: { session: ProfileMenuProps }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex-col relative" >

            <div className={`xl:hidden ${openModal ? 'fixed inset-0 bg-black bg-opacity-40 blur' : 'bg-opacity-0'}`} />

            <Menu as="div" className="relative inline-block text-left" onMouseLeave={() => setOpenModal(false)}>
                <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm text-white' onClick={() => setOpenModal(true)}>
                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            width={50}
                            height={50}
                            alt={session.user.name}
                            className="rounded-full outline-primary"
                        />
                    )}
                    <Image
                        src='/more.svg'
                        alt="more"
                        height={20}
                        width={20}
                        className="mt-4 ml-2"
                    />
                    {/* <CustomButton
                        type="button"
                        title="Sign Out"
                        containerStyles='hover:bg-[#de691b] bg-primary xl:flex hidden text-sm m-auto ml-6'
                        handleClick={() => signOut()}
                    /> */}
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
                    <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md bg-gradient-to-r from-transparent from-20% to-background shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {session?.user?.image && (
                                    <Image
                                        src={session.user.image}
                                        width={50}
                                        height={50}
                                        alt={session.user.name}
                                        className="flex w-[40%] items-center rounded-full m-auto my-5"
                                    />
                                )}
                            </Menu.Item>
                            <p className="flex justify-center font-semibold">{session?.user?.name}</p>
                            <hr className="h-px my-1 bg-gray-700 border-0" />
                            <Menu.Item>
                                {({ active }) => (

                                    <Link href='/user-profile' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center mt-2 w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        Profile
                                    </Link>
                                )}
                            </Menu.Item>
                            <hr className="h-px my-1 bg-gray-700 border-0" />
                            <Menu.Item>
                                {({ active }) => (

                                    <Link href='/home' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center mt-2 w-full items-center rounded-md px-2 py-2 text-sm xl:hidden`}>
                                        Home
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href='/about' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center w-full rounded-md px-2 py-2 text-sm xl:hidden`}>
                                        About
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href='/pricing' className={`${active ? 'bg-primary text-neutral' : 'text-white'
                                        } flex justify-center w-full rounded-md px-2 py-2 text-sm xl:hidden`}>
                                        Pricing
                                    </Link>
                                )}
                            </Menu.Item>
                            <hr className="h-px my-1 bg-gray-700 border-0 xl:hidden" />
                        </div>
                        <div className="px-2 py-2 flex flex-col">
                            <Link href='/create-blog'>
                                <CustomButton
                                    title="Create Blog"
                                    containerStyles='hover:outline-helper outline outline-1 text-sm outline-primary flexCenter m-auto px-10 xl:hidden'
                                />
                            </Link>

                            <Menu.Item>
                                <CustomButton
                                    title="Sign out"
                                    containerStyles='hover:bg-helper bg-primary text-sm mt-5 flex-auto shadow-2xl xl:mt-1'
                                    handleClick={() => signOut()}
                                />
                            </Menu.Item>

                        </div>

                    </Menu.Items>

                </Transition>
            </Menu>
        </div >
    )
}

export default ProfileMenu
