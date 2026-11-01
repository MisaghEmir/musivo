import { BiEdit } from "react-icons/bi";
function MusicListRow({ music }: { music: Music }) {
  return (
     <div className="grid grid-cols-12 text-white items-center cursor-pointer">
       <div>
         <img src={music.image} className="w-16 rounded-md object-cover aspect-4/4" alt="" />
       </div>
       <div className="col-span-6">
         <h3 className="font-bold text-white text-[15px]">{music.name}</h3>
         <p className="text-sm text-white/70">{music.singer}</p>
       </div>
       <div className="col-span-2">Masi</div>
       <div className="col-span-2">3:54</div>
       <div>
         <BiEdit />
       </div>
     </div>
   );
}

export default MusicListRow