'use client';

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import SignInForm from "./SignInForm";
import CustomButton from "./CustomButton";



// interface ModalProps {
//     isOpen: boolean;
//     setIsOpen: (isOpen: boolean) => void;

// }

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [closeForm, setCloseForm] = useState(false);

    return (
        <>
            {isOpen ? (
                
                <div ref={overlay}>
                    <CustomButton
                    type="button"
                    title="Get Started"
                    containerStyles="hover:outline-helper outline outline-1 outline-primary"
                    handleClick={() => setIsOpen(true)}
                />
                    <div className='absolute inset-0 top-[25rem] -left-[13rem] right-[100%] m-auto flex items-center justify-center'>
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                                as='div'
                                className='fixed inset-0 overflow-y-auto z-50'
                                onClose={() => setIsOpen(false)}
                            >
                                <div className="fixed inset-0 overflow-y-auto">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed blur-3xl bg-black bg-opacity-25" />
                                    </Transition.Child>

                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <div className='bg-secondary rounded-2xl'>
                                                <SignInForm isOpen={isOpen} setIsOpen={setIsOpen} />
                                            </div>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </div>

            ) : (
                <CustomButton
                    type="button"
                    title="Get Started"
                    containerStyles="hover:outline-helper outline outline-1 outline-primary"
                    handleClick={() => setIsOpen(true)}
                />
            )}
        </>
    )
}

export default Modal
