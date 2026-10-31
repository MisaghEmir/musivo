import React from "react";
import { BiHome, BiMusic } from "react-icons/bi";
// import MusicPlayer from "../music/MusicPlayer";
import { LuLibrary } from "react-icons/lu";
import { MdExplore } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="p-3 py-4 h-screen overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold pl-3">CAFEMUSICS</h1>
      </div>
      <div className="flex flex-col justify-between h-[90vh] ">
        <div className="flex flex-col gap-1 py-20 pr-4 font-bold scroll-auto max-h-[65vh] none-scroll overflow-auto">
          <Link href={"/exploer"}>
            <button className="w-full text-left p-2 px-4 rounded-md hover:bg-zinc-800 cursor-pointer flex items-center gap-2 transition-all delay-75">
              <i>
                <MdExplore />
              </i>
              Exploer
            </button>
          </Link>
          <Link href={"/library"}>
            <button className="w-full text-left p-2 px-4 rounded-md hover:bg-zinc-800 cursor-pointer flex items-center gap-2 transition-all delay-75">
              <i>
                <LuLibrary />
              </i>
              Library
            </button>
          </Link>
           <Link href={"/music"}>
          <button className="w-full text-left p-2 px-4 rounded-md hover:bg-zinc-800 cursor-pointer flex items-center gap-2 transition-all delay-75">
            <i>
              <BiMusic />
            </i>
            Musics
          </button>
           </Link>
          <button className="w-full text-left p-2 px-4 rounded-md hover:bg-zinc-800 cursor-pointer flex items-center gap-2 transition-all delay-75">
            <i>
              <CgPlayList />
            </i>
            Playlists
          </button>
        </div>
        <div className="flex-1 items-center flex flex-col justify-end">
          {/* <MusicPlayer /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;