// import BookList from "@/components/home/BookList";
// import NewsBanner from "@/components/home/NewsBanner";
// import { useAuth0 } from "@auth0/auth0-react";
// import HeroParallax from "@/components/home/HeroParallax";
// import { getProtectedResource, getPublicResource, getAdminResource } from "@/services/services/message.service";
import HeroParallax from '../../components/ui/hero-parallax';
import {useGetPopularBookOnGoodreads} from "@/hooks/book/useGetPopularBookOnGoodreads.ts";
import {TechStacks} from "@/components/home/TechStacks.tsx";
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MemberDistribution from "@/components/home/MemberDistribution.tsx";

export default function HomePage() {
    const {data: bookList, isLoading} = useGetPopularBookOnGoodreads();
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
        });
        document.title = "Windear Library";
    }, []);
    return (
        <>
            <HeroParallax products={bookList} isLoading={isLoading}/>
            <TechStacks/>
            <MemberDistribution/>
            <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl mx-auto my-10 h-screen flex items-center justify-center animate-pulse">
                ENJOY
            </h1>
        </>
    )
}