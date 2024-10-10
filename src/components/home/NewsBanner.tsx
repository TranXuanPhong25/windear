import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel"

export default function NewsBanner() {
   const plugin = React.useRef(
      Autoplay({
         delay: 5000,
         stopOnInteraction: false
      })
   )

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
            {Array.from({ length: 5 }).map((_, index) => (
               <CarouselItem key={index} className="p-0 cursor-grab">

                  <Card className="border-0 bg-sky-400 overflow-hidden border-none rounded-none">
                     <CardContent className="w-full h-[600px] flex aspect-square items-center justify-center p-6 ">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                     </CardContent>
                  </Card>

               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2" />
         <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2" />
      </Carousel>
   )
}