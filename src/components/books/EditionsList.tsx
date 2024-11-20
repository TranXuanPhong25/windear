import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react';
import React from "react";
import Edition from "@/types/Edition";
import { Link } from "react-router-dom";
import ImageWithFallback from "../notfound/ImageWithFallback";

interface BookListProps {
   books?: Edition[];
   brief?: boolean,
   className?: string
}

export default function EditionList({ books = [], brief = false, className = "my-4 sm:pl-4" }: BookListProps) {
   const container = React.useRef<HTMLDivElement>(null);
   function handleResize() {
      if (!container.current) return;
      if (window.innerWidth < 768) {
         container.current.style.width = "100%"
         return;
      }
      container.current.style.width = (window.innerWidth - 360) + "px"
      console.log(container.current.style.width)
   }
   React.useEffect(() => {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => {
         window.removeEventListener("resize", handleResize)
      }
   }, [])
   return (
      <section className={className + " relative w-full "}>
         <Carousel
            // style={{width:"500px"}}
            ref={container}
            className="w-full max-w-4xl cursor-grab"
            opts={{
               align: "start",
               dragFree: true,

            }}
         >
            <CarouselContent className="md:gap-2 pl-2 md:pl-0 w-full ">
               {books && books.map((book, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-[45%] min-[900px]:basis-[35%] lg:basis-[27%]   cursor-default p-0">
                     <Link to={`/books/${book.node.legacyId}`}>
                        <Card className="overflow-hidden   !bg-transparent rounded-none shadow-none border-0 p-2">
                           <CardContent className=" min-h-60 flex items-center justify-center p-0 ">
                              <ImageWithFallback
                                 src={book.node.imageUrl}
                                 alt="book cover"
                                 width={220}
                                 className="object-cover object-left-top inset-0 rounded-l-sm rounded-r-xl  border-l-[6px] border-b-[10px] border-[#0000002f] dark:border-[#ffffff33] "
                                 fallbackSrc="/book-cover-unavailable-placeholder.jpg"
                              />
                           </CardContent>
                           <CardTitle className="text-[1rem] mt-2 text-gray-600">
                              <span className="block">{book.node.details.format}</span>
                              <span className="block">{book.node.details.publisher}</span>
                              <span className="block">{new Date(book.node.details.publicationTime).getFullYear()}</span>
                           </CardTitle>
                        </Card>

                     </Link>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselNext className="absolute top-1/2 -right-0 transform -translate-y-1/2  sm:inline-flex hidden text-black" />
            <CarouselPrevious className="absolute top-1/2 -left-0 transform -translate-y-1/2  sm:inline-flex hidden text-black" />
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