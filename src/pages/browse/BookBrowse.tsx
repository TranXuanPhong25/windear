import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BookSearchInfo from "@/types/BookSearchInfo";
import axios from "axios";
import { ArrowUpRight, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookBrowse() {
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [searchResults, setSearchResults] = useState<BookSearchInfo[]>([]);
   useEffect(() => {

      if (searchQuery.length > 3) {
         axios.get(`${import.meta.env.VITE_BASE_API_URL}/search?q=${searchQuery}`, {
            headers: {
               'Content-Type': 'application/json',
            }
         })
            .then((response) => {
               console.log(response.data);
               setSearchResults(response.data);
            })
      } else {
         setSearchResults([]);
      }

   }, [searchQuery]);
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



                  {
                     searchResults.length > 0 ? (
                        searchResults.map((result) => (
                           <div key={result.id} className="flex p-4 border-b-2 border-gray-400/40 hover:bg-gray-700 transition-colors duration-200 cursor-pointer overflow-hidden">
                              <div className='mr-4 min-w-20  '>
                                 <img src={result.imageUrl} alt={result.title} className=" w-full rounded-r-md" />
                              </div>
                              <div>
                                 <h2 className='text-xl text-ellipsis'>{result.title}</h2>
                                 <p><span className='font-sans'>By</span> {result.authors}</p>
                                 <p className='flex items-center'>
                                    {result.rating != null ? (
                                       <>
                                          <span className='font-sans'>Rating:</span>
                                          <span className='ml-2 mr-1'>
                                             {result.rating.toFixed(2)}
                                          </span>

                                          <Star className="h-4 w-4 text-yellow-500 inline-block" fill="rgb(234,179,8)" />
                                       </>
                                    ) :
                                       <span className='font-sans'>Not rated yet</span>
                                    }
                                 </p>
                                 <Button className="bg-gray-800 rounded-full pl-4 pr-2 sm:rounded-md">
                                    <Link to={`/books/${result.id}`} >
                                       View
                                       <ArrowUpRight className="h-4 w-4 text-white inline-block" />
                                    </Link>
                                 </Button>
                              </div>

                           </div>
                        ))
                     ) : (
                        <div className="p-4">
                           <h3 className="text-lg">No results found</h3>
                        </div>
                     )
                  }

               </div>
            </div>
         </div>
      </div>
   )
}