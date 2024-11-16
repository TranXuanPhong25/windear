import { Link } from 'react-router-dom';
import { Genre } from '../../types/Book';
function Genres({ genres }: { genres: Genre[] }) {
   return (
      <div className="gap-5 max-w-[900px] my-2">
         <div>
            <h1 className="text-lg mb-2 font-semibold">
               Genres
            </h1>
            {
               genres && genres.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                     {
                        genres && genres.map((item) => (
                           <Link to={`/browse/tags/${item.genre.name}`} key={item.genre.name} className="py-1 px-4 rounded-full bg-emerald-500 text-gray-50 hover:bg-emerald-600 hover:text-white flex gap-2 hover:-translate-y-1 transition">
                              {item.genre.name}
                           </Link>
                        ))
                     }
                  </div>
               ) : (
                  <div>
                     <h1 className="text-lg mb-2 font-semibold">
                        Genres not setted yet
                     </h1>
                  </div>
               )
            }
         </div>
      </div>
   )
}

export default Genres;