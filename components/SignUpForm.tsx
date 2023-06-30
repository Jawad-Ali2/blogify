'use client'

import React, { FormEventHandler, useState } from 'react'
import SignInForm from './SignInForm'
import Image from 'next/image'

interface FormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SignUpForm = ({ isOpen, setIsOpen }: FormProps) => {

    const [openSignIn, setOpenSignIn] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Perform sign-in logic here


    };
    return (
        <div className='transition ease-in-out duration-150'>
            {openSignIn ? (
                <SignInForm isOpen={isOpen} setIsOpen={setIsOpen
                } />
            ) : (
                <div className="absolute w-[30rem] h-[38rem] -translate-x-1/2 -translate-y-1/2 p-6 bg-secondary rounded-2xl shadow-lg z-50 ">
                    <div className="flex justify-between">
                        <button
                            type='button'
                            className='z-10 rounded-full'
                            onClick={() => setIsOpen(false)}
                        >
                            <Image
                                src='/close.svg'
                                alt='close'
                                width={40}
                                height={40}
                                className='object-contain'
                            />
                        </button>
                        <p className="text-[14px] text-sm font-regular text-right mt-3">Not registered?&nbsp;
                            <span className="text-primary font-medium underline cursor-pointer" onClick={() => setOpenSignIn(true)}>Sign in</span></p>
                    </div>

                    <div className="m-8">
                        <h2 className="font-bold text-[52px]  text-primary">Sign Up</h2>
                        <p className="text-sm">Sign up with your email or google to continue with Blogify</p>
                    </div>

                    <form onSubmit={handleSignUp} className="flex flex-col gap-5 ">
                        <div className="">
                            <input
                                type="text"
                                name="text"
                                placeholder="Full Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 rounded outline-none"
                            />
                        </div>
                        <div className="">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded"
                            />
                        </div>

                        <div className="w-full bg-primary hover:bg-helper rounded-md">
                            <button type="submit" className="p-2 ">Login</button>
                        </div>
                        <div className="transition ease-in-out w-full bg-blue-500 rounded-md hover:bg-blue-700 duration-300">
                            <Image
                                src='/google.svg'
                                width={20}
                                height={20}
                                alt="google"
                                className="icon shadow-lg"
                            />
                            <button type="submit" className="p-2">Sign In with Google</button>
                        </div>
                    </form>
                </div>

            )}

        </div>
    )
}

export default SignUpForm
