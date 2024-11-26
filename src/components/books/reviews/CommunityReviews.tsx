import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import WindearReviews from './WindearReviews'
import GoodReadsReviews from './GoodReadsReview'


export default function CommunityReviews({workId = "", bookId}: { workId?: string, bookId: string | undefined }) {

    return (
        !workId ? <div className="review">
            <WindearReviews bookId={bookId}/>
        </div> : <>
            <Tabs defaultValue="windear" className="w-full review">
                <TabsList
                    className="w-fit p-1 rounded-md bg-muted dark:bg-gray-700 border-b-2 border-gray-400 bg-gray-100">
                    <TabsTrigger value="windear"
                                 className="px-4 py-1.5 dark:text-gray-200 dark:data-[state=active]:bg-gray-600 data-[state=active]:text-lg data-[state=active]:py-1">Windear</TabsTrigger>
                    <TabsTrigger value="goodreads"
                                 className="px-4 py-1.5 dark:text-gray-200 dark:data-[state=active]:bg-gray-600 data-[state=active]:text-lg data-[state=active]:py-1">Goodreads</TabsTrigger>
                </TabsList>
                <TabsContent value="windear">
                    <WindearReviews bookId={bookId}/>
                </TabsContent>
                <TabsContent value="goodreads">
                    <GoodReadsReviews workId={workId}/>
                </TabsContent>
            </Tabs>
        </>
    )
}