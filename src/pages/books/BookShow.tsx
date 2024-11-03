import { useParams } from "react-router-dom";
import StarRating from "@/components/books/StarRating";
import { Skeleton } from "@/components/ui/skeleton"
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import ExpandableParagraph from "@/components/books/ShowMore";
import { Link } from "react-router-dom";
import GenreTag from "@/lib/GetTagIcon";
import { createElement } from "react";
import BookList from "@/components/home/BookList";
import ShelfAction from "@/components/books/ShelfAction";
import GetBook from "@/components/books/GetBook";
import { useQuery } from "@tanstack/react-query";
import { X } from 'lucide-react';
const genreTags = [
   {
      "slug": "fiction",
      "tag_category": {
         "category": "Genre"
      },
      "tag": "Fiction"
   }
   , {
      "slug": "fantasy",
      "tag_category": {
         "category": "Genre"
      },
      "tag": "Fantasy"
   },
   {
      "slug": "young-adult",
      "tag_category": {
         "category": "Genre"
      },
      "tag": "Young Adult"
   },
   {
      "slug": "science-fiction",
      "tag_category": {
         "category": "Genre"
      },
      "tag": "Science fiction"
   }
]
const genreIconTags = [];
genreTags.forEach(g => {
   for (let i = 0; i < genreTags.length; i++) {
      if (GenreTag[i].type == g.slug) {
         genreIconTags.push(GenreTag[i])
      }
   }

})
const moodTags = [
   {
      "slug": "lighthearted",
      "tag_category": {
         "category": "Mood"
      },
      "tag": "lighthearted"
   },

   {
      "slug": "hopeful",
      "tag_category": {
         "category": "Mood"
      },
      "tag": "hopeful"
   }
   ,
   {
      "slug": "emotional",
      "tag_category": {
         "category": "Mood"
      },
      "tag": "emotional"
   },
   {
      "slug": "reflective",
      "tag_category": {
         "category": "Mood"
      },
      "tag": "reflective"
   },
   {
      "slug": "mysterious",
      "tag_category": {
         "category": "Mood"
      },
      "tag": "mysterious"
   }
]

const contentWarningTags = [
   {
      "slug": "death",
      "tag": "death"
   },
   {
      "slug": "suicide-attempt",
      "tag": "Suicide attempt"
   },
   {
      "slug": "child-abuse",
      "tag": "child abuse"
   },
   {
      "slug": "fire-fire-injury",
      "tag": "Fire/Fire injury"
   }
]
const fetchBook = async (bookId: string | undefined) => {
   const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/external/books/${bookId}`);
   if (!response.ok) {
      throw new Error('Network response was not ok');
   }
   return response.json();
};
export default function BookShow() {
   const params = useParams();
   const bookId = params.bookId;
   const NONDIGIT_REGEX = /\D/g;

   const { isLoading, error, data } = useQuery({
      queryKey: ['book', bookId],
      queryFn: () => fetchBook(bookId)
   });
   if (error) return <div>Error: {error.message}</div>;
   if (NONDIGIT_REGEX.test(bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   const book = data ? data[0] : {};
   return (
      <>
         <div className="w-full text-white flex mt-8">
            {/* book header */}

            <div className="w-[300px] flex flex-col items-center mr-10">
               {isLoading ? <Skeleton className="w-[240px] h-80 rounded-md " />
                  : <img className="max-w-[240px]rounded-md " src={book?.imageUrl} alt="book cover" />}

               <ShelfAction triggerWidth="w-full" />
               <GetBook />
               <StarRating initialRating={5} ratable onChange={() => { }} />
            </div>
            {/* book detail */}
            <div className=" font-sans ">
               {
                  isLoading ? <Skeleton className="my-2 scroll-m-20 text-5xl font-semibold tracking-tight " >&nbsp;</Skeleton> :
                     <h1 className="my-2 scroll-m-20 text-5xl font-semibold tracking-tight ">{book.title}</h1>
               }
               {
                  isLoading ? <Skeleton className="text-lg mb-3 w-64"  >&nbsp;</Skeleton> :
                     <h2 className="text-lg mb-3">by {book.authors}</h2>
               }
               {
                  isLoading ? <Skeleton className="flex items-center size-8 w-96 mb-2" /> :
                     <div className="flex items-center mb-2">
                        <StarRating initialRating={book.rating} onChange={() => { }} />
                        <span className="ml-3 text-2xl">{Number(book.rating).toFixed(2)}</span>
                        <span className="ml-3 font-sans text-gray-300" >69 ratings</span>
                        <span className="ml-3 font-sans text-gray-300" >68 reviews</span>
                     </div>

               }

               {/* <ExpandableParagraph
                  text={book?.description}
               /> */}

               <div className="grid grid-cols-3 gap-5  max-w-[900px]">
                  <div>
                     <h1 className="text-lg mb-2 font-semibold">
                        Genres
                     </h1>
                     <div className="flex flex-wrap gap-2">
                        {
                           genreTags.map((item) => {
                              const genreIcon = GenreTag.find(tag => tag.type === item.slug)?.icon;
                              return (
                                 <Link key={item.tag} to={"/browse/tags/genre/" + item.slug} className="py-1 px-4 rounded-full bg-emerald-500 flex gap-2">
                                    {genreIcon && createElement(genreIcon)}
                                    {item.tag}
                                 </Link>
                              );
                           })
                        }
                     </div>
                  </div>
                  <div>
                     <h1 className="text-lg mb-2 font-semibold">
                        Mood
                     </h1>
                     <div className="flex flex-wrap gap-2">
                        {
                           moodTags.map((item) => (
                              <Link key={item.tag} to={"/browse/tags/mood/" + item.slug} className="py-1 px-4 rounded-full bg-sky-500 first-letter:uppercase">
                                 {item.tag}
                              </Link>
                           ))
                        }
                     </div>
                  </div>
                  <div>
                     <h1 className="text-lg mb-2 font-semibold">
                        Content-warning
                     </h1>
                     <div className="flex flex-wrap gap-2">
                        {
                           contentWarningTags.map((item) => (
                              <Link key={item.tag} to={"/browse/tags/mood/" + item.slug} className="py-1 px-4 rounded-full bg-yellow-400 first-letter:uppercase text-black">
                                 {item.tag}
                              </Link>
                           ))
                        }
                     </div>
                  </div>
               </div>
               <div className="mt-3 text-gray-100">
                  <h3>First publish March 28, 2012</h3>
                  <h3>314 pages</h3>
               </div>
               <Accordion type="single" collapsible className=" " >
                  <AccordionItem value="item-1" className="border-b-0 w-full max-w-[900px] ">
                     <AccordionTrigger className="flex justify-start w-fit">
                        Book edition
                     </AccordionTrigger>
                     <AccordionContent >
                        <div>
                           <h1 className="text-lg mb-2">This edition</h1>
                        </div>
                        <div className="flex">
                           <div >
                              <div>
                                 Format
                              </div>
                              <div>
                                 Published
                              </div>
                              <div>
                                 ISBN
                              </div>
                              <div>
                                 ASIN
                              </div>
                              <div>
                                 Language
                              </div>

                           </div>
                           <div className="ml-10">
                              <div>
                                 314 pages, Hardcover
                              </div>
                              <div>
                                 March 28, 2012
                              </div>
                              <div>
                                 978-4-16-382040-2
                              </div>
                              <div>
                                 B007VZ1V9E
                              </div>
                              <div>
                                 English
                              </div>

                           </div>
                        </div>
                        <h3 className="text-lg my-2">More edition</h3>
                        <BookList title="" className="sm:px-4 my-4" />
                     </AccordionContent>

                  </AccordionItem>
               </Accordion>
               <div className="w-full h-60 border-2 border-white mb-6">
                  <h1>Author</h1>
               </div>
               <div className="w-full  border-2 border-white mb-6 max-w-[900px]">
                  <h1 className="text-xl font-semibold">Reader also enjoyed</h1>
                  <BookList title="" className="my-4" />
               </div>
               <div className="w-full h-60 border-2 mb-6 border-white ">
                  <h1 className="text-xl font-semibold">Rating & Review</h1>

               </div>
               <div className="w-full border-2 border-white ">
                  <h1 className="text-xl font-semibold">Community review</h1>
                  <div>
                     Star
                  </div>
                  <div className="h-40">
                     start stats?
                  </div>
                  <div className="w-full ">
                     reviews
                     <div className="w-full h-52 bg-gray-700">
                        review
                     </div>
                     <div className="w-full h-52 bg-gray-700">
                        review
                     </div>
                     <div className="w-full h-52 bg-gray-700">
                        review
                     </div>
                     <div className="w-full h-52 bg-gray-700">
                        review
                     </div>
                     <div className="w-full h-52 bg-gray-700">
                        write your think
                     </div>
                  </div>
               </div>
            </div>

         </div>
         <BookList title="Discover our popular books" brief className="mt-32" />
         <div className="w-full h-52 bg-gray-700 mt-24">
            Add your own Book
         </div>
      </>
   )
}