import {Link, Outlet} from "react-router-dom";
import {useGetBasicGenres} from "@/hooks/genre/useGetBasicGenres.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function GenresLayout() {
    const {data, isLoading} = useGetBasicGenres();
    const genres = data?.data?.getBasicGenres?.genres || [];
    return (
        <div className="min-h-[90vh] w-full">
            <h1 className="text-3xl font-bold mb-2">
                Browse book by Genres
            </h1>
            {
                isLoading ? <Skeleton className="h-40 lg:h-30 w-full "/>
                    : <div className="flex w-full gap-2 flex-wrap">
                        {
                            genres.map((genre: { name: string }) => (
                                <Link to={genre.name} key={genre.name} className="px-3 py-1 bg-green-500 rounded-full !text-white hover:-translate-y-1 hover:bg-green-400">
                                    {genre.name}
                                </Link>
                            ))
                        }
                    </div>
            }

            <Outlet/>


        </div>
    )
}