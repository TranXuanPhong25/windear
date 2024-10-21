import { useParams } from "react-router-dom";
import StarRating from "@/components/books/StarRating";

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
export default function BookShow() {
   const params = useParams();
   const NONDIGIT_REGEX = /\D/g;
   if (NONDIGIT_REGEX.test(params.bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   return (
      <div className="w-full text-white flex mt-8">
         {/* book header */}

         <div className="w-[300px] flex flex-col items-center mr-10">
            <img className="max-w-[240px] rounded-md " src="https://upload.wikimedia.org/wikipedia/vi/e/eb/Dieu_ky_dieu_cua_tiem_tap_hoa_Namiya.jpg" alt="book cover" />
            
            <ShelfAction/>
            <GetBook/>
            <StarRating initialRating={5} ratable onChange={() => { }} />
         </div>
         {/* book detail */}
         <div className=" font-sans ">
            <h1 className="py-2 scroll-m-20 text-5xl font-semibold tracking-tight ">The Miracles of the Namiya General Store</h1>
            <h2 className="text-lg pb-3">by Keigo Higashino</h2>
            <div className="flex items-center ">
               <StarRating initialRating={4.43} onChange={() => { }} />
               <span className="ml-3 text-2xl">4.43</span>
               <span className="ml-3 font-sans text-gray-300" >69 ratings</span>
               <span className="ml-3 font-sans text-gray-300" >68 reviews</span>
            </div>

            <ExpandableParagraph
               text="
               When three delinquents hole up in an abandoned general store after their most recent robbery, to their great surprise, a letter drops through the mail slot in the store's shutter. This seemingly simple request for advice sets the trio on a journey of discovery as, over the course of a single night, they step into the role of the kindhearted former shopkeeper who devoted his waning years to offering thoughtful counsel to his correspondents. Through the lens of time, they share insight with those seeking guidance, and by morning, none of their lives will ever be the same. By acclaimed author Keigo Higashino, The Miracles of the Namiya General Store is a work that has touched the hearts of readers around the world.
               "
            />

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
         </div>

      </div>
   )
}