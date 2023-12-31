"use client";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#96B6C5] text-[#F1F0E8]">
      <div>
        <h1 className="md:text-3xl text-2xl">Blog App</h1>
      </div>

      {/* menu */}
      <ul className=" md:flex hidden gap-3 text-2xl cursor-pointer">
        <li>
          Home
        </li>
        <li>
          SignIn
        </li>
      </ul>

      {/* Hamberger */}
      <div onClick={handleClick} className=" md:hidden z-10">
        {!nav ? <MenuIcon className="text-3xl" /> : <CloseIcon className="text-3xl" />}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#96B6C5] flex flex-col justify-center items-center"
        }
      >
        <li className=" py-6 text-4xl">
          Home
        </li>
        <li className=" py-6 text-4xl">
          SignIn
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
