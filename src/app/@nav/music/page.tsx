"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BiSearch, BiMusic, BiX } from "react-icons/bi";

import Address from "@/components/layouts/Address";
import MusicCard from "@/components/music/MusicCard";
import { Music } from "@/config/data";
import { ComboboxMusic } from "@/components/music/Combobox";

export default function MusicPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredMusic = useMemo(() => {
    let result = [...Music];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.singer.toLowerCase().includes(query) ||
          item.album.toLowerCase().includes(query),
      );
    }

    // Sorting
    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "most-viewed":
        result.sort((a, b) => b.view - a.view);
        break;

      case "least-viewed":
        result.sort((a, b) => a.view - b.view);
        break;
    }

    return result;
  }, [search, sortBy]);

  return (
    <main className="min-h-screen px-4 pt-5 pb-20 md:px-8">
      <Address />

      {/* Hero */}
      <section className="relative mt-12 mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#E60A54] via-[#76103D] to-[#180D1B] p-8 md:p-14">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-2 text-white/70">
            <BiMusic size={22} />
            <span className="text-xs font-bold tracking-[0.25em]">
              MELO​RA COLLECTION
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Explore Music
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 md:text-base">
            Discover your favorite tracks, explore new artists and find the
            perfect soundtrack for every moment.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
            <BiMusic size={20} />
            <span>{Music.length} Tracks Available</span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-5 -bottom-56 h-96 w-96 rounded-full border-[45px] border-white/[0.07]" />
      </section>

      {/* Page Heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            All Music
          </h2>
          <p className="mt-2 text-sm text-white/40">
            Browse and discover your favorite songs
          </p>
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-[#E60A54] transition hover:text-[#ff3978]"
        >
          Back to Home
        </Link>
      </div>

      {/* Search and Sort */}
      <section className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative flex-1">
          <BiSearch
            size={21}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search songs, artists or albums..."
            className="h-12 w-full rounded-xl border border-white/10 bg-[#181818] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#E60A54]/60"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
            >
              <BiX size={21} />
            </button>
          )}
        </div>

        <div className="w-full sm:w-56 h-full">
          <ComboboxMusic value={sortBy} onValueChange={setSortBy} />
        </div>
      </section>

      {/* Results */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredMusic.length}
          </span>{" "}
          of {Music.length} tracks
        </p>

        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-xs text-[#E60A54] hover:text-[#ff3978]"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Music Grid */}
      {filteredMusic.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredMusic.map((item) => (
            <MusicCard key={item._id} music={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-20 text-center">
          <BiSearch size={42} className="text-white/20" />

          <h3 className="mt-5 text-lg font-semibold text-white">
            No Music Found
          </h3>

          <p className="mt-2 text-sm text-white/40">
            Try searching with another song or artist name.
          </p>

          <button
            onClick={() => setSearch("")}
            className="mt-6 rounded-full bg-[#E60A54] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c90849]"
          >
            Show All Music
          </button>
        </div>
      )}
    </main>
  );
}