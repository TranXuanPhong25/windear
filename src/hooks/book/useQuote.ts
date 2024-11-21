import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getQuotes } from "@/lib/quotes";
import { Quote } from "@/models/Quote";
export function useQuote(inview: boolean) {
   return useQuery({
      queryKey: [],
      queryFn: async () => {
         const quoteApiUrl = `https://api.api-ninjas.com/v1/quotes?category=${getQuotes()}`;

         const responseData = await axios(quoteApiUrl, {
            method: 'GET',
            headers: {
               "X-Api-Key" : import.meta.env.VITE_APININJA_QUOTE_KEY,
               'Content-Type': 'application/json',
            },
         }).then(response => response.data)
            .catch((error) => {
               console.error(error);
            })
            
            return responseData[0] as Quote || {};
      },
      enabled: inview,
      staleTime: Infinity, 

   });
}