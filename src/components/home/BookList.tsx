import { Card, CardContent, CardDescription,  CardTitle } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star } from 'lucide-react';
import BookSearchInfo from "@/types/BookSearchInfo";
import React from "react";

interface BookListProps {
   title: string,
   books?: BookSearchInfo[];
   brief?: boolean,
   className?: string
}

export default function BookList({ title, books = [], brief = false, className = "my-4 sm:px-0" }: BookListProps) {
   const container = React.useRef<HTMLDivElement>(null);
   function handleResize(){
      if(!container.current)return;
      if(window.innerWidth < 768){
         container.current.style.width = "100%"
         return;
      }
      container.current.style.width = (window.innerWidth-350) + "px"
      console.log(container.current.style.width)
   }
   console.log("rerender")
   React.useEffect(() => {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => {
         window.removeEventListener("resize", handleResize)
      }
   }, [])
   return (
      <section className={className + " relative w-full"}>
         {title != "" &&
            <header className="text-white text-2xl mb-4 ml-2">
               {title}
            </header>

         }

         <Carousel
            // style={{width:"500px"}}
            ref={container}
            className="w-full max-w-4xl cursor-grab"
            opts={{
               align: "start",
               dragFree: true,
               
            }}
         >
            <CarouselContent className="md:gap-2 pl-2 md:pl-0 w-full">
               {books && books.map((book, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-[45%] min-[900px]:basis-[35%] lg:basis-[27%]   cursor-default p-0">
                     <Card className="overflow-hidden   !bg-transparent rounded-none shadow-none border-0 p-2">
                        <CardContent className="min-h-60 flex items-center justify-center p-0 ">
                              <img 
                                 src={book.node.imageUrl} 
                                 alt="book cover" 
                                 width={220}
                                 
                                 className="object-cover object-left-top inset-0 rounded-l-sm rounded-r-xl  border-l-[6px] border-b-[10px] border-[#0000002f] dark:border-[#ffffff33]"
                                 loading="lazy"
                                 decoding="async"
                              />
                        </CardContent>
                        <CardTitle className="text-lg mt-2">
                           {book.node.title}
                        </CardTitle>
                           <span>{book.node.primaryContributorEdge.node.name}</span>
                        <CardDescription className="flex items-center">
                           <Star className="h-4 w-4 text-yellow-500 mr-1" fill="rgb(234,179,8)" />
                           {book.node.stats.averageRating}
                        </CardDescription>
                     </Card>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselNext className="absolute top-1/2 -right-4 transform -translate-y-1/2  sm:inline-flex hidden text-black" />
            <CarouselPrevious className="absolute top-1/2 -left-4 transform -translate-y-1/2  sm:inline-flex hidden text-black" />
         </Carousel>
         {
            brief &&
            <Button className="absolute top-0 right-2 sm:right-8 bg-gray-800 rounded-full pl-4 pr-2 sm:rounded-md">
               <p className="sm:block hidden">See all</p>
               <ChevronRight color="white" />
            </Button>
         }
      </section>
   )
}