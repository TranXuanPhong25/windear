import { useRef, useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel"
import { Loader } from "lucide-react"

interface newsType {
   id: number,
   title: string,
   description: string,
   imageUrl: string
}
export default function NewsBanner() {
   const [newsItems, setNewsItems] = useState<newsType[]>([]);

   const plugin = useRef(
      Autoplay({
         delay: 5000,
         stopOnInteraction: false
      })
   )
   useEffect(() => {
      // Fetch data from the API
      const fetchNews = async () => {
         try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/news`); // Replace with your API endpoint
            const data = await response.json();
            setNewsItems(data);
         } catch (error) {
            console.error('Error fetching news:', error);
         }
      };

      fetchNews();
   }, []);

   return (
      <Carousel
         plugins={[plugin.current]}
         className="w-full rounded-lg overflow-hidden"
         onMouseEnter={plugin.current.stop}
         onMouseLeave={plugin.current.reset}
         opts={{
            align: "start",
            loop: true,
         }}

      >
         <CarouselContent className="gap-0">
            {newsItems.length ? newsItems.map((newsItem, index) => (
               <CarouselItem key={index} className="p-0 cursor-grab">

                  <Card className="border-0 bg-sky-400 overflow-hidden border-none rounded-none">
                     <CardContent className="w-full h-[600px] flex items-center justify-center p-0 ml-2">
                        <img src={newsItem?.imageUrl} className="" />
                     </CardContent>
                  </Card>

               </CarouselItem>
            )) :
               [1, 2,3,4].map((_, index) => (
                  <CarouselItem key={index} className="p-0 cursor-grab">

                     <Card className="border-0 bg-gray-700 overflow-hidden border-none rounded-none">
                        <CardContent className="w-full h-[600px] flex items-center justify-center p-0 ml-2">
                           <Loader className="animate-spin w-10 h-10 text-white" />
                        </CardContent>
                     </Card>

                  </CarouselItem>
               ))

            }
         </CarouselContent>
         <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2" />
         <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2" />
      </Carousel>
   )
}