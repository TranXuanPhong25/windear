import SparklesText from "@/components/ui/sparkles-text";
export default function BrowseGenreIndex(){
    return (
        <div className="grid place-items-center h-[50vh] z-[100] ">
            <SparklesText text="Select a genre to start browsing" sparklesCount={20} />
        </div>
    )
}