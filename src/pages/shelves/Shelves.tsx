import { useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Star } from "lucide-react";
import StarRating from '@/components/books/StarRating';
import ShelfAction from '@/components/books/ShelfAction';
// import GetBook from '@/components/books/GetBook';

export default function Shelves() {
   const userShelves = useMemo(() => [
      {
         name: 'Miscellaneous',
         books: [
            {
               id: 1,
               title: 'Harry Potter and the Philosopher\'s Stone',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 0,

            },
            {
               id: 2,
               title: 'The Fellowship of the Ring',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,

               status: 1,

            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,
            }
         ]
      },
      {
         name: 'The long title listtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
         books: [
            {
               id: 2,
               title: 'The Hobbit',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 0,
            },
            {
               id: 2,
               title: 'The Fellowship of the Ring',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,

            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,
            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,
            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,
            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 2,
            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,
            },
            {
               id: 2,
               title: 'The Two Towers',
               author: 'J.R.R. Tolkien',
               cover: 'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
               rating: 4,
               status: 1,
            }
         ]
      }
   ], []);
   const wantToReadCount = useMemo(() => {
      return userShelves.reduce((count, shelf) => {
         return count + shelf.books.filter(book => book.status === 0).length;
      }, 0);
   }, [userShelves]);

   const currentlyReadingCount = useMemo(() => {
      return userShelves.reduce((count, shelf) => {
         return count + shelf.books.filter(book => book.status === 1).length;
      }, 0);
   }, [userShelves]);

   const readCount = useMemo(() => {
      return userShelves.reduce((count, shelf) => {
         return count + shelf.books.filter(book => book.status === 2).length;
      }, 0);
   }, [userShelves]);
   return (
      <div className="flex dark:text-white pr-2 max-w-5xl mx-auto">

         <div className="w-[260px] mr-10">
            <Accordion type="multiple" defaultValue={["item-1"]} className=" " >
               <AccordionItem value="item-1" className=" border-b-0 w-full max-w-[900px]  "  >
                  <AccordionTrigger className="py-2 text-xl">
                     My reading lists
                  </AccordionTrigger>
                  <AccordionContent className="pl-3 pb-3 border-b-2 dark:border-gray-300/20 border-gray-400/50">


                     <div className="my-1 flex " >
                        <Checkbox id="shelf-wantoread" className="mt-[1px]" />
                        <div className="ml-1 break-words break-all flex items-center">
                           <Label htmlFor="shelf-wantoread" >
                              Want to read
                              &nbsp;
                           </Label>
                           <p>({wantToReadCount})</p>

                        </div>
                     </div>

                     <div className="my-1 flex ">
                        <Checkbox id="shelf-currentlyreading" className="mt-[1px]" />
                        <div className="ml-1 break-words break-all flex">
                           <Label htmlFor="shelf-currentlyreading" >
                              Currently reading
                              &nbsp;
                           </Label>
                           <p>({currentlyReadingCount})</p>
                        </div>
                     </div>

                     <div className="my-1 flex ">
                        <Checkbox id="shelf-read" className="mt-[1px]" />
                        <div className="ml-1 break-words break-all flex">
                           <Label htmlFor="shelf-read" >
                              Read
                              &nbsp;
                           </Label>
                           <p>({readCount})</p>
                        </div>
                     </div>


                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2" className="border-b-0 w-full max-w-[900px] ">

                  <AccordionTrigger className="py-2 text-xl">
                     My shelves
                  </AccordionTrigger>
                  <AccordionContent className="pl-3  pb-3 border-b-2 dark:border-gray-300/20 border-gray-400/50">
                     {
                        userShelves.map((shelf) => (
                           <div className="my-1 flex ">
                              <Checkbox id={"shelf-" + shelf.name} className="mt-[1px]" />
                              <div className="ml-1 break-words break-all ">
                                 <Label htmlFor={"shelf-" + shelf.name} >{shelf.name}</Label>
                                 &nbsp;
                                 <span>({shelf.books.length})</span>
                              </div>
                           </div>
                        ))
                     }
                  </AccordionContent>
               </AccordionItem>
            </Accordion>

         </div>
         <div className="flex flex-wrap w-full">
            {
               userShelves.map((shelf) => (
                  <div key={shelf.name} className="w-full ">
                     <h2 className="text-2xl ">{shelf.name}</h2>
                     <div className="flex flex-wrap ml-6 mt-6">
                        {
                           shelf.books.map((book) => (
                              <div key={book.id} className="flex w-full mt-10 mb-24  pb-4 border-b-2 dark:border-gray-300/20 border-gray-400/50 relative">
                                 <img src={book.cover} alt={book.title} width={180} className="object-fit w-[230px] h-[340px] rounded-r-xl absolute -top-10 left-4 shadow-[0px_7px_20px_0px_rgba(10,10,10,0.4)] " />

                                 <div className=" dark:bg-gray-900 w-full h-[240px] pl-[270px] pr-4 rounded-lg ">
                                    <div className='flex flex-col justify-between h-full'>
                                       <div>
                                          <h3 className="text-3xl ">{book.title}</h3>

                                          <h4><span className='text-gray-200'>by</span> {book.author} - 1999, 304 pages</h4>
                                          {/* <h4 className='text-gray-200'>1999, 304 pages</h4> */}
                                          <div className="flex items-center ">
                                             <h4 className="text-lg">{book.rating}</h4>
                                             <Star className='fill-yellow-400 text-transparent mr-1' />
                                          </div>
                                       </div>
                                       <div className='flex justify-between'>
                                         
                                             <StarRating initialRating={0} ratable onChange={() => { }} />
                                          <div>
                                             <h4 >AddedDate: 10-10-2024</h4>
                                             <ShelfAction customClass="mt-0 w-full " />
                                             {/* <GetBook /> */}
                                          </div>
                                       </div>
                                    </div>
                                    <div>

                                    </div>
                                 </div>

                              </div>
                           ))
                        }
                     </div>
                  </div>
               ))
            }
         </div>

      </div>


   );
}