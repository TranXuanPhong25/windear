import { useParams } from "react-router-dom";
import InternalBook from "@/pages/books/InternalBook.tsx";
import ExternalBook from "@/pages/books/ExternalBook.tsx";

export default function BookShow() {
   const params = useParams();
   const bookId = params.bookId;
   const NONDIGIT_REGEX = /\D/g;

   if (NONDIGIT_REGEX.test(bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   if (!bookId) return <h1>Invalid book ID</h1>

   if(Number(bookId)>=1000000000){
       return <InternalBook bookId={bookId}/>
   }else return <ExternalBook bookId={bookId}/>
}