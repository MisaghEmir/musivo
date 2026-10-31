import Link from "next/link";

import Address from "@/components/layouts/Address";
import { CarouselSize } from "@/components/music/Slide"; 

import {
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

export default function Home() {
  return (
    <main className="min-h-screen pt-5">
      <Address />

      {/* Hero */}
      <section className="px-4 md:px-8 mt-16 mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E60A54] via-[#a20b49] to-[#240b24] p-8 md:p-14">
          <div className="relative z-10 max-w-xl">
            <span className="text-sm font-medium text-white/70">
              WELCOME TO MELORA 2.9
            </span>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white">
              Feel Every Beat.
            </h1>

            <p className="mt-4 text-white/75 leading-7">
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

      {/* Music Sections */}
      <div className="space-y-16 pb-20">
        {sections.map((section) => (
          <section key={section.href} className="space-y-5">
            <div className="flex items-end justify-between px-4 md:px-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
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
              <div className="px-4 md:px-8 w-full">
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
    </main>
  );
}