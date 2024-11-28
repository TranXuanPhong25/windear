import {useGetNewReleases} from "@/hooks/book/useGetNewReleases.ts";
import BookStack from "@/components/discover/BookStack.tsx";
import {useEffect} from "react";

function NewReleases() {
    const {data, isLoading} = useGetNewReleases();
    useEffect(() => {
        document.title = "New releases | Discover";
    }, []);
    return (
        <div className="max-w-3xl  mx-auto">
            <h1 className=" text-3xl md:text-4xl  mx-4 font-bold">
                New releases in this month
            </h1>
            <div className="mt-10 ">
                    <BookStack data={data} isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default NewReleases;
