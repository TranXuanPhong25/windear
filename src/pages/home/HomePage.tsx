// import BookList from "@/components/home/BookList";
// import NewsBanner from "@/components/home/NewsBanner";
// import { useAuth0 } from "@auth0/auth0-react";
// import HeroParallax from "@/components/home/HeroParallax";
// import { getProtectedResource, getPublicResource, getAdminResource } from "@/services/services/message.service";
import HeroParallax from '../../components/ui/hero-parallax';
import {useGetPopularBookOnGoodreads} from "@/hooks/book/useGetPopularBookOnGoodreads.ts";
import {TechStacks} from "@/components/home/TechStacks.tsx";
import {useEffect} from "react";
export default function HomePage() {
   const {data: bookList,isLoading} = useGetPopularBookOnGoodreads();
    useEffect(() => {
        document.title = "Windear Library";
    }, []);
   return (
      <>
            <HeroParallax products={bookList} isLoading={isLoading} />
            <TechStacks />



      </>
   )
}