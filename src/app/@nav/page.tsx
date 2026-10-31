// import Address from "@/components/layouts/Address";
// import { CarouselHome } from "@/components/layouts/Slider";
// import Homefilter from "@/components/music/Homefilter";
// import MusicCard from "@/components/music/MusicCard";
// import PlaylistCard from "@/components/playlist/PlaylistCard";
// import { Music, PlaylistData } from "@/config/data";

import Address from "@/components/layouts/Address";

const fristMusic = {
  _id: "1",
  name: "Someone Like You",
  singer: "Adele",
  album: "string",
  image:
    "https://kurdsong.storage.iran.liara.space/cafemusic/images/1jijc25a.jpeg",
  audio:
    "https://kurdsong.storage.iran.liara.space/cafemusic/music/Adele-Someone-Like-You.mp3",
  view: 54,
};
const seccondMusic = {
  _id: "1",
  name: "Set Fire to the rain",
  singer: "Adele",
  album: "string",
  image:
    "https://kurdsong.storage.iran.liara.space/cafemusic/images/1l036ppd.jpeg",
  audio:
    "https://kurdsong.storage.iran.liara.space/cafemusic/music/Adele-Set-Fire-to-the-Rain.mp3",
  view: 54,
};
const threeMusic = {
  _id: "1",
  name: "Rolling in the Deep",
  singer: "Adele",
  album: "string",
  image:
    "https://kurdsong.storage.iran.liara.space/cafemusic/images/1l11k2ii.jpeg",
  audio:
    "https://kurdsong.storage.iran.liara.space/cafemusic/music/Adele-Rolling-in-the-Deep.mp3",
  view: 54,
};
const fourMusic = {
  _id: "1",
  name: "Million Years Ago",
  singer: "Adele",
  album: "string",
  image:
    "https://kurdsong.storage.iran.liara.space/cafemusic/images/1l24t5lv.jpeg",
  audio: "string",
  view: 54,
};
const fiveMusic = {
  _id: "1",
  name: "Million Years Ago",
  singer: "Adele",
  album: "string",
  image:
    "https://kurdsong.storage.iran.liara.space/cafemusic/images/Adele-Laurie-Blue-Adkins.png",
  audio: "string",
  view: 54,
};
const sixMusic = {
  _id: "1",
  name: "Million Years Ago",
  singer: "Adele",
  album: "string",
  image:
    "https://kurdsong.storage.iran.liara.space/cafemusic/images/Adele-music.png",
  audio: "string",
  view: 54,
};
export default function Home() {
  return (
    <div className="pt-5">
        <Address />
      <div>
        <h1 className="mt-16 text-4xl font-bold">Remmended</h1>
      </div>
      <div className="w-full flex justify-center px-0 mt-10">
        {/* <CarouselHome /> */}
      </div>
      <div className="grid grid-cols-4 mt-16 gap-8 px-3">
        {/* {PlaylistData.map((item, index) => (
          <div key={index}>
            <PlaylistCard playlist={item} />
          </div>
        ))} */}
      </div>
    </div>
  );
}