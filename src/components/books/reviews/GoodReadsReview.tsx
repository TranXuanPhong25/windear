import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "./ReviewCard";
import { useGoodReadsReviews } from "@/hooks/book/useGoodReadsReviews";
import { useInView } from "react-intersection-observer";
import { GoodreadsReview } from "@/models/GoodreadsReview";
import LoadingBlock from "@/components/layout/LoadingBlock";
// Mock review data


export default function GoodReadsReviews({ workId }: { workId: string }) {
   const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
   });
   const { isLoading, data } = useGoodReadsReviews(workId, inView);
   const reviews: GoodreadsReview[] = data?.data.getReviews.edges
   return (
      <Card className="dark:bg-gray-800 border-0 shadow-none p-3" ref={ref}>
         {
            isLoading || !workId || !data ? <LoadingBlock className="w-full h-60" /> :
               <CardContent className="p-0">
                  <h2 className="text-2xl font-bold mb-6 dark:text-white ">Goodreads Reviews</h2>
                  {reviews.map((review: GoodreadsReview) => (
                     <ReviewCard
                        key={review.node.createdAt}
                        rating={review.node.rating}
                        createAt={review.node.createdAt}
                        userName={review.node.creator.name}
                        isAuthor={review.node.creator.isAuthor}
                        content={review.node.text}
                        userImageUrl={review.node.creator.imageUrlSquare}
                        tags={review.node.shelving.taggings.map((tagging) => tagging.tag.name)}


                     />
                  ))}
                  {reviews.length === 0 && <p className="text-lg dark:text-gray-300">No reviews yet</p>}

               </CardContent>
         }
      </Card>
   )
}