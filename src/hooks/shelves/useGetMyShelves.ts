import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useGetMyShelves() {
   const { user,getAccessTokenSilently } = useAuth0();
   return useQuery({
      queryKey: ['shelves', user?.sub],
      queryFn: async () => {
         if(!user?.sub){
            return [];
         }
         const domain = `${import.meta.env.VITE_BASE_API_URL}`;
         const accessToken = await getAccessTokenSilently();
         const encodedUserId = encodeURIComponent( user?.sub);
         const userReviewUrl = `${domain}/shelves/${encodedUserId}`;
         const responseData = await axios(userReviewUrl, {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${accessToken}`,
               'Content-Type': 'application/json',
            },
         }).then(response => response.data)
            .catch((error) => {
               return error.response.data;
            })
         if(responseData){
            return responseData.filter((shelf:string)=>!(["Want to read","Currently reading","Read"].includes(shelf)));
         }
         return [];
      },
      enabled: !!user,
      staleTime: 1000 * 60 * 60 * 10,
   });
}