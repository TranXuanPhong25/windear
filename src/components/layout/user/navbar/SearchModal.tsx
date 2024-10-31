import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { ArrowUpRight, Plus, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import anime from 'animejs';
import { ScrollArea } from "@/components/ui/scroll-area"
import BookSearchInfo from '@/types/BookSearchInfo';
interface SearchModalProps {

   isOpen: boolean;
   onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
   const modalRef = useRef<HTMLDivElement>(null);
   const overlayRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);
   const [searchResults, setSearchResults] = useState<BookSearchInfo[]>([]);
   const [searchQuery, setSearchQuery] = useState('');
   const searchResultRef = useRef<HTMLDivElement>(null);
   // const [searching, setSearching] = useState(false);

   useEffect(() => {
      if (searchQuery.length > 3) {
         
         axios.get(`${import.meta.env.VITE_BASE_API_URL}/external/books/search?title=${searchQuery}`, {
            headers: {
               'Content-Type': 'application/json',
            }
         })
            .then((response) => {
               console.log(response.data);
               setSearchResults(response.data);
               searchResultRef.current?.classList.add("h-[60vh]")

            })
      }else if(searchQuery.length === 0){
         setSearchResults([]);
         searchResultRef.current?.classList.remove("h-[60vh]")

      }

   }, [searchQuery]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
         }
      };

      if (isOpen) {
         setIsVisible(true);
         document.addEventListener('mousedown', handleClickOutside);
         anime({
            targets: modalRef.current,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 600,
            easing: 'easeOutElastic(1, .5)',
         });
         anime({
            targets: overlayRef.current,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad',
         });
      } else {
         anime({
            targets: modalRef.current,
            opacity: [1, 0],
            scale: [1, 0.9],
            duration: 200,
            easing: 'easeOutQuad',
            complete: () => {
               setIsVisible(false);
               document.removeEventListener('mousedown', handleClickOutside);
            },
         });
         anime({
            targets: overlayRef.current,
            opacity: [1, 0],
            duration: 200,
            easing: 'easeOutQuad',
         });
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen, onClose]);

   if (!isOpen && !isVisible) return null;

   return (
      <div ref={overlayRef} className="fixed inset-0 z-50 flex justify-center  bg-opacity-80 bg-black dark:text-white ">
         <div ref={modalRef} className="dark:bg-gray-800/90 rounded-2xl shadow-lg  w-full max-w-2xl h-fit mt-10 bg-gray-100/80 backdrop-blur-md border-gray-300 border-2">
            <div className="flex justify-between items-center relative mx-4 mt-6">

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
                  className="w-full pl-10 pr-16 border-4 rounded-lg py-3 text text-xl focus:outline-none border-gray-400 focus:border-gray-500 dark:focus:border-gray-300  dark:focus:bg-gray-900 bg-gray-300 focus:bg-gray-200  dark:bg-transparent transition-colors"
               />
               <Button onClick={onClose} variant="ghost" className="text-gray-500 hover:text-gray-700 text-md absolute right-2 h-0 px-3 py-4">
                  Esc
               </Button>
            </div>
            {/* Add your search results or other content here */}
            <div className='relative mt-6'>


               <ScrollArea ref={searchResultRef} className="w-full max-h-[60vh] border-gray-400/40 border-t-2">
                  {
                     searchResults.length > 0 ? (
                        searchResults.map((result) => (
                           <div key={result.bookId} className="flex py-4 px-5 border-b-2 border-gray-400/40 dark:hover:bg-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer overflow-hidden">
                              <div className='mr-4 min-w-20 max-w-40 '>
                                 <img src={result.imageUrl} alt={result.title} className=" w-full rounded-r-md" />
                              </div>
                              <div>
                                 <h2 className='text-lg text-ellipsis'>{result.title}</h2>
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
                                    ):
                                    <span className='font-sans'>Not rated yet</span>
                                    }
                                 </p>
                                 <Button className="bg-gray-800 rounded-full pl-4 pr-2 sm:rounded-md">
                                    <Link to={`/books/${result.bookId}`} onClick={onClose}>
                                       View
                                       <ArrowUpRight className="h-4 w-4 text-white inline-block" />
                                    </Link>
                                 </Button>
                              </div>

                           </div>
                        ))
                     ) : (
                        <div className="p-5">
                           <h3 className="text-lg">No results found</h3>
                        </div>
                     )
                  }
               </ScrollArea>
               <div className='flex justify-between p-4 items-center'>
                  <Button className="bg-gray-400 hover:bg-white text-white hover:text-black border-2 hover:border-gray-600/30 transition-colors h-0 px-2 py-3 rounded-sm">
                     <Link to="/browse" className='flex items-center'>
                        <Plus className="h-4 w-4 text-black mr-2" />
                        <h3 className="font-sans">
                           Not found? Add your book
                        </h3>
                     </Link>
                  </Button>
                  <Button className=" bg-gray-800 rounded-full pl-4 pr-2 sm:rounded-md" onClick={onClose}>
                     <Link to="/browse">
                        Browse all
                        <ArrowUpRight className="h-4 w-4 text-white inline-block" />
                     </Link>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchModal;