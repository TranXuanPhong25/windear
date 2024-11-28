import {useAuth0} from '@auth0/auth0-react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {AnalyticStat} from "@/models/AnalyticStat.ts";
import {fillAnalyticArray} from "@/lib/utils.ts";


export function useGetReturnedStats() {
    const {getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['stats', 'returned'],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const {data, status}: { data: AnalyticStat[], status: number } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/analytic/bookloan/return`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (status != 200) return [];
            const filledData = fillAnalyticArray(data);
            return filledData.map((stat: AnalyticStat) => {
                return {
                    returnCount: Number(stat.value),
                    time: stat.time,
                }
            });
        },
    });
}