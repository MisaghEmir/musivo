"use client";

import { useDispatch } from "react-redux";
import { Music } from "@/config/data";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const MusicCard = ({ music }: { music: Music }) => {
  const dispatch = useDispatch();

  const playMusic = () => {
    dispatch({
      type: "add",
      value: music,
    });

    dispatch({
      type: "listadd",
      value: Music,
    });
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={playMusic}
              className="cursor-pointer hover:scale-105 transition-all delay-75"
            >
              <div className="rounded-xl image-shadow overflow-hidden relative">
                <img
                  src={music.image}
                  className="w-full aspect-square object-cover"
                  alt={music.name}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-black/10" />
              </div>

              <div className="p-1 pt-2">
                <h3 className="font-bold text-[15px] text-left">{music.name}</h3>

                <p className="text-sm text-white/70 text-left">{music.singer}</p>
              </div>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <small>Right-click for music options.</small>
          </TooltipContent>
        </Tooltip>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56 bg-[#191919] border-white/10 text-white">
        <ContextMenuLabel className="text-white/50 text-xs truncate text-left bg-amber-600">
          {music.name}
        </ContextMenuLabel>

        <ContextMenuSeparator className="bg-white/10" />

        <ContextMenuItem
          onSelect={playMusic}
          className="cursor-pointer focus:bg-[#E60A54] focus:text-white"
        >
          <span className="mr-2">▶</span>
          Play Now
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => {
            dispatch({
              type: "listadd",
              value: Music,
            });
          }}
          className="cursor-pointer focus:bg-[#E60A54] focus:text-white"
        >
          <span className="mr-2">♫</span>
          Add to Queue
        </ContextMenuItem>

        <ContextMenuSeparator className="bg-white/10" />

        <ContextMenuItem
          onSelect={() => copyText(music.name)}
          className="cursor-pointer focus:bg-[#E60A54] focus:text-white"
        >
          Copy Song Name
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => copyText(music.singer)}
          className="cursor-pointer focus:bg-[#E60A54] focus:text-white"
        >
          Copy Artist Name
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => copyText(music.audio)}
          className="cursor-pointer focus:bg-[#E60A54] focus:text-white"
        >
          Copy Audio Link
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MusicCard