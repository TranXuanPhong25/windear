
export default function Footer(){
   return (
      <footer className="bg-gray-800 text-white py-4">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
               <div>
                  <h3 className="text-lg">Windear Library</h3>
                  <p className="text-sm">All rights reserved &copy; 2024</p>
               </div>
               <div>
                  <a href="/" className="text-white hover:text-gray-400 mx-2">Home</a>
                  <a href="/about" className="text-white hover:text-gray-400 mx-2">About</a>
                  <a href="/contact" className="text-white hover:text-gray-400 mx-2">Contact</a>
               </div>
            </div>
         </div>
      </footer>
   )
}