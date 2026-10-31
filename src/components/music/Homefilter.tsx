
"use client";

import React, { SetStateAction } from "react";
import {
  BiMusic,
  BiGridAlt,
  BiSlider,
  BiListMinus,
} from "react-icons/bi";
import { ComboboxMusic } from "./Combobox";

interface HomefilterProps {
  category: string;
  categoryHandle: React.Dispatch<SetStateAction<string>>;
  sortBy: string;
  sortHandle: (value: string) => void;
}

const filters = [
  { label: "All", value: "all", icon: BiGridAlt },
  { label: "Music", value: "music", icon: BiMusic },
  { label: "Playlists", value: "playlist", icon: BiListMinus },
];

const Homefilter = ({
  category,
  categoryHandle,
  sortBy,
  sortHandle,
}: HomefilterProps) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-white/50">
          <BiSlider size={20} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Filters
          </span>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <ComboboxMusic value={sortBy} onValueChange={sortHandle} />
      </div>

      <div className="flex w-fit items-center gap-1 rounded-2xl border border-white/[0.08] bg-[#181818] p-1">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const active = category === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => categoryHandle(filter.value)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                active
                  ? "bg-[#E60A54] text-white shadow-[0_4px_18px_rgba(230,10,84,0.25)]"
                  : "text-white/50 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon size={17} />
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Homefilter;