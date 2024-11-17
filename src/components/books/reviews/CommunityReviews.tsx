
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import WindearReviews from './WindearReviews'
import GoodReadsReviews from './GoodReadsReview'



export default function CommunityReviews({ workId, bookId }: { workId: string, bookId: string | undefined }) {

   return (
      <>

         <Tabs defaultValue="windear" className="w-full" id="community-reviews">
            <TabsList className="w-fit p-1 rounded-md bg-muted dark:bg-gray-700">
               <TabsTrigger value="windear" className="px-4 py-1.5 dark:text-gray-200 dark:data-[state=active]:bg-gray-600">Windear</TabsTrigger>
               <TabsTrigger value="goodreads" className="px-4 py-1.5 dark:text-gray-200 dark:data-[state=active]:bg-gray-600">Goodreads</TabsTrigger>
            </TabsList>
            <TabsContent value="windear" >
               <WindearReviews bookId={bookId} />
            </TabsContent>
            <TabsContent value="goodreads">
               <GoodReadsReviews workId={workId} />
            </TabsContent>
         </Tabs>
      </>
   )
}