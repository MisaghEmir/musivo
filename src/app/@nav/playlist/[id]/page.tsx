"use client";

import MusicRow from "@/components/music/MusicRow";
import { Music, PlaylistData } from "@/config/data";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();

  const playlist = PlaylistData.find(
    (item) => item._id === params.id
  );

  if (!playlist) {
    return <div className="mt-10">Playlist not found!</div>;
  }

  const playlistMusics = playlist.musics
    .map((musicId) => Music.find((music) => music._id === musicId))
    .filter((music) => music !== undefined);

  return (
    <div>
      {/* Playlist Header */}
      <div className="flex relative justify-between items-center mt-10">
        <div className="absolute top-0 left-0 w-full h-full blur-3xl z-0 bg-linear-to-r from-amber-800 to-white opacity-30"></div>

        <div className="z-10 flex items-center gap-5">
          <img
            src={playlist.image}
            className="w-44 aspect-square object-cover rounded-xl"
            alt={playlist.name}
          />

          <div>
            <small>Playlist</small>
            <h1 className="text-3xl font-bold mt-2">
              {playlist.name}
            </h1>
            <p className="text-gray-400 mt-2">
              {playlistMusics.length} Songs
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Songs */}
      <div className="mt-20">
        <div className="grid grid-cols-12 items-center w-full text-gray-400">
          <div>
            <small>Image</small>
          </div>

          <div className="col-span-6">
            <small>Name</small>
          </div>

       

           <div className="col-span-4 text-right">
            <small>Duration</small>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {playlistMusics.map((item, index) => (
            <div
              key={item._id}
              onClick={() => {
                dispatch({
                  type: "listadd",
                  value: playlistMusics,
                });

                dispatch({
                  type: "add",
                  value: item,
                });
              }}
            >
              <MusicRow music={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}