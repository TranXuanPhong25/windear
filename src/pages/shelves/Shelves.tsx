import {useEffect} from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@radix-ui/react-label";
import {SquareArrowOutUpRight, Star} from "lucide-react";
import StarRating from '@/components/books/StarRating';
import {useGetMyShelves} from "@/hooks/shelves/useGetMyShelves.ts";
import ShelfAction from '@/components/books/ShelfAction';
import {Shelf} from "@/models/Shelf.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
const readingList = [ "Want to read", "Currently reading", "Read" ];
export default function Shelves() {
    useEffect(() => {
        document.title = "Shelves - Windear library";
    }, []);
    const {
        data, isLoading: isLoadingShelvesData
    } = useGetMyShelves();
    const userShelves: Shelf[] = data?.shelves || [];

    return (
        <div className="flex dark:text-white pr-2 max-w-5xl mx-auto">

            <div className="w-[260px] ml-10">
                <Accordion type="multiple" defaultValue={["item-1"]} className=" ">
                    <AccordionItem value="item-1" className=" border-b-0 w-full max-w-[900px]  ">
                        <AccordionTrigger className="py-2 text-xl">
                            My reading lists
                        </AccordionTrigger>
                        <AccordionContent className="pl-3 pb-3 border-b-2 dark:border-gray-300/20 border-gray-400/50">
                            {
                                readingList.map((shelf,index) => (
                                    <div className="my-1 flex ">
                                        <Checkbox id={"shelf-" + shelf} className="mt-[1px]"/>
                                        <div className="ml-1 break-words break-all ">
                                            <Label htmlFor={"shelf-" + shelf}>{shelf}</Label>
                                            &nbsp;
                                            <span>({userShelves[index]?.books.length})</span>
                                        </div>
                                    </div>
                                ))
                            }



                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b-0 w-full max-w-[900px] ">

                        <AccordionTrigger className="py-2 text-xl">
                            My shelves
                        </AccordionTrigger>
                        <AccordionContent className="pl-3  pb-3 border-b-2 dark:border-gray-300/20 border-gray-400/50">
                            {
                                isLoadingShelvesData ?<LoadingBlock/>:  userShelves.filter(shelf =>
                                    shelf.books.length > 0 &&
                                    (shelf.name != "Want to read" &&
                                        shelf.name != "Currently reading" &&
                                        shelf.name != "Read"))
                                    .map((shelf: Shelf) => (
                                        <div className="my-1 flex ">
                                            <Checkbox id={"shelf-" + shelf.name} className="mt-[1px]"/>
                                            <div className="ml-1 break-words break-all ">
                                                <Label htmlFor={"shelf-" + shelf.name}>{shelf.name}</Label>
                                                &nbsp;
                                                <span>({shelf.books.length})</span>
                                            </div>
                                        </div>
                                    ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
            <div className="flex flex-wrap w-full ml-4">
                {
                    userShelves.filter(shelf => shelf.books.length > 0).map((shelf) => (
                        <div key={shelf.name} className="w-full ">
                            <h2 className="text-2xl ">{shelf.name}</h2>
                            <div className="flex flex-wrap ml-6 mt-6">
                                {
                                    isLoadingShelvesData?<LoadingBlock/>: shelf.books.map((book) => (
                                        <div key={book.id}
                                             className="flex w-full mt-10 mb-10 border-b-2 dark:border-gray-300/20 border-gray-400/50 relative items-center dark:bg-gray-700 rounded-xl">
                                            <img src={book.imageUrl||"/book-cover-unavailable-placeholder.jpg"} alt={book.title}
                                                 className="object-fit w-[200px] rounded-r-xl rounded-l-sm  -mt-8 -mb-2  ml-4 shadow-[0px_7px_20px_0px_rgba(10,10,10,0.4)] "/>
                                            <div className="  w-full h-[240px]  pl-2 pr-4 py-1 ml-3 rounded-lg ">
                                                <div className='flex flex-col justify-between h-full'>
                                                    <div>
                                                        <h3 className="text-3xl pr-4">{book.title}</h3>

                                                        <h4><span
                                                            className='text-gray-200'>by</span> {book.author} - {new Date(book.releaseDate).getFullYear()}
                                                        </h4>
                                                        {/* <h4 className='text-gray-200'>1999, 304 pages</h4> */}
                                                        <div className="flex items-center ">
                                                            <h4 className="text-lg">{book.rating}</h4>
                                                            <Star className='fill-yellow-400 text-transparent ml-1'/>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between items-center'>

                                                        <StarRating bookId={book.id}
                                                                    ratable
                                                                    onChange={() => {}}

                                                        />
                                                        <div >
                                                            <h4>AddedDate: {new Date(book.addedDate).toLocaleDateString()}</h4>
                                                            <ShelfAction customClass="!mt-1 w-full " book={book}/>
                                                            {/* <GetBook /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                            <div>
                                                <Link to={"/books/"+book.id} className="absolute top-6 right-4 !bg-transparent" ><SquareArrowOutUpRight /></Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Separator className="my-3"/>
                        </div>
                    ))
                }
            </div>

        </div>


    );
}