import {useEffect} from "react";

export default function BookNotFound() {
   setTimeout(() => {
      window.history.back();
   },5000)
   useEffect(() => {
        document.title = "Book not found";
   }, []);
   return (
      <div className="flex center justify-center items-center h-[70vh]">
         <div>
            <h1 className="text-7xl text-center">Book not found</h1>
            <p className="text-2xl text-center">The book you are looking for is not available</p>
            <p className="text-xl text-center">You will be redirect to previous page</p>
         </div>
      </div>
   )
}