import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Close } from "@radix-ui/react-popover";
import { BookCheckIcon, BookmarkIcon, BookOpenTextIcon } from "lucide-react";

export default function GetBook() {
   return (
      <Popover>
         <PopoverTrigger className="w-full bg-white text-black rounded-md px-4 py-2  mb-2 text-lg">
            Get this book
         </PopoverTrigger>

         <PopoverContent className="p-0 pb-2 w-[250px]">

            <h1 className="px-4 pt-3 pb-2 font-sans font-bold">Available from </h1>

            <Close className="absolute top-0 right-0 m-2 hover:bg-gray-300 rounded-full p-2 transition-colors" >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </Close>
            <div className="flex flex-col">
               <Close className="flex text-lg w-full justify-start hover:bg-gray-200 py-2 px-4 transition-colors">
                  <BookmarkIcon className="mr-2" />
                  Want to read
               </Close>
               <Close className="flex text-lg w-full justify-start hover:bg-gray-200 py-2 px-4 transition-colors">
                  <BookOpenTextIcon className="mr-2" />
                  Currently Reading
               </Close>
               <Close className="flex text-lg w-full justify-start hover:bg-gray-200 py-2 px-4 transition-colors">
                  <BookCheckIcon className="mr-2" />
                  Read
               </Close>
               {/* TODO: Add more options */}
            </div>
         </PopoverContent>
      </Popover>
   )
}