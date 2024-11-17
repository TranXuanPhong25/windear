import { useParams } from "react-router-dom";
import StarRating from "@/components/books/StarRating";
import { Skeleton } from "@/components/ui/skeleton"
import ExpandableParagraph from "@/components/books/ExpandableParagraph";
import ShelfAction from "@/components/books/ShelfAction";
import GetBook from "@/components/books/GetBook";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types/Book";
import Genres from "@/components/books/Genres";
import { Separator } from "@/components/ui/separator";
import { handlePlural } from "@/lib/handlePlural";
import { Suspense } from "react";
import SimilarBooks from "@/components/books/SimilarBooks";
import BookDetails from "@/components/books/BookDetails";
import CommunityReviews from "@/components/books/reviews/CommunityReviews";
import LoadingBlock from "@/components/layout/LoadingBlock";
import WriteReview from "@/components/books/reviews/WriteReview";
import BookNotFound from "./BookNotFound";


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
   if (NONDIGIT_REGEX.test(bookId || '')) {
      return <h1>Invalid book ID</h1>
   }
   if (!bookId) return <h1>Invalid book ID</h1>
   if (error) return <div>Error: {error.message}</div>;
   if(data?.errors){
      return <BookNotFound/>;
   }
   const book: Book = data ? data?.data.getBookByLegacyId : {};
   const authorBook: string = handlePlural(book.primaryContributorEdge?.node.works.totalCount, "book", true);
   const authorFollower: string = handlePlural(book.primaryContributorEdge?.node.followers.totalCount, "follower", true);
   const secondaryContributors: string | false = book.secondaryContributorEdges && book.secondaryContributorEdges.length > 0 && ", " + book.secondaryContributorEdges.map((contributor) => `${contributor.node.name} (${contributor.role})`).join(", ");
   return (
      <>
         <div className="w-full dark:text-white md:flex mt-8 px-5">
            {/* book header */}

            <div className="w-[240px] flex flex-col items-center md:sticky top-24 h-fit ">
               {isLoading ? <Skeleton className="w-[240px] h-80" />
                  : <img
                     className="w-full rounded-r-2xl rounded-l-sm dark:drop-shadow-[0_0_1em_#D2D9E11f] drop-shadow-[0_0_1.6em_#0000001f] h-fit"
                     src={book?.imageUrl}
                     alt="book cover"
                  />
               }
               <ShelfAction customClass="w-full" />
               <GetBook />
               <StarRating initialRating={0} ratable onChange={() => { }} />
            </div>
            {/* book detail */}
            <div className="flex-1 w-full font-sans md:ml-12 max-w-4xl">
               {
                  isLoading ? <Skeleton className="my-2 scroll-m-20 text-5xl font-semibold tracking-tight " >&nbsp;</Skeleton> :
                     <h1 className="my-2 scroll-m-20 text-5xl font-semibold tracking-tight ">{book.title}</h1>
               }
               {
                  isLoading ? <Skeleton className="text-lg mb-3 w-64"  >&nbsp;</Skeleton> :
                     <h2 className="text-xl mb-3 flex ">
                        {
                           ["By ",
                              book.primaryContributorEdge && book.primaryContributorEdge.node.name,
                              secondaryContributors
                           ]
                        }
                     </h2>
               }
               {
                  isLoading ? <Skeleton className="flex items-center h-12 w-96 mb-2" /> :
                     <a href="#community-reviews" className="flex items-center mb-2 hover:bg-gray-50/10 w-fit p-2 -mx-2 rounded-md cursor-s-resize">
                        <StarRating initialRating={book.stats.averageRating} onChange={() => { }} />
                        <span className="ml-3 text-2xl">{Number(book.stats.averageRating).toFixed(2)}</span>
                        <span className="ml-3 font-sans text-gray-600 dark:text-gray-300 text-sm" >
                           {handlePlural(book.stats.ratingsCount, "rating")}
                        </span>
                        <span className="ml-2 size-[2px] bg-gray-300 "></span>
                        <span className="ml-2 font-sans text-gray-600 dark:text-gray-300 text-sm" >
                           {handlePlural(book.work.reviews.totalCount, "review")}
                        </span>
                     </a>
               }
               {
                  isLoading ? <Skeleton className="w-full h-32 my-4" /> :
                     <div className="max-w-[800px]">
                        <ExpandableParagraph
                           text={book.description}
                        />
                     </div>
               }

               {
                  isLoading ? <Skeleton className="w-full h-24 my-4" /> :
                     <Genres genres={book.bookGenres.map(genre => genre.genre.name)} />
               }

               {
                  isLoading ? <Skeleton className="w-60  h-12 my-4" /> :
                     (
                        <div className="mt-8 mb-6 text-gray-600 dark:text-gray-300">
                           <h3>{book.details.numPages} Pages, {book.details.format}</h3>
                           <h3>First published {new Date(book.details.publicationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                        </div>
                     )
               }
               {
                  isLoading ? <Skeleton className="w-60 h-8 my-4" /> :
                     <BookDetails book={book} />
               }
               <Separator className="my-4" />
               <div className="mb-6">
                  <h1 className="text-2xl font-bold ">About the author</h1>
                  {
                     isLoading ? <Skeleton className="w-full h-40 mt-4" /> :
                        <div >
                           <div className="flex items-center mt-4 ">
                              <img className="w-16 h-16 rounded-full bg-gray-700" src={book.primaryContributorEdge?.node.profileImageUrl} alt="author" />
                              <div className="ml-4">
                                 <h2 className="text-lg font-semibold">{book.primaryContributorEdge?.node.name}</h2>
                                 <h3 className="text-gray-600 dark:text-gray-300">{authorBook}, {authorFollower}</h3>
                              </div>
                           </div>
                           <div className="max-w-[800px]">

                              <ExpandableParagraph text={book.primaryContributorEdge?.node.description} />
                           </div>
                        </div>
                  }
               </div>
               <Separator className="my-4" />

               <div className="mb-6  pt-2  w-full">
                  <h1 className="text-2xl mb-6 font-bold">Reader also enjoyed</h1>
                  <Suspense fallback={<Skeleton className="h-60 w-full" />}>
                     <SimilarBooks bookId={book.id} />
                  </Suspense>
               </div>
               <Separator className="my-4" />

               {/* {
                  isLoading ? <Skeleton className="w-full h-60" /> : */}
                     <WriteReview bookId={bookId} />
               {/* } */}
               <Separator className="my-4" />

               {
                  isLoading ? <LoadingBlock className="w-full h-60" /> :
                     <CommunityReviews bookId={bookId} workId={book.work.id} />
               }
            </div>

         </div>
         
      </>
   )
}