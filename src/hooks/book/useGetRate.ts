import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetRate(bookId:string,belongToUser:boolean) {
   const {user,getAccessTokenSilently} = useAuth0();
   return useQuery({
      queryKey: ['rate', bookId],
      queryFn: async () => {
         const token = await getAccessTokenSilently();
         if(!user) return 0;
         const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/review/rate/${bookId}/${encodeURIComponent(user.sub||'')}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               }
            }
         );
         return data;
      },

      enabled: !!user && bookId !== "" &&belongToUser,
      staleTime: 1000 * 60 * 60 , // 1 hour

   });
}