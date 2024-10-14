import { useParams } from "react-router-dom";

export default function BookShow() {
   const params = useParams();
   const NONDIGIT_REGEX = /\D/g;
   if(NONDIGIT_REGEX.test(params.bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   return (
      <div>
         <h1 className="dark:text-white text-black">{params.bookId}</h1>
      </div>
   )
}