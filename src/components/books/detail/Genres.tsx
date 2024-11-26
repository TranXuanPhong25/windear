import { Link } from 'react-router-dom';
function Genres({ genres, noHeading = false }: { genres: string[], noHeading?: boolean }) {
   return (
      <div className="gap-5  my-2">
         <div>
            {
               !noHeading && <h1 className="text-lg mb-2 font-semibold">Genres</h1>
            }
            {
               genres && genres.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                     {
                        genres && genres.map((genre) => (
                           noHeading ? (
                              <span key={genre}
                                 className="py-1 px-4 rounded-full bg-emerald-500 text-gray-50 hover:bg-emerald-600 hover:text-white flex gap-2 hover:-translate-y-1 transition" >
                                 {genre}
                              </span>
                           ) : (
                              <Link
                                 to={`/browse/genres/${genre}`}
                                 key={genre}
                                 className="py-1 px-4 rounded-full bg-emerald-500 text-gray-50 hover:bg-emerald-600 hover:text-white flex gap-2 hover:-translate-y-1 transition"
                              >
                                 {genre}
                              </Link>
                           )

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
      </div >
   )
}

export default Genres;