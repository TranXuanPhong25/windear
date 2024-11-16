import { useParams } from "react-router-dom";
import StarRating from "@/components/books/StarRating";
import { Skeleton } from "@/components/ui/skeleton"
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import ExpandableParagraph from "@/components/books/ExpandableParagraph";
import BookList from "@/components/home/BookList";
import ShelfAction from "@/components/books/ShelfAction";
import GetBook from "@/components/books/GetBook";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types/Book";
import Genres from "@/components/books/Genres";
import { Separator } from "@/components/ui/separator";
import { handlePlural } from "@/lib/handlePlural";


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
   const book: Book = data ? data?.data.getBookByLegacyId : {};
   const authorBook: string = handlePlural(book.primaryContributorEdge?.node.works.totalCount, "book", true);
   const authorFollower: string = handlePlural(book.primaryContributorEdge?.node.followers.totalCount, "follower", true);
   console.log(book)
   // const genres: Tag[] = book.taggings? extractTags(book.taggings, "Genre"):[];
   // const moodTags: Tag[] = book.taggings? extractTags(book.taggings, "Mood"):[];
   // const contentWarningTags: Tag[] = book.taggings? extractTags(book.taggings, "Content Warning"):[];
   return (
      <>
         <div className="w-full dark:text-white flex mt-8">
            {/* book header */}

            <div className="flex flex-col items-center mr-16 sticky h-fit top-24">
               {isLoading ? <Skeleton className="w-[240px] h-80" />
                  : <img className="w-[240px] rounded-r-2xl rounded-l-md shadow-lg" src={book?.imageUrl} alt="book cover" />}
               <ShelfAction customClass="w-full" />
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
                     <div className="text-xl mb-3 flex ">By &nbsp;
                        <h2>
                           {
                              book.primaryContributorEdge && book.primaryContributorEdge.node.name
                           }
                        </h2>
                        &nbsp;
                        <h2>
                           {
                              book.secondaryContributorEdges && book.secondaryContributorEdges.length > 0 && ", " + book.secondaryContributorEdges.map((contributor) => `${contributor.node.name} (${contributor.role})`).join(", ")
                           }
                        </h2>
                     </div>
               }
               {
                  isLoading ? <Skeleton className="flex items-center size-8 w-96 mb-2" /> :
                     <div className="flex items-center mb-2">
                        <StarRating initialRating={book.stats.averageRating} onChange={() => { }} />
                        <span className="ml-3 text-2xl">{Number(book.stats.averageRating).toFixed(2)}</span>
                        <span className="ml-3 font-sans text-gray-600 dark:text-gray-300 text-sm" >
                           {handlePlural(book.stats.ratingsCount, "rating")}
                        </span>
                        <span className="ml-2 size-[2px] bg-gray-300 "></span>
                        <span className="ml-2 font-sans text-gray-600 dark:text-gray-300 text-sm" >
                           {handlePlural(book.work.reviews.totalCount, "review")}
                        </span>
                     </div>
               }
               {
                  isLoading ? <Skeleton className="w-full h-32" /> :
                     <ExpandableParagraph
                        text={book.description}
                     />
               }

               {
                  isLoading ? <Skeleton className="w-full h-32" /> :
                     <Genres genres={book.bookGenres} />
               }

               {
                  isLoading ? <Skeleton className="w-full h-32" /> :
                     (
                        <div className="mt-6 text-gray-600 dark:text-gray-300">
                           <h3>{book.details.numPages} Pages, {book.details.format}</h3>
                           <h3>First published {new Date(book.details.publicationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                        </div>
                     )
               }
               <Accordion type="single" collapsible className=" " >
                  <AccordionItem value="item-1" className="border-b-0 w-full max-w-[900px] ">
                     <AccordionTrigger className="flex justify-start w-fit gap-1">
                        Book details and other editions
                     </AccordionTrigger>
                     <AccordionContent className="text-gray-600 dark:text-gray-200">
                        <div className="flex mt-2">
                           <div >
                              <div>
                                 Original title
                              </div>

                           </div>
                           <div className="ml-10 ">
                              {
                                 book.work &&
                                 <div>
                                    {book.work.details.originalTitle}
                                 </div>
                              }


                           </div>
                        </div>
                        <div>
                           <h1 className="text-lg mb-2 mt-6 text-black dark:text-white ">This edition</h1>
                        </div>
                        <div className="flex">
                           <div >
                              {
                                 book.details && book.details.format &&
                                 <p>
                                    Format
                                 </p>
                              }
                              {
                                 book.details && book.details.publicationTime &&
                                 <p>
                                    Published
                                 </p>
                              }
                              {
                                 book.details && book.details.isbn &&
                                 <p>
                                    ISBN
                                 </p>
                              }
                              {
                                 book.details && book.details.asin &&
                                 <p>
                                    ASIN
                                 </p>
                              }
                              {
                                 book.details && book.details.language?.name &&
                                 <p>
                                    Language
                                 </p>
                              }

                           </div>
                           <div className="ml-10">
                              {
                                 book.details && book.details.format &&
                                 <p>
                                    {book.details.numPages} Pages, {book.details.format}
                                 </p>
                              }
                              {
                                 book.details && book.details.publicationTime &&
                                 <p>
                                    {new Date(book.details.publicationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} by {book.details.publisher}
                                 </p>
                              }
                              {
                                 book.details && book.details.isbn &&
                                 <p>
                                    {book.details.isbn}
                                 </p>
                              }
                              {
                                 book.details && book.details.asin &&
                                 <p>
                                    {book.details.asin}
                                 </p>
                              }
                              {
                                 book.details && book.details.language?.name &&
                                 <p>
                                    {book.details.language.name}
                                 </p>
                              }

                           </div>
                        </div>
                        <h3 className="text-lg mt-6 mb-2">More edition</h3>
                        <BookList title="" className="sm:px-4 my-4" />
                     </AccordionContent>

                  </AccordionItem>
               </Accordion>
               <Separator className="my-4" />
               <div className="mb-6">
                  <h1 className="text-2xl ">About the author</h1>
                  {
                     isLoading ? <Skeleton className="w-full h-32" /> :
                        <div >
                           <div className="flex items-center mt-4 ">
                              <img className="w-16 h-16 rounded-full bg-gray-700" src={book.primaryContributorEdge?.node.profileImageUrl} alt="author" />
                              <div className="ml-4">
                                 <h2 className="text-lg font-semibold">{book.primaryContributorEdge?.node.name}</h2>
                                 <h3 className="text-gray-600 dark:text-gray-300">{authorBook}, {authorFollower}</h3>
                              </div>
                           </div>
                           <ExpandableParagraph text={book.primaryContributorEdge?.node.description} />
                        </div>
                  }
               </div>
               <Separator className="my-4" />

               <div className="  border-2 border-white mb-6 max-w-[900px]">
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