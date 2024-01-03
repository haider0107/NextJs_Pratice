"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const { data } = useSession();

  // console.log(data?.user);

  return (
    <div className="fixed w-full h-[70px] flex justify-between items-center px-4 bg-[#96B6C5] text-[#F1F0E8]">
      <div>
        <h1 className="md:text-3xl text-2xl">
          <Link href="/">Blog App</Link>
        </h1>
      </div>

      {/* menu */}
      <ul className=" md:flex hidden gap-4 text-2xl cursor-pointer">
        <li className="list-none">
          <Link href="/blogs">Blogs</Link>
        </li>
        {data?.user?.id ? (
          <li className="list-none">
            <button onClick={() => signOut()}>SignOut</button>
          </li>
        ) : (
          <li className="list-none">
            <Link href="/sign-in">SignIn</Link>
          </li>
        )}
      </ul>

      {/* Hamberger */}
      <div onClick={handleClick} className=" md:hidden z-10">
        {!nav ? (
          <MenuIcon className="text-3xl" />
        ) : (
          <CloseIcon className="text-3xl" />
        )}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#96B6C5] flex flex-col justify-center items-center z-9"
        }
      >
        <li className=" py-6 text-4xl list-none">
          <Link href="/blogs">Blogs</Link>
        </li>
        {data?.user?.id ? (
          <li className="py-6 text-4xl list-none">
            <button onClick={() => signOut()}>SignOut</button>
          </li>
        ) : (
          <li className="py-6 text-4xl list-none">
            <Link href="/sign-in">SignIn</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
