import { Label } from "@/components/ui/label";
import {  Search } from "lucide-react";
import {  useState } from "react";

export default function BookBrowse() {
   const [searchQuery, setSearchQuery] = useState<string>("");
   return (
      <div className="flex text-white">

         <div className="w-[300px] mr-6">
            <h1 className="text-3xl">Filter</h1>
         </div>
         <div className=" w-full">
            <div className="bg-gray-800 rounded-2xl shadow-lg  w-full  h-fit mt-6 ">
               <div className="flex justify-between items-center relative mx-3 mt-6 ">

                  <Label htmlFor="search-in-nav">
                     <Search className="absolute left-3 top-5  h-5 w-5 text-muted-foreground cursor-pointer" />
                  </Label>
                  <input
                     onChange={(e) => {
                        setSearchQuery(e.target.value);
                        // setSearching(true);
                     }}
                     value={searchQuery}
                     type="text"
                     id="search-in-nav"
                     autoFocus={true}
                     placeholder="Search for books..."
                     className="w-full pl-10 pr-16 border-4 rounded-lg py-3 text text-xl focus:outline-none border-gray-700 focus:border-gray-600  bg-transparent focus:bg-gray-900 transition-colors"
                  />
               </div>
               {/* Add your search results or other content here */}
               <div className='relative mt-6'>
               </div>
            </div>
         </div>
      </div>
   )
}