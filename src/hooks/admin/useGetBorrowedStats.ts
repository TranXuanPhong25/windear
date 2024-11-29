import {useAuth0} from '@auth0/auth0-react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {AnalyticStat} from "@/models/AnalyticStat.ts";
import {boundInMonthData, fillAnalyticArray} from "@/lib/utils.ts";


export function useGetBorrowedStats() {
    const {getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['stats', 'borrowed'],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const {data, status}: { data: AnalyticStat[], status: number } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/analytic/bookloan/borrow`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (status != 200) return [];
            if (data.length === 0) return [];
            if (data.length === 1) {
                return data;
            }
            const boundedData = boundInMonthData(data);
            const filledData = fillAnalyticArray(boundedData);
            return filledData.map((stat: AnalyticStat) => {
                return {
                    borrowCount: Number(stat.value) ,
                    time: stat.time,
                }
            });
        },
    });
}