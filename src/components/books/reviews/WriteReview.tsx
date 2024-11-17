export default function WriteReview({bookId}:{bookId:string}) {
   console.log(bookId)
    return (
        <div className="w-full dark:text-white md:flex mt-8 px-5">
            <div className="w-[240px] flex flex-col items-center md:sticky top-24 h-fit ">
                <img
                    className="w-full rounded-r-2xl rounded-l-sm dark:drop-shadow-[0_0_1em_#D2D9E11f] drop-shadow-[0_0_1.6em_#0000001f] h-fit"
                    src="https://images.unsplash.com/photo-1606787343926-9b6d4f6f5f3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDM0NzN8MHwxfGFsbHwxfHx8fHx8fHx8fHx8fHwxNjA5NjM4NjU2&ixlib=rb-1.2.1&q=80&w=400"
                    alt="book cover"
                />
            </div>
            <div className="w-full md:pl-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Write a Review</h1>
                </div>
                <div className="mt-4">
                    <textarea
                        className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write your review here"
                    ></textarea>
                </div>
                <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
                </div>
            </div>
        </div>
    )

}