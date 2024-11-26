import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetNewReleases() {
    return useQuery({
        queryKey: ['new-release'],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/db/books/new-releases`
            );
            return data;
        },
        staleTime: 1000 *60*60,
    });
}