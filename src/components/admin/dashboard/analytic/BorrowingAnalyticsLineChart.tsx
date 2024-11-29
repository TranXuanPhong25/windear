"use client"

import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useGetBorrowedStats} from "@/hooks/admin/useGetBorrowedStats.ts";
import {useGetReturnedStats} from "@/hooks/admin/useGetReturnedStats.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import CustomTick from "@/components/admin/dashboard/analytic/CustomTick.tsx";


const chartConfig = {
    borrowCount: {
        label: "Borrow",
        color: "#0ea5e9",
    },
    returnCount: {
        label: "Return",
        color: "#22c55e",
    }
} satisfies ChartConfig

export function BorrowingAnalyticsLineChart() {
    const {
        data: borrowedStats,
        isLoading: isLoadingBorrowedStats,
        error: errorGetBorrowedStats
    } = useGetBorrowedStats();
    const {
        data: returnedStats,
        isLoading: isLoadingReturnedStats,
        error: errorGetReturnedStats
    } = useGetReturnedStats();
    const chartData = borrowedStats && returnedStats && borrowedStats?.map((stat, index) => {
        return {
            borrowCount: (stat as { borrowCount: number }).borrowCount,
            returnCount: returnedStats[index].returnCount,
            time: stat.time,
        }
    })

    if (isLoadingBorrowedStats || isLoadingReturnedStats) return <LoadingBlock className="!bg-transparent h-[40vh]"/>
    if (errorGetBorrowedStats || errorGetReturnedStats) return <div>Error: {errorGetBorrowedStats?.message || errorGetReturnedStats?.message}</div>
    const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
    return (
        <Card className="w-full xl:flex-1 dark:bg-sidebar shadow-lg">
            <CardHeader>
                <CardTitle>Borrowing stats</CardTitle>
                <CardDescription>{new Date(new Date().getTime() - ONE_MONTH).toDateString()} - {new Date().toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 25,
                            left: 16,
                            right: 16,
                            bottom:40
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}

                            tick={<CustomTick/>}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                        <Line
                            dataKey="borrowCount"
                            type="monotone"
                            stroke="var(--color-borrowCount)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="returnCount"
                            type="monotone"
                            stroke="var(--color-returnCount)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing total borrowed and returned books for the last 30 days
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
