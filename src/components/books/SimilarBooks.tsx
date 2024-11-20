import { useInView } from 'react-intersection-observer';
import { useSimilarBook } from '@/hooks/book/useSimilarBook';
import { Skeleton } from '@/components/ui/skeleton';
import BookList from './BookList';

export default function SimilarBooks({ bookId }: { bookId: string | undefined }) {
   const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
   });
   // Only fetch data when bookId is available and element is in view
   const { data, isLoading } = useSimilarBook(bookId, inView);

   return (
      <div ref={ref}>
         {
            isLoading || !bookId ||!data ? <Skeleton className="h-72 w-full" /> :
               <BookList title="" books={data?.data.getSimilarBooks.edges} />
         }
      </div>
   );
}
