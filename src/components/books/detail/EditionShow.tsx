import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import EditionList from './EditionsList.tsx';
import { useEditionsList } from '@/hooks/book/useEditionsList.ts';

export default function EditionShow({ workId }: { workId: string | undefined }) {
   const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
   });
   console.log("editions")

   // Only fetch data when bookId is available and element is in view
   const { data, isLoading } = useEditionsList(workId, inView||true);

   return (
      <div ref={ref}>
         {
            isLoading || !workId ||!data ? <Skeleton className="h-72 w-full" /> :
               <EditionList books={data?.data.getEditions.edges} />
         }
      </div>
   );
}
