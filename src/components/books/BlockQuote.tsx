import { useQuote } from "@/hooks/book/useQuote"
import LoadingBlock from "../layout/LoadingBlock";
import { useInView } from "react-intersection-observer";
import { Separator } from "../ui/separator";

export default function BlockQuote() {
   const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
   });
   const { isLoading, data: quote, error } = useQuote(inView);
   if (isLoading && !quote) return <LoadingBlock />
   if (error) return <div ref={ref}>Can't get quote data, caused by  {error?.message || "unknown"}</div>
   return (
      <div className="p-4 rounded-lg h-96 w-full flex justify-center items-center " ref={ref}>
         {quote && (
            <div className=" w-full">
               <div className="text-4xl uppercase dark:text-gray-400 font-semibold flex items-center h-hit">
                  <Separator className="mx-4 flex-1" />
                  <p className="">{quote.category}</p>
                  <Separator className="mx-4 flex-1" />
               </div>
               <div className="text-2xl dark:text-gray-300  flex justify-center w-full my-6">
                  <p className="italic text-center max-w-[500px] ">{quote.quote}</p>
               </div>
               <div className="text-3xl uppercase dark:text-gray-400 font-bold flex items-center">
                  <Separator className="mx-4 flex-1" />
                  <p className="">{quote.author}</p>
                  <Separator className="mx-4 w-44" />

               </div>
            </div>
         )}
      </div>
   )
}