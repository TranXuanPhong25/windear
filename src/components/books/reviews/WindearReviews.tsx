import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "./ReviewCard";
import { useInView } from "react-intersection-observer";
import { useWindearReviews } from "@/hooks/book/useWindearReviews";
import { WindearReview } from "@/types/WindearReview";
import LoadingBlock from "@/components/layout/LoadingBlock";

export default function WindearReviews({ bookId }: { bookId: string | undefined }) {
   const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
   });
   const { isLoading, data } = useWindearReviews(bookId, inView);
   
   return (
      <Card className="dark:bg-gray-800 border-0 shadow-none" ref={ref}>
         {
            isLoading || !bookId ||!data? <LoadingBlock className="w-full h-60"/> :
               <CardContent className="p-0">
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">Windear Reviews</h2>
                  {data.map((review:WindearReview) => (
                     <ReviewCard 
                        key={review.reviewId} 
                        {...review}
                     />
                  ))}
                  {data.length===0&& <p className="text-lg dark:text-gray-300">No reviews yet</p>}
               </CardContent>
         }
      </Card>
   )
}