import { Book } from "@/types/Book";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import EditionShow from "./EditionShow";

export default function BookDetails({book}:{book:Book}) {
   return (
      <Accordion type="single" collapsible className=" " >
         <AccordionItem value="item-1" className="border-b-0 w-full max-w-4xl ">
            <AccordionTrigger className="flex justify-start w-fit gap-1">
               Book details 
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-200">
               <div className="flex mt-2">
                  <div >
                     <div>
                        Original title
                     </div>

                  </div>
                  <div className="ml-10 ">
                     {
                        book.work &&
                        <div>
                           {book.work.details.originalTitle}
                        </div>
                     }


                  </div>
               </div>
               <div>
                  <h1 className="text-lg mb-2 mt-6 text-black dark:text-white ">This edition</h1>
               </div>
               <div className="flex">
                  <div className="space-y-1">
                     {
                        book.details && book.details.format &&
                        <p>
                           Format
                        </p>
                     }
                     {
                        book.details && book.details.publicationTime &&
                        <p>
                           Published
                        </p>
                     }
                     {
                        book.details && book.details.isbn &&
                        <p>
                           ISBN
                        </p>
                     }
                     {
                        book.details && book.details.asin &&
                        <p>
                           ASIN
                        </p>
                     }
                     {
                        book.details && book.details.language?.name &&
                        <p>
                           Language
                        </p>
                     }

                  </div>
                  <div className="ml-10 space-y-1">
                     {
                        book.details && book.details.format &&
                        <p>
                           {book.details.numPages} Pages, {book.details.format}
                        </p>
                     }
                     {
                        book.details && book.details.publicationTime &&
                        <p>
                           {new Date(book.details.publicationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} by {book.details.publisher}
                        </p>
                     }
                     {
                        book.details && book.details.isbn &&
                        <p>
                           {book.details.isbn13} {book.details.isbn && <span className="text-gray-500 dark:text-gray-300">(ISBN10: {book.details.isbn})</span>}
                        </p>
                     }
                     {
                        book.details && book.details.asin &&
                        <p>
                           {book.details.asin}
                        </p>
                     }
                     {
                        book.details && book.details.language?.name &&
                        <p>
                           {book.details.language.name}
                        </p>
                     }

                  </div>
               </div>
               <h3 className="text-lg mt-6 mb-2">More edition</h3>
               <EditionShow workId={book.work.id}/>
            </AccordionContent>

         </AccordionItem>
      </Accordion>
   )
}