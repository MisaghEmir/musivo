
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BiNotification,
  BiSearch,
  BiSun,
  BiX,
  BiMusic,
} from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

import { Music } from "@/config/data";
import AuthModal from "../auth/AuthModal";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    const query = search.toLowerCase().trim();

    return Music.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.singer.toLowerCase().includes(query) ||
        item.album.toLowerCase().includes(query)
    ).slice(0, 6);
  }, [search]);

  return (
    <>
      <header className="flex items-center justify-between h-full md:pr-5 px-5 bg-black/10 backdrop-blur-2xl">

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-20 items-center">
          <ul className="flex gap-7 items-center text-sm font-bold">
            <Link href="/">
              <li className="cursor-pointer">Home</li>
            </Link>

            <Link href="/library">
              <li className="cursor-pointer">Recently played</li>
            </Link>
          </ul>

          <button
            onClick={() => setSearchOpen(true)}
            className="bg-black/80 rounded-2xl flex items-center gap-4 pr-4"
          >
            <span className="p-2 px-4 text-sm text-white/40">
              Search music and singer...
            </span>
            <BiSearch />
          </button>
        </nav>

        {/* Mobile Left Side: Menu + Logo */}
        <div className="md:hidden flex items-center gap-3">
          <HeaderMenu />

          <h1 className="text-2xl font-bold">
            MUSIVO
          </h1>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden">
          <button onClick={() => setSearchOpen(true)}>
            <BiSearch size={22} />
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex justify-between items-center gap-7 pr-5">
          <i>
            <BiSun size={20} />
          </i>

          <i>
            <BiNotification size={20} />
          </i>

          <button
            onClick={() => setAuthOpen(true)}
            className="flex items-center gap-2 ml-5 font-bold hover:bg-zinc-800 cursor-pointer p-1 rounded-md px-3"
          >
            Sign in
            <BsPerson />
          </button>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-4 border-b border-white/10 px-5">
              <BiSearch
                size={23}
                className="text-[#E60A54]"
              />

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search music, artists or albums..."
                className="h-16 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />

              <button
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
                className="text-white/50 transition hover:text-white"
              >
                <BiX size={25} />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-[55vh] overflow-y-auto p-4">
              {!search.trim() ? (
                <p className="py-10 text-center text-sm text-white/40">
                  Start typing to search your music...
                </p>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {searchResults.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/[0.06]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {item.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/40">
                          {item.singer} · {item.album}
                        </p>
                      </div>

                      <BiMusic
                        size={20}
                        className="text-[#E60A54]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-10 text-center text-sm text-white/40">
                  No results found.
                </p>
              )}
            </div>

            {/* Search Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
              <span className="text-xs text-white/30">
                Search Melora Collection
              </span>

              <Link
                href="/music"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-semibold text-[#E60A54] hover:text-[#ff3978]"
              >
                Browse all music
              </Link>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
};

export default Header;