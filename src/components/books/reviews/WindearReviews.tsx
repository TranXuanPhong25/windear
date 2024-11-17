import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "./ReviewCard";
import { useInView } from "react-intersection-observer";
import { useWindearReviews } from "@/hooks/useWindearReviews";
import { Skeleton } from "@/components/ui/skeleton";
import { WindearReview } from "@/types/WindearReview";

export default function WindearReviews({ bookId }: { bookId: string | undefined }) {
   const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
   });
   const { isLoading, data } = useWindearReviews(bookId, inView);
   console.log(data)

   return (
      <Card className="dark:bg-gray-800 border-0 shadow-none" ref={ref}>
         {
            isLoading || !bookId ||!data? <Skeleton className="w-full h-44" /> :
               <CardContent className="p-0">
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">Windear Reviews</h2>
                  {data.map((review:WindearReview) => (
                     <ReviewCard 
                        key={review.reviewId} 
                        {...review}
                     />
                  ))}
               </CardContent>
         }
      </Card>
   )
}