
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  Clock3,
  ListMusic,
  Play,
  Shuffle,
} from "lucide-react";

import {
  Music,
  PlaylistData,
} from "@/config/data";

import MusicRow from "@/components/music/MusicRow";

function Page() {
  const params = useParams();
  const dispatch = useDispatch();

  const playlist = PlaylistData.find(
    (item) => item._id === String(params.id)
  );

  const playlistMusics = playlist
    ? playlist.musics
        .map((musicId) =>
          Music.find((music) => music._id === musicId)
        )
        .filter((music) => music !== undefined)
    : [];

  // Play selected music with this playlist's queue
  const playMusic = (index: number, queue = playlistMusics) => {
    const selectedMusic = queue[index];

    if (!selectedMusic) return;

    // First update queue
    dispatch({
      type: "listadd",
      value: queue,
    });

    // Then play selected music
    dispatch({
      type: "add",
      value: selectedMusic,
    });
  };

  // Play all playlist songs
  const playAll = () => {
    if (!playlistMusics.length) return;

    playMusic(0);
  };

  // Shuffle playlist
  const shuffleMusic = () => {
    if (!playlistMusics.length) return;

    const shuffled = [...playlistMusics];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }

    playMusic(0, shuffled);
  };

  if (!playlist) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <ListMusic size={55} className="text-white/30" />

        <h1 className="text-xl font-bold mt-5">
          Playlist Not Found
        </h1>

        <p className="text-white/50 text-sm mt-2">
          This playlist does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 px-5 py-2 rounded-full bg-[#E60A54] text-sm"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="pb-28">
      {/* Playlist Header */}
      <section className="relative mt-6 sm:mt-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E60A54]/20 via-[#252525] to-[#191919]" />

        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#E60A54]/20 blur-[110px] rounded-full" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 p-5 sm:p-8">
          <Image
            src={playlist.image}
            width={240}
            height={240}
            priority
            alt={playlist.name}
            className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-xl shadow-2xl"
          />

          <div className="min-w-0 text-center sm:text-left">
            <span className="text-xs uppercase tracking-[3px] text-white/50">
              Playlist
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-3">
              {playlist.name}
            </h1>

            <p className="text-sm text-white/50 mt-4">
              MUSIVO
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-sm text-white/60">
              <span>{playlistMusics.length} Songs</span>
              <span>•</span>
              <span>{playlist.musics.length} Tracks</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-6">
              <button
                onClick={playAll}
                className="flex items-center gap-2 bg-[#E60A54] hover:bg-[#c90849] transition px-6 py-3 rounded-full font-semibold text-sm"
              >
                <Play size={18} fill="currentColor" />
                Play All
              </button>

              <button
                onClick={shuffleMusic}
                title="Shuffle"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Shuffle size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Songs */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">
              Songs
            </h2>

            <p className="text-sm text-white/40 mt-1">
              Music in this playlist
            </p>
          </div>

          <div className="flex items-center gap-2 text-white/40 text-sm">
            <ListMusic size={17} />
            {playlistMusics.length} Tracks
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-3 px-4 pb-3 border-b border-white/10 text-xs text-white/40">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-3">Album</div>
          <div className="col-span-2 flex items-center gap-2">
            <Clock3 size={14} />
            Duration
          </div>
          <div className="col-span-1 text-right">
            Edit
          </div>
        </div>

        {/* Playlist Music */}
        <div className="mt-4 flex flex-col gap-2">
          {playlistMusics.map((music, index) => (
            <div
              key={music._id}
              onClick={() => playMusic(index)}
              className="cursor-pointer rounded-xl hover:bg-white/5 transition"
            >
              <MusicRow music={music} />
            </div>
          ))}
        </div>

        {playlistMusics.length === 0 && (
          <div className="py-20 flex flex-col items-center text-white/40">
            <ListMusic size={45} />

            <p className="mt-4">
              No songs in this playlist.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Page;