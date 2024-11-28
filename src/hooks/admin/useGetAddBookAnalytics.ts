import {useAuth0} from '@auth0/auth0-react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {AnalyticStat} from "@/models/AnalyticStat.ts";
import {fillAnalyticArray} from "@/lib/utils.ts";
import {AddBookAnalyticStat} from "@/types/AddBookAnalyticStat.ts";

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export function useGetAddBookAnalytics() {
    const {getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['stats', 'add-book'],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const {data, status}: { data: AnalyticStat[], status: number } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/analytic/db/add-book`,
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

            if (new Date(data[0].time).getTime() + ONE_MONTH > new Date(data[data.length - 1].time).getTime()) {
                data.unshift(
                    {
                        value: "0",
                        time: new Date(new Date(data[data.length - 1].time).getTime() - ONE_MONTH).toISOString().slice(0, 10)
                    }
                )

            }
            const filledData = fillAnalyticArray(data);
            console.log(filledData)
            const convertedData: AddBookAnalyticStat[] =
                filledData.map((stat: AnalyticStat) => {
                    return {
                        count: Number(stat.value),
                        time: stat.time,
                    }
                })

            return convertedData;
        },
    });
}