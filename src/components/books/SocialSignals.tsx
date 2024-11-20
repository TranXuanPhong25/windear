import { SocialSignal } from "@/types/Book";
import AvatarCircles from "../ui/avatar-circles";

export default function SocialSignals({data}:{data:SocialSignal[]}){
   if(!data||data.length===0) return null;
   return <div className="flex flex-wrap justify-center gap-10 mt-6">
      {
         data.map((signal,index)=>(
            <div key={index} className="flex items-center space-x-2">
               <AvatarCircles numPeople={signal.count} avatarUrls={signal.users.map(user=>user.node.imageUrl)}/>
               <span className="text-sm">{signal.name.replace("_"," ")}</span>
            </div>
         ))
      }
   </div>
}