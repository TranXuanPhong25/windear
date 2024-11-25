import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetInternalBooks() {
   const { user, getAccessTokenSilently } = useAuth0();
   return useQuery({
      queryKey: ['internal','books'],
      queryFn: async () => {
         const token = await getAccessTokenSilently();

         const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/db/books`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               }
            }
         );
         return data;
      },
      enabled: !!user,
      refetchInterval: 1000 * 60 * 5, // 5 minutes
   });
}