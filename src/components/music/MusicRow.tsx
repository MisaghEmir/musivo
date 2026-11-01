import React from "react";
import { BiEdit } from "react-icons/bi";

const MusicRow = ({ music }: { music: Music }) => {
  return (
    <div className="grid grid-cols-12 items-center cursor-pointer">
      <div>
        <img src={music.image} className="w-16 rounded-md object-cover aspect-4/4" alt="" />
      </div>
      <div className="col-span-6">
        <h3 className="font-bold text-[15px]">{music.name}</h3>
        <p className="text-sm text-white/70">{music.singer}</p>
      </div>
      <div className="col-span-2">Masi</div>
      <div className="col-span-2">3:54</div>
      <div>
        <BiEdit />
      </div>
    </div>
  );
};

export default MusicRow;