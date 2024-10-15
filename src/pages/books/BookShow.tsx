import StarRating from "@/components/books/StarRating";
import { useParams } from "react-router-dom";

export default function BookShow() {
   const params = useParams();
   const NONDIGIT_REGEX = /\D/g;
   if (NONDIGIT_REGEX.test(params.bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   return (
      <div className="w-full text-white flex ">
         {/* book header */}

         <div className="w-[280px] flex flex-col items-center">
            <img className="max-w-[200px]" src="https://upload.wikimedia.org/wikipedia/vi/e/eb/Dieu_ky_dieu_cua_tiem_tap_hoa_Namiya.jpg" alt="book cover" />
            <StarRating initialRating={5} ratable onChange={() => { }} />

         </div>
         <div>
            {/* book detail */}
            <div>
               <h1 className="font-semibold font-sans tracking-wide text-4xl">The Miracles of the Namiya General Store</h1>
               <h2 className="text-lg">by Keigo Higashino</h2>
               <div className="flex items-center ">
                  <StarRating initialRating={4.43} onChange={() => { }} />
                  <span className="ml-3 text-2xl">4.43</span>
                  <span className="ml-3 font-sans text-gray-300" >69 ratings</span>
                  <span className="ml-3 font-sans text-gray-300" >68 reviews</span>

               </div>

            </div>
         </div>

      </div>
   )
}