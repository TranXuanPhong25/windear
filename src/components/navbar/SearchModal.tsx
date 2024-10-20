import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import anime from 'animejs';

interface SearchModalProps {

   isOpen: boolean;
   onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
   const modalRef = useRef<HTMLDivElement>(null);
   const overlayRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);
 
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
      <div ref={overlayRef} className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50">
         <div ref={modalRef} className="bg-white rounded-2xl shadow-lg py-6 px-3 w-full max-w-2xl h-fit mt-6 ">
            <div className="flex justify-between items-center relative">

               <Label htmlFor="search-in-nav">
                  <Search className="absolute left-3 top-4 h-5 w-5 text-muted-foreground cursor-pointer" />
               </Label>
               <input
                  type="text"
                  id="search-in-nav"
                  placeholder="Search for books..."
                  className="w-full pl-10 pr-16 border border-gray-300 rounded-lg py-3 text text-lg"
               />
               <Button onClick={onClose} variant="ghost" className="text-gray-500 hover:text-gray-700 text-md absolute right-2 h-0 px-3 py-4">
                  Esc
               </Button>
            </div>
            {/* Add your search results or other content here */}
            <div className='relative mt-2 '>
               <h3 className="p-4">We found 0 result</h3>
               <Button className="absolute right-4 bg-gray-800 rounded-full pl-4 pr-2 sm:rounded-md top-2" onClick={onClose}>
                  <Link to="/browse">
                     Browse all
                     <ArrowUpRight className="h-4 w-4 text-white inline-block" />
                  </Link>
               </Button>

            </div>
         </div>
      </div>
   );
};

export default SearchModal;