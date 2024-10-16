import { Card, CardContent } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react';

interface BookListProps {
   title:string,
   brief?:boolean
}
export default function BookList({ title, brief = false }: BookListProps) {
   return (
      <section className="my-4 sm:my-20 relative w-full sm:px-8 ">
         {title != "" &&
            <header className="text-white text-2xl mb-4 ml-2">
               {title}
            </header>

         }

         <Carousel
            className="w-full cursor-grab"
            opts={{
               align: "start",
               dragFree: true
            }}
         >
            <CarouselContent className="md:gap-8 gap-auto">
               {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem key={index} className="w-[120px] sm:w-[160px] md:w-[250px] basis-auto cursor-default">
                     <div >
                        <Card className="overflow-hidden  border-0 text-white bg-gray-900">
                           <CardContent className="w-full md:h-[350px] sm:h-[250px] h-[180px] flex aspect-square items-center justify-center p-6 ">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                           </CardContent>
                        </Card>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselNext className="absolute top-1/2 -right-4 transform -translate-y-1/2  sm:inline-flex hidden text-black" />
            <CarouselPrevious className="absolute top-1/2 -left-4 transform -translate-y-1/2  sm:inline-flex hidden text-black" />
         </Carousel>
         {
            brief &&
            <Button className="absolute top-0 right-2 sm:right-8 bg-gray-800 rounded-full px-2 sm:rounded-md">
               <p className="sm:block hidden">See all</p>
               <ChevronRight color="white" />
            </Button>
         }
      </section>
   )
}