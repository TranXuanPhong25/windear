import { useParams } from "react-router-dom";

export default function BrowseTag(){
   const params = useParams();
   console.log(params);
   return (
      <div>
         <h1>
            Top books has 
         </h1>
      </div>
   )
}