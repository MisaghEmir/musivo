import React from "react";
import { BiMusic } from "react-icons/bi";
import MusicPlayer from "../music/MusicPlayer";
import { LuLibrary } from "react-icons/lu";
import { MdExplore } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import Link from "next/link";

const Sidebar = () => {
  const links = [
    { href: "/exploer", label: "Explore", icon: <MdExplore size={21} /> },
    { href: "/library", label: "Library", icon: <LuLibrary size={21} /> },
    { href: "/music", label: "Musics", icon: <BiMusic size={21} /> },
    { href: "/playlist", label: "Playlists", icon: <CgPlayList size={21} /> },
  ];

  return (
    <>
      <aside className="h-0 md:h-screen md:p-3 md:py-4 md:overflow-hidden md:flex md:flex-col">
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col flex-1 min-h-0">
          <h1 className="text-2xl font-bold pl-3">MUSIVO</h1>

          <nav className="flex flex-col gap-1 py-20 pr-4 font-bold max-h-[65vh] overflow-auto none-scroll">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="w-full text-left p-2 px-4 rounded-md hover:bg-zinc-800 cursor-pointer flex items-center gap-2 transition-all">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* تنها یک نمونه از پلیر */}
        <MusicPlayer />
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[110] h-[60px] bg-[#191919] border-t border-white/10">
        <div className="flex justify-around items-center h-full">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white"
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;