"use client";

import Address from "@/components/layouts/Address";
import PlaylistCard from "@/components/playlist/PlaylistCard";
import { BiLibrary, BiHeart } from "react-icons/bi";

const list = [
  {
    _id: "1",
    name: "Favorite",
    image: "/image/cute-pink-heart-aesthetic-wallpapers-for-phone-minimal-line-art-heart.jpg",
    musics: ["sada"],
  },
  {
    _id: "2",
    name: "Recently Played",
    image: "/image/photo-1518281361980-b26bfd556770.avif",
    musics: ["sada"],
  },
  {
    _id: "3",
    name: "My Playlist",
    image: "/image/31JSk-BC-3L._AC_UF894,1000_QL80_.jpg",
    musics: ["sada"],
  },
];

export default function LibraryPage() {
  return (
    <main className="min-h-screen px-4 pt-5 pb-20 md:px-8">
      <Address />

      {/* Hero */}
      <section className="relative mt-12 mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#E60A54] via-[#76103D] to-[#180D1B] p-8 md:p-14">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-2 text-white/70">
            <BiLibrary size={23} />
            <span className="text-xs font-bold tracking-[0.25em]">
              YOUR PERSONAL SPACE
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Your Library
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 md:text-base">
            All your favorite music collections in one place.
            Keep your favorite tracks and playlists close to you.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
            <BiHeart size={20} />
            <span>{list.length} Collections</span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-5 -bottom-56 h-96 w-96 rounded-full border-[45px] border-white/[0.07]" />
      </section>

      {/* Collections */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          My Collections
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Your saved playlists and recently played music
        </p>
      </div>

      <div className="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
        {list.map((item) => (
          <PlaylistCard key={item._id} playlist={item} />
        ))}
      </div>
    </main>
  );
}