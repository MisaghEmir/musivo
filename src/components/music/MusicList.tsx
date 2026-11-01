"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Music } from "@/config/data";
import MusicRow from "./MusicRow";
import { useDispatch } from "react-redux";
import MusicListRow from "./MusicListRow";
import { StarsIcon } from "lucide-react";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DrawerDemo({
  open,
  music,
  setOpen,
}: {
  open: boolean;
  music: Music | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }
  const dispatch = useDispatch();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-[#191919]">
        <div className="mx-auto w-full px-40 ">
          <DrawerHeader className="flex justify-between flex-row">
            <div>
              <StarsIcon />
            </div>
            <div>
              <DrawerTitle className="text-white">{music?.name}</DrawerTitle>
              <DrawerDescription>
                {music?.singer}
              </DrawerDescription>
            </div>
            <div>
              <StarsIcon />
            </div>
          </DrawerHeader>
          <div className="p-4 pb-0 w-full ">
            <div className="mt-0">
              <div className="grid grid-cols-12 text-amber-50 justify-between w-full">
                <div>
                  <b>Image</b>
                </div>
                <div className=" col-span-6">
                  <b>name</b>
                </div>
                <div className="col-span-2">
                  <b>album</b>
                </div>
                <div className=" col-span-2">
                  <b>Duration</b>
                </div>
                <div>
                  <b>Edit</b>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-5 h-52 overflow-y-scroll none-scroll">
                {Music.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch({
                        type: "add",
                        value: item,
                      });
                      dispatch({
                        type: "listadd",
                        value: Music,
                      });
                    }}
                  >
                    <MusicListRow music={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Done</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}