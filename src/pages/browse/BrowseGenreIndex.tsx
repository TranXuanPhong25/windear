import SparklesText from "@/components/ui/sparkles-text";
import {useEffect} from "react";
export default function BrowseGenreIndex(){
    useEffect(() => {
        document.title = "Browse Genre";
    }, []);
    return (
        <div className="grid place-items-center h-[50vh] z-[100] ">
            <SparklesText text="Select a genre to start browsing" sparklesCount={20} />
        </div>
    )
}