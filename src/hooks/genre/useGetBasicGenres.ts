import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export function useGetBasicGenres() {
    return useQuery({
        queryKey: ['genres-ext', "basic"],
        queryFn: async () => {
            const domain = `${import.meta.env.VITE_BASE_API_URL}`;
            const userReviewUrl = `${domain}/external/tags`;
            const responseData = await axios.get(userReviewUrl)
                .then(response => response.data)
                .catch((error) => {
                    console.error(error.response.data);
                })
            return responseData || [];
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
}