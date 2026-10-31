import Link from "next/link";
import React from "react";

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <Link href={`/playlist/${playlist._id}`}>
      <div className=" cursor-pointer hover:scale-105 transition-all delay-75">
        <div className=" rounded-xl image-shadow overflow-hidden relative">
          <img
            src={playlist.image}
            className="w-full aspect-4/4 object-cover"
            alt=""
          />
          <div className=" absolute top-0 left-0 w-full h-full bg-black/10"></div>
        </div>
        <div className="p-1 pt-2">
          <h3 className="font-bold text-[15px]">{playlist.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;