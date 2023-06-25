'use client';

import { useState } from "react";

import Link from "next/link"
import CustomButton from "./CustomButton";
import AuthProviders from "./AuthProviders";
import { NavLinks } from "@/constants";

const Navbar = () => {
  const session = {};

  const [open, setOpen] = useState(false);

  const handleMenuPopUp = () => {

  }

  return (
    <header>
      <nav className="flex justify-between items-center w-[92%] m-auto">
        <div>
          <h1 className="m-5 font-bold text-[22px] cursor-pointer">Blogify</h1>
        </div>
        <div className="flex items-center gap-[4vw]">
          {NavLinks.map((link) => (
            <Link className="hover:text-primary xl:flex hidden" href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
          <CustomButton
            title="Get Started"
            containerStyles="hover:outline-[#f7a36c] outline outline-1 outline-primary xl:flex hidden"
            handleClick={handleMenuPopUp}
          />
        <div className="flexCenter gap-4">
          {session ? (
            <>
              <Link href='/create-blog'>
                Create Blog
              </Link>
              UserPhoto
            </>
          ) : (
            <AuthProviders />

          )}
        </div>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
