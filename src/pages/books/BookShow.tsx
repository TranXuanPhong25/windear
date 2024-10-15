import { useParams } from "react-router-dom";
import StarRating from "@/components/books/StarRating";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Close } from "@radix-ui/react-popover";
import { BookCheckIcon, BookmarkIcon, BookOpenTextIcon } from "lucide-react";
export default function BookShow() {
   const params = useParams();
   const NONDIGIT_REGEX = /\D/g;
   if (NONDIGIT_REGEX.test(params.bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   return (
      <div className="w-full text-white flex mt-8">
         {/* book header */}

         <div className="w-[380px] flex flex-col items-center px-10">
            <img className="max-w-[240px] rounded-md " src="https://upload.wikimedia.org/wikipedia/vi/e/eb/Dieu_ky_dieu_cua_tiem_tap_hoa_Namiya.jpg" alt="book cover" />
            <Popover>
               <PopoverTrigger className="w-full bg-white text-black rounded-md px-4 py-2 mt-4 mb-2 text-lg">
                  Want to read
               </PopoverTrigger>

               <PopoverContent className="p-0 pb-2 w-[250px]">

                  <h1 className="px-4 pt-3 pb-2 font-sans font-bold">Add to your reading list</h1>

                  <Close className="absolute top-0 right-0 m-2 hover:bg-gray-300 rounded-full p-2 transition-colors" >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </Close>
                  <div className="flex flex-col">
                     <Close className="flex w-full">
                        <Button variant="ghost" className="text-lg w-full justify-start">
                           <BookmarkIcon className="mr-2" />
                           Want to read
                        </Button>
                     </Close>
                     <Close className="flex w-full">
                        <Button variant="ghost" className="text-lg w-full justify-start">
                           <BookOpenTextIcon className="mr-2" />
                           Currently Reading
                        </Button>
                     </Close>
                     <Close className="flex w-full">
                        <Button variant="ghost" className="text-lg w-full justify-start">
                           <BookCheckIcon className="mr-2" />
                           Read
                        </Button>
                     </Close>
                  </div>
               </PopoverContent>
            </Popover>
            <StarRating initialRating={5} ratable onChange={() => { }} />
         </div>
         {/* book detail */}
         <div className=" font-sans">
            <h1 className="font-semibold  tracking-wide text-4xl">The Miracles of the Namiya General Store</h1>
            <h2 className="text-lg">by Keigo Higashino</h2>
            <div className="flex items-center ">
               <StarRating initialRating={4.43} onChange={() => { }} />
               <span className="ml-3 text-2xl">4.43</span>
               <span className="ml-3 font-sans text-gray-300" >69 ratings</span>
               <span className="ml-3 font-sans text-gray-300" >68 reviews</span>

            </div>
            <div>
               <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, doloremque, similique eos consequuntur iure molestias natus esse optio sint earum cumque, officiis minus dolore placeat in voluptatibus repudiandae molestiae illo?

                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, doloremque, similique eos consequuntur iure molestias natus esse optio sint earum cumque, officiis minus dolore placeat in voluptatibus repudiandae molestiae illo?
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, doloremque, similique eos consequuntur iure molestias natus esse optio sint earum cumque, officiis minus dolore placeat in voluptatibus repudiandae molestiae illo?
               </p>
            </div>
         </div>

      </div>
   )
}