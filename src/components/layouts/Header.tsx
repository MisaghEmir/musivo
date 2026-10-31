import Link from "next/link";
import React from "react";
import { BiNotification, BiSearch, BiSun } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-full md:pr-5 px-5 bg-black/10 backdrop-blur-2xl">
      <nav className="md:flex hidden gap-20 items-center">
        <ul className="md:flex gap-7 items-center text-sm font-bold hidden">
          <Link href={"/"}>
            <li className=" cursor-pointer">Home</li>
          </Link>
          <li className=" cursor-pointer">Recently played</li>
        </ul>
        <div>
          <div className="bg-black/80 rounded-2xl md:flex hidden items-center gap-4 pr-4">
            <input
              type="text"
              className="p-2 outline-none px-4 text-sm"
              placeholder="Search music and singer..."
            />
            <i>
              <BiSearch />
            </i>
          </div>
        </div>
      </nav>
      <div className="md:hidden">left</div>
      <div className="md:hidden">
        <h1 className="text-2xl font-bold pl-3">CAFEMUSICS</h1>
      </div>
      <div className="md:flex hidden justify-between items-center gap-7 pr-5">
        <i>
          <BiSun size={20} />
        </i>
        <i>
          <BiNotification size={20} />
        </i>
        <button className="flex items-center gap-2 ml-5 font-bold hover:bg-zinc-800 cursor-pointer p-1 rounded-md px-3">
          Sign in{" "}
          <i>
            <BsPerson />
          </i>
        </button>
      </div>
      <div className="md:hidden">right</div>
    </header>
  );
};

export default Header;