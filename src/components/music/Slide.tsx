import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MusicCard from "./MusicCard";

export function CarouselSize({ music }: { music: Music[] }) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full gap-8 "
    >
      <CarouselContent className="gap-4 py-5">
        {music.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/5 gap-8">
            <MusicCard music={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
