"use client";
import MusicRow from "@/components/music/MusicRow";
import { Music } from "@/config/data";
import { useDispatch } from "react-redux";

function Page() {
    const dispatch = useDispatch();
  return (
    <div>
      <div className="flex relative   justify-between items-center mt-10">
        <div className="top-0 left-0 absolute w-full h-full blur-3xl z-0 from-amber-800 to-white bg-linear-to-r backdrop:blur-2xl"></div>
        <div className="z-10">
          <img src="/image/1jijc25a.jpeg" className="w-44 rounded-xl" alt="" />
        </div>
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-12 justify-between w-full">
          <div>
            <small>Image</small>
          </div>
          <div className=" col-span-6">
            <small>name</small>
          </div>
          <div className="col-span-2">
            <small>album</small>
          </div>
          <div className=" col-span-2">
            <small>Duration</small>
          </div>
          <div>
            <small>Edit</small>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
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
              <MusicRow music={item} />
            </div>
          ))}
          {Music.map((item, index) => (
            <div key={index}>
              <MusicRow music={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;