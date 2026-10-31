"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";

const HeaderMenu = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Prevent background scrolling
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-lg p-2 transition hover:bg-white/10 md:hidden"
        aria-label="Open menu"
      >
        <BiMenu size={25} />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[200] h-dvh w-full overflow-hidden bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      >
        {/* Menu Panel */}
        <aside
          dir="ltr"
          onClick={(e) => e.stopPropagation()}
          className={`fixed right-0 top-0 flex h-[calc(100dvh-3rem)] w-[280px] max-w-[85vw] flex-col border-l border-white/10 bg-[#181818] p-5 shadow-2xl transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <h2 className="text-xl font-bold">MUSIVO</h2>

            <button
              onClick={closeMenu}
              className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <BiX size={25} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold transition hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              href="/library"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold transition hover:bg-white/10"
            >
              Recently played
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default HeaderMenu;