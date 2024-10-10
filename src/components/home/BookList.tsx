import { Card, CardContent } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel"

export default function BookList({title}: {title: string}) {
   return (
      <section className="my-20">
         <header className="text-white text-2xl mb-4">
            {title}
         </header>
         <Carousel
            className="w-full cursor-grab"
            opts={{
               align: "start",
            }}
         >
            <CarouselContent className="gap-8 ">
               {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/5 cursor-default">
                     <div >
                        <Card className="overflow-hidden  border-0 text-white bg-gray-900">
                           <CardContent className="w-full h-[300px] flex aspect-square items-center justify-center p-6 ">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                           </CardContent>
                        </Card>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselNext className="absolute top-1/2 -right-4 transform -translate-y-1/2" />
            <CarouselPrevious className="absolute top-1/2 -left-4 transform -translate-y-1/2" />
         </Carousel>
      </section>
   )
}