import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { ArrowUpRightFromSquare, RefreshCcw, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBookSearch } from '@/hooks/useBookSearch';
import clsx from 'clsx';
import BookSearchInfo from '@/types/BookSearchInfo';
import { handlePlural } from '@/lib/handlePlural';
interface SearchModalProps {

   isOpen: boolean;
   onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
   const modalRef = useRef<HTMLDivElement>(null);
   const overlayRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const { data, isLoading } = useBookSearch(searchQuery);
   const searchResults = data?.data?.getSearchSuggestions.edges;
   // const [searching, setSearching] = useState(false);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
         }
      };

      if (isOpen) {
         setIsVisible(true);
         document.addEventListener('mousedown', handleClickOutside);
         document.body.style.overflow = 'hidden';
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
         document.body.style.overflow = 'unset';
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
         <div ref={modalRef} className="dark:bg-gray-800/90 rounded-2xl shadow-lg  w-full max-w-2xl h-fit mt-10 bg-[#f4f1ea] backdrop-blur-md border-gray-300/50 border-2">
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
                  placeholder="Search for a book"
                  className="w-full pl-10 pr-16 border-[3px] rounded-lg py-3 text text-xl focus:outline-none border-gray-400 focus:border-gray-500 dark:focus:border-gray-300  dark:focus:bg-gray-900 bg-gray-300 focus:bg-gray-200  dark:bg-transparent transition-colors  "
                  autoComplete="off"

               />
               <Button onClick={onClose} variant="ghost" className="text-gray-500 hover:text-gray-700 dark:hover:bg text-md absolute right-2 h-0 px-3 py-4">
                  Esc
               </Button>
            </div>
            <div className='relative mt-6'>

               {
                  isLoading ? (
                     <div className='w-full flex justify-center my-6'>
                        <RefreshCcw className='animate-spin direction-reverse size-10' />
                     </div>
                  ) : (
                     <ScrollArea className={clsx("w-full max-h-[50vh] border-gray-400/40 border-t-2", searchResults && searchResults.length && "h-[50vh]")}>
                        {
                           searchResults && searchResults.length > 0 ? (
                              searchResults.map((result: BookSearchInfo) => (
                                 <div key={result.node.legacyId} className="flex p-4 border-b-2 border-gray-400/40 hover:bg-gray-700 cursor-pointer overflow-hidden">
                                    <div className='mr-4 min-w-36 w-36 '>
                                       <img src={result.node.imageUrl || "/book-cover-unavailable-placeholder.jpg"} alt={result.node.title} className=" w-36 rounded-r-xl rounded-l-sm" />
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                       <div>
                                          <h2 className='text-2xl text-ellipsis'>{result.node.title}</h2>
                                          <p><span className='font-sans'>By</span> {result.node?.primaryContributorEdge.node.name || "unknown"}</p>
                                          <p className='flex items-center'>
                                             {result.node.stats.averageRating != null ? (
                                                <>
                                                   <span className='font-sans'>Rating:</span>
                                                   <span className='ml-2 mr-1'>
                                                      {result.node.stats.averageRating}
                                                   </span>

                                                   <Star className="h-4 w-4 text-yellow-500 inline-block" fill="rgb(234,179,8)" />
                                                </>
                                             ) :
                                                <span className='font-sans'>Not rated yet</span>
                                             }
                                          </p>
                                          <p>
                                             {handlePlural(result.node.stats.ratingsCount, "rating")}, {handlePlural(result.node.work.reviews.totalCount, "review")}
                                          </p>

                                       </div>
                                       <Link to={`/books/${result.node.legacyId}`} onClick={onClose} className='flex items-center'>
                                          <Button className="bg-gray-800 rounded-full  sm:rounded-md w-fit">
                                             <span>View</span>
                                             <ArrowUpRightFromSquare className="h-4 w-4 dark:text-black text-white ml-1" />
                                          </Button>
                                       </Link>
                                    </div>

                                 </div>
                              ))
                           ) : (
                              <div className='flex justify-center items-center h-28'>
                                 <h2 className='font-sans text-xl'>
                                    {
                                       searchQuery.length > 0 && searchResults ? "No results found" : "You can search by title, author, isbn"
                                    }
                                 </h2>
                              </div>
                           )
                        }
                     </ScrollArea>
                  )
               }
            </div>
         </div>
      </div >
   );
};

export default SearchModal;