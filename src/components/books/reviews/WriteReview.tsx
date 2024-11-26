import MyReview from "./MyReview";
export default function WriteReview({ bookId }: { bookId: string }) {
    return (
        <div className="dark:text-white" id="community-reviews">
            <h1 className="text-2xl font-bold">
                Rating & Reviews
            </h1>
            <div className="w-full mt-2 mb-10">
                <MyReview bookId={bookId}/>
            </div>
        </div>
    )

}