
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Address from "@/components/layouts/Address";
import Homefilter from "@/components/music/Homefilter";
import MusicCard from "@/components/music/MusicCard";
// import PlaylistCard from "@/components/playlist/PlaylistCard";
import { CarouselSize } from "@/components/music/Slide";

import {
  Music,
  PlaylistData,
  RecommendedMusic,
  TopMusic,
  LatestMusic,
  TrendingMusic,
  MostViewedMusic,
  FeaturedPlaylists,
  NewAlbums,
  RelaxingMusic,
  InstrumentalMusic,
  RomanticMusic,
  NostalgicMusic,
} from "@/config/data";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Sort music
  const sortedMusic = useMemo(() => {
    const result = [...Music];

    switch (sortBy) {
      case "az":
        return result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case "za":
        return result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );

      case "most-viewed":
        return result.sort((a, b) => b.view - a.view);

      case "least-viewed":
        return result.sort((a, b) => a.view - b.view);

      default:
        return result;
    }
  }, [sortBy]);

  // Sort playlists
  const sortedPlaylists = useMemo(() => {
    const result = [...PlaylistData];

    switch (sortBy) {
      case "az":
        return result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case "za":
        return result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );

      default:
        return result;
    }
  }, [sortBy]);

  // Dynamic sections
  const sections = [
    {
      title: "Latest Releases",
      subtitle: "Discover the newest music",
      href: "/music/latest",
      music: LatestMusic,
    },
    {
      title: "Recommended For You",
      subtitle: "Music selected for you",
      href: "/music/recommended",
      music: RecommendedMusic,
    },
    {
      title: "Top Music",
      subtitle: "The most popular tracks",
      href: "/music/top",
      music: TopMusic,
    },
    {
      title: "Trending Now",
      subtitle: "What everyone is listening to",
      href: "/music/trending",
      music: TrendingMusic,
    },
    {
      title: "Most Viewed",
      subtitle: "The most viewed tracks",
      href: "/music/most-viewed",
      music: MostViewedMusic,
    },
    {
      title: "Relaxing Music",
      subtitle: "Take a moment to relax",
      href: "/music/relaxing",
      music: RelaxingMusic,
    },
    {
      title: "Instrumental Music",
      subtitle: "Music without vocals",
      href: "/music/instrumental",
      music: InstrumentalMusic,
    },
    {
      title: "Romantic Music",
      subtitle: "Songs full of emotions",
      href: "/music/romantic",
      music: RomanticMusic,
    },
    {
      title: "Nostalgic Music",
      subtitle: "Back to beautiful memories",
      href: "/music/nostalgic",
      music: NostalgicMusic,
    },
  ];

  return (
    <main className="min-h-screen pt-5">
      <Address />

      {/* Hero Section */}
      <section className="mt-16 mb-16 px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E60A54] via-[#a20b49] to-[#240b24] p-8 md:p-14">
          <div className="relative z-10 max-w-xl">
            <span className="text-sm font-medium tracking-widest text-white/70">
              WELCOME TO MELORA
            </span>

            <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
              Feel Every Beat.
            </h1>

            <p className="mt-4 leading-7 text-white/75">
              Discover your favorite songs, explore new artists
              and enjoy the music you love.
            </p>

            <Link
              href="/music"
              className="mt-7 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-white/80"
            >
              Explore Music
            </Link>
          </div>

          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border-[50px] border-white/10" />
          <div className="pointer-events-none absolute -right-5 -bottom-48 h-96 w-96 rounded-full border-[50px] border-white/10" />
        </div>
      </section>

      {/* All Releases */}
      <section className="mb-20 px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">All Releases</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Explore all your favorite tracks and playlists
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Homefilter
            category={category}
            categoryHandle={setCategory}
            sortBy={sortBy}
            sortHandle={setSortBy}
          />
        </div>

        {/* Music */}
        {category !== "playlist" && (
          <div className="mb-10">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white/90">
                Music
              </h3>

              <span className="text-xs text-white/40">
                {sortedMusic.length} Tracks
              </span>
            </div>

            {sortedMusic.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {sortedMusic.map((item) => (
                  <MusicCard key={item._id} music={item} />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-muted-foreground">
                No music found.
              </p>
            )}
          </div>
        )}

        {/* Playlists */}
        {category !== "music" && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white/90">
                Playlists
              </h3>

              <span className="text-xs text-white/40">
                {sortedPlaylists.length} Playlists
              </span>
            </div>

            {/* {sortedPlaylists.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {sortedPlaylists.map((item) => (
                  <PlaylistCard
                    key={item._id}
                    playlist={item}
                  />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-muted-foreground">
                No playlists found.
              </p>
            )} */}
          </div>
        )}
      </section>

      {/* Dynamic Music Sections */}
      <div className="space-y-16 pb-20">
        {sections.map((section) => (
          <section key={section.href} className="space-y-5">
            <div className="flex items-end justify-between px-4 md:px-8">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {section.subtitle}
                </p>
              </div>

              <Link
                href={section.href}
                className="text-sm font-medium text-[#E60A54] transition hover:text-[#ff3978]"
              >
                View All
              </Link>
            </div>

            {section.music.length > 0 ? (
              <div className="px-4 md:px-8">
                <CarouselSize music={section.music} />
              </div>
            ) : (
              <p className="px-8 text-sm text-muted-foreground">
                No music available yet.
              </p>
            )}
          </section>
        ))}
      </div>

      {/* Featured Playlists */}
      <section className="mb-20 px-4 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Featured Playlists
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Playlists selected for you
            </p>
          </div>

          <Link
            href="/playlists/featured"
            className="text-sm font-medium text-[#E60A54] hover:text-[#ff3978]"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* {FeaturedPlaylists.map((item) => (
            <PlaylistCard key={item._id} playlist={item} />
          ))} */}
        </div>
      </section>

      {/* New Albums */}
      <section className="mb-20 px-4 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              New Albums
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Explore new music albums
            </p>
          </div>

          <Link
            href="/albums/new"
            className="text-sm font-medium text-[#E60A54] hover:text-[#ff3978]"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {NewAlbums.map((album) => (
            <div
              key={album._id}
              className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-3"
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={album.image}
                  alt={album.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className="mt-3 truncate font-semibold">
                {album.name}
              </h3>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {album.singer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}