
"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  home: "HOME",
  explore: "EXPLORE",
  music: "MUSIC",
  playlists: "PLAYLISTS",
  artists: "ARTISTS",
  albums: "ALBUMS",
  latest: "LATEST",
  trending: "TRENDING",
  "most-viewed": "MOST VIEWED",
  recommended: "RECOMMENDED",
  top: "TOP MUSIC",
};

const Address = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { name: "HOME", href: "/" },
    ...segments.map((segment, index) => ({
      name:
        pageNames[segment] ||
        decodeURIComponent(segment).replace(/-/g, " ").toUpperCase(),
      href: "/" + segments.slice(0, index + 1).join("/"),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-3">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={item.href}>
            {index > 0 && <span className="text-xs text-white/40">{">"}</span>}

            {isLast ? (
              <span className="text-xs text-white/70 font-bold">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-xs text-white/70 font-bold hover:text-[#E60A54] transition-colors"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Address;
