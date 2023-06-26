
import Link from "next/link"
import Image from "next/image";
import CustomButton from "./CustomButton";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";

import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import SmallDeviceNav from "./SmallDeviceNav";

const Navbar = async () => {
  const session = await getCurrentUser();


  return (
    <header >
      <nav className="flex justify-between items-center w-[92%] m-auto">
        <div>
          <h1 className="m-5 font-bold text-[22px] cursor-pointer">Blogify</h1>
        </div>
        <div className="flex items-center gap-[3vw]">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text} className="hover:text-primary xl:flex hidden">
              {link.text}
            </Link>
          ))}
          <div className="flexCenter gap-4 z-10">
            {session?.user ? (
              <>
                <Link href='/create-blog'>
                  <CustomButton
                    title="Create Blog"
                    containerStyles='hover:outline-[#f7a36c] outline outline-1 outline-primary xl:flex hidden'
                  />
                </Link>

                <ProfileMenu session={session} />

                <CustomButton
                  type="button"
                  title="Sign Out"
                  containerStyles='hover:bg-[#de691b] bg-primary xl:flex hidden text-sm'
                // handleClick={signOut}
                />

              </>
            ) : (
              <div className="flex">
                <SmallDeviceNav />
              <div className="xl:flex hidden">
                <AuthProviders />
              </div>
              </div>
            )}
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
