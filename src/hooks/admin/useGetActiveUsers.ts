import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetActiveUsers() {
   const {user,getAccessTokenSilently} = useAuth0();
   return useQuery({
      queryKey: ['stats', 'active-userss'],
      queryFn: async () => {
         const token = await getAccessTokenSilently();

         const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/auth0/stats/active-users`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               }
            }
         );
         return data;
      },

      enabled: !!user ,
      staleTime: 1000 * 60 * 5,

   });
}