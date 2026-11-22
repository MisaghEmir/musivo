"use client";

import MusicRow from "@/components/music/MusicRow";
import { Music, PlaylistData } from "@/config/data";
import { useDispatch } from "react-redux";

type Props = {
  id: string;
};

export default function PlaylistPageClient({ id }: Props) {
  const dispatch = useDispatch();

  const playlist = PlaylistData.find(
    (item) => String(item._id) === String(id)
  );

  if (!playlist) {
    return (
      <div className="mt-10 text-center">
        Playlist not found!
      </div>
    );
  }

  const playlistMusics = playlist.musics
    .map((musicId) =>
      Music.find((music) => String(music._id) === String(musicId))
    )
    .filter((music) => music !== undefined);

  return (
    <div>
      {/* Playlist Header */}
      <div className="flex relative justify-between items-center mt-10">
        <div className="absolute top-0 left-0 w-full h-full blur-3xl z-0 bg-linear-to-r from-amber-800 to-white opacity-30"></div>

        <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
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

      {/* Songs Header */}
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

        {/* Playlist Music */}
        <div className="mt-5 flex flex-col gap-5">
          {playlistMusics.map((item, index) => (
            <div
              key={item._id ?? index}
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