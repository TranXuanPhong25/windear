import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useCountBookIn30Days() {
   const { user, getAccessTokenSilently } = useAuth0();
   return useQuery({
      queryKey: ['count-last-30-days'],
      queryFn: async () => {
         const token = await getAccessTokenSilently();

         const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/db/books/count/last-30-day`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               }
            }
         );
         return data;
      },
      enabled: !!user,
   });
}