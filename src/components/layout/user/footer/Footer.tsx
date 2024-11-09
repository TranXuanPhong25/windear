import { Link } from "react-router-dom";

export default function Footer(){
   return (
      <footer className="dark:bg-gray-700 text-white py-4">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
               <div>
                  <Link to="/" className="text-white hover:text-gray-400 mx-2">Home</Link>
                  <Link to="/privacy-policy" className="text-white hover:text-gray-400 mx-2">Privacy policy</Link>
                  <Link to="/terms-of-service" className="text-white hover:text-gray-400 mx-2">Terms of service</Link>
               </div>
            </div>
         </div>
      </footer>
   )
}