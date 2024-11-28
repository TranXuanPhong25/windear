import React, {useEffect} from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@radix-ui/react-label";
import {SquareArrowOutUpRight, Star} from "lucide-react";
import StarRating from '@/components/books/detail/StarRating.tsx';
import {useGetMyShelves} from "@/hooks/shelves/useGetMyShelves.ts";
import ShelfAction from '@/components/books/shelves/ShelfAction.tsx';
import {Shelf} from "@/models/Shelf.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";

const readingList = ["Want to read", "Currently reading", "Read"];
export default function Shelves() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ref = targetRef.current;
        const handleResize = () => {
            if (ref) {
                ref.style.height = 'auto';
                ref.style.height = ref.scrollHeight + 'px';
            }
        }
        document.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            document.removeEventListener('resize', handleResize);


        }
    }, []);
    useEffect(() => {
        document.title = "My Shelves";

    }, []);
    const {
        data: {
            shelves: userShelves = []
        } = {
            shelves: []
        }, isLoading: isLoadingShelvesData
    } = useGetMyShelves();
    const [displayedShelves, setDisplayedShelves] = React.useState<Shelf[]>(userShelves);
    const [criteria, setCriteria] = React.useState<string[]>([]);
    useEffect(() => {
        if (criteria.length === 0) {
            setDisplayedShelves(userShelves);
        } else {
            setDisplayedShelves(userShelves.filter((shelf: Shelf) => criteria.includes(shelf.name)));
        }
    }, [criteria, userShelves]);
    const handleCheckboxChange = (value: string) => {
        if (criteria.includes(value)) {
            setCriteria(criteria.filter((c) => c !== value));
        } else {
            setCriteria([...criteria, value]);
        }
    }
    return (
        <div className="flex flex-col lg:flex-row dark:text-white pr-2 max-w-5xl mx-auto min-h-[90vh]">

            <div className="w-full lg:w-[260px]  lg:sticky h-fit top-24z">
                <Accordion type="multiple" defaultValue={["item-1"]} className=" ">
                    <AccordionItem value="item-1" className=" border-b-0 w-full max-w-[900px]  ">
                        <AccordionTrigger className="py-2 text-xl">
                            My reading lists
                        </AccordionTrigger>
                        <AccordionContent className="pl-3 pb-3 border-b-2 dark:border-gray-300/20 border-gray-400/50">
                            {
                                readingList.map((shelf, index) => (
                                    <div className="my-1 flex " key={index}>
                                        <Checkbox id={"shelf-" + shelf} className="mt-[1px]"
                                                  onCheckedChange={() => handleCheckboxChange(shelf)}/>
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
                                isLoadingShelvesData ? <LoadingBlock/> :
                                    userShelves
                                        .filter((shelf: Shelf) =>
                                            shelf.name != "Want to read" &&
                                            shelf.name != "Currently reading" &&
                                            shelf.name != "Read")
                                        .map((shelf: Shelf) => (
                                            <div className="my-1 flex ">
                                                <Checkbox id={"shelf-" + shelf.name} className="mt-[1px]"
                                                          onCheckedChange={() => handleCheckboxChange(shelf.name)}/>
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
            <div className="flex flex-wrap w-full lg:ml-6">
                {
                    displayedShelves.map((shelf) => (
                        <div key={shelf.name} className="w-full ">
                            <h2 className="text-2xl ">{shelf.name}</h2>
                            <div className="flex flex-wrap md:ml-6 mt-6">
                                {
                                    shelf.books.length === 0 ? (
                                        <p className="text-lg dark:text-gray-300">No books in this shelf yet</p>
                                    ) : (
                                        isLoadingShelvesData ? <LoadingBlock/> : shelf.books.map((book) => (
                                            <div key={book.id + shelf.name}
                                                 className="flex  w-full md:my-10 mt-6 border-b-2 dark:border-gray-300/20 border-gray-400/50 relative items-center dark:bg-slate-600 rounded-xl bg-zinc-200/30   ">
                                                <Link to={"/books/" + book.id}
                                                >
                                                    <img
                                                        src={book.imageUrl || "/book-cover-unavailable-placeholder.jpg"}
                                                        alt={book.title}
                                                        className="min-[525px]:block hidden object-fit w-[100px] md:w-[200px] rounded-r-xl rounded-l-sm  md:-mt-8 -mb-2 ml-2 md:ml-4 shadow-[0px_7px_20px_0px_rgba(10,10,10,0.4)] "/>
                                                </Link>
                                                <div className="  w-full md:h-[240px]  pl-2 pr-4 py-1 min-[535px]:ml-6  rounded-lg ">
                                                    <div className=' flex flex-col-reverse  min-[535px]:flex-col  justify-between h-full'>

                                                        <div className=" w-full lg:max-w-[424px]  xl:max-w-[434px]"
                                                             ref={targetRef}>
                                                            <Link to={"/books/" + book.id}
                                                                  className=" text-2xl lg:text-3xl break-words md:pr-5 ">{book.title}</Link>
                                                            <h4><span
                                                                className='dark:text-gray-200'>by</span> {book.author} - {new Date(book.releaseDate).getFullYear()}
                                                            </h4>
                                                            {/* <h4 className='text-gray-200'>1999, 304 pages</h4> */}
                                                            <div className="flex items-center ">
                                                                <h4 className="text-lg">{book.rating}</h4>
                                                                <Star
                                                                    className='fill-yellow-400 text-transparent ml-1'/>
                                                            </div>
                                                        </div>

                                                        <div className='flex justify-between h-fit mb-8 min-[535px]:block min-[535px]:mb-0'>
                                                            <Link to={"/books/" + book.id} className="min-[535px]:hidden block"
                                                            >
                                                                <img
                                                                    src={book.imageUrl || "/book-cover-unavailable-placeholder.jpg"}
                                                                    alt={book.title}
                                                                    className=" object-fit w-[100px] md:w-[200px] rounded-r-xl rounded-l-sm  md:-mt-8 -mb-2 ml-2 md:ml-4 shadow-[0px_7px_20px_0px_rgba(10,10,10,0.4)] "/>
                                                            </Link>
                                                           <div className='flex justify-between items-center min-[535px]:flex-row flex-col-reverse'>
                                                               <StarRating bookId={book.id}
                                                                           ratable
                                                                           onChange={() => {
                                                                           }}

                                                               />
                                                               <div>
                                                                   <h5>Added at: {new Date(book.addedDate).toLocaleDateString()}</h5>
                                                                   <ShelfAction customClass="!mt-1 w-full " book={book}/>
                                                                   {/* <GetBook /> */}
                                                               </div>
                                                           </div>

                                                        </div>

                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>
                                                <div>
                                                    <Link to={"/books/" + book.id}
                                                          className="absolute top-6 right-4 !bg-transparent md:block hidden"><SquareArrowOutUpRight/></Link>
                                                </div>
                                            </div>
                                        ))

                                    )
                                }
                            </div>
                            {
                                displayedShelves.length !== 1 && <Separator className="my-3"/>
                            }
                        </div>
                    ))
                }
            </div>

        </div>


    );
}