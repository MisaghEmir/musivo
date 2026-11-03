"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import MusicListRow from "./MusicListRow";

import {
  StarsIcon,
  Music2,
  ListMusic,
  X,
} from "lucide-react";

import { Music } from "@/config/data";

type MusicType = (typeof Music)[number];

type RootState = {
  listReducer: {
    state: MusicType[] | null;
  };
};

export function DrawerDemo({
  open,
  music,
  setOpen,
}: {
  open: boolean;
  music: MusicType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  const queueData = useSelector(
    (state: RootState) => state.listReducer?.state
  );

  const musicQueue: MusicType[] = Array.isArray(queueData)
    ? queueData
    : [];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="!z-[2147483647] bg-[#191919] border-white/10 text-white max-h-[90vh] outline-none">
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 md:px-10">
          <DrawerHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#E60A54]/10 border border-[#E60A54]/20 flex items-center justify-center shrink-0">
                  <Music2 size={25} className="text-[#E60A54]" />
                </div>

                <div className="min-w-0 text-left">
                  <DrawerTitle className="text-white text-base sm:text-xl font-bold truncate">
                    {music?.name || "Music Player"}
                  </DrawerTitle>

                  <DrawerDescription className="text-white/50 mt-1 truncate">
                    {music?.singer || "Select a song"}
                  </DrawerDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2">
                  <StarsIcon size={16} className="text-[#E60A54]" />
                  <span className="text-xs text-white/70">
                    Your Music Queue
                  </span>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ListMusic size={18} className="text-[#E60A54]" />
                <span className="font-semibold text-sm">
                  Playing Queue
                </span>
              </div>

              <span className="text-xs text-white/40">
                {musicQueue.length} Tracks
              </span>
            </div>
          </DrawerHeader>

          <div className="hidden sm:grid grid-cols-12 items-center text-xs text-white/40 px-3 py-3 border-b border-white/10">
            <div className="col-span-1">Image</div>
            <div className="col-span-5">Name</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-1 text-right">Edit</div>
          </div>

          <div className="px-2 sm:px-3 py-3">
            <div className="flex flex-col gap-2 max-h-[45vh] overflow-y-auto none-scroll">
              {musicQueue.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    dispatch({
                      type: "add",
                      value: item,
                    });
                  }}
                  className={`cursor-pointer rounded-xl transition-all hover:bg-white/5 ${
                    music?._id === item._id
                      ? "bg-[#E60A54]/10 border border-[#E60A54]/20"
                      : "border border-transparent"
                  }`}
                >
                  <MusicListRow music={item} />
                </div>
              ))}

              {musicQueue.length === 0 && (
                <div className="text-center py-10 text-white/40">
                  <ListMusic size={35} className="mx-auto mb-3" />
                  No music in queue.
                </div>
              )}
            </div>
          </div>

          <DrawerFooter className="px-3 sm:px-6 pt-2 pb-4">
            <DrawerClose>
              <Button
                variant="outline"
                className="w-full sm:w-auto sm:self-end bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
              >
                Done
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}