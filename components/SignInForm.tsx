'use client';

import { signIn } from "next-auth/react";
import { FormEventHandler, Fragment, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import SignUpForm from "./SignUpForm";

interface FormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}


const SignInForm = ({ isOpen, setIsOpen }: FormProps) => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Perform sign-in logic here

        signIn('credentials', {
            email: email,
            password: password,
        })
    };


    return (
        <>
            {openSignUp ? (
                <SignUpForm isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
                <div className="absolute w-[30rem] h-[35rem] -translate-x-1/2 -translate-y-1/2 p-6 bg-secondary rounded-2xl shadow-lg z-50 ">
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
                            <span className="text-primary font-medium underline cursor-pointer" onClick={() => setOpenSignUp(true)}>Sign up</span></p>
                    </div>

                    <div className="m-8">
                        <h2 className="font-bold text-[52px]  text-primary">Sign In</h2>
                        <p className="text-sm">Login with your email or google to continue with Blogify</p>
                    </div>

                    <form onSubmit={handleSignIn} className="flex flex-col gap-5 ">
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

        </>
    )
}

export default SignInForm