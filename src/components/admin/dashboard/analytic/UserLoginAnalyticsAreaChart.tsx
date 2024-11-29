"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import {useGetUserLoginStats} from "@/hooks/admin/useGetUserLoginStats.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";

const chartConfig = {

    value: {
        label: "Count",
        color: "hsl(var(--custom-line-user-color))",
    },
} satisfies ChartConfig
const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export function UserLoginAnalyticsAreaChart() {
    const { data: chartData ,isLoading,error} = useGetUserLoginStats()
    if (isLoading) return <LoadingBlock className="!bg-transparent h-[40vh]"/>
    if (error) return <div>Error: {error.message}</div>
    return (
        <Card className="w-full 1/2 dark:bg-slate-700 shadow-lg">
            <CardHeader>
                <CardHeader>
                    <CardTitle>Daily user active</CardTitle>
                    <CardDescription>{new Date(new Date().getTime() - ONE_MONTH).toDateString()} - {new Date().toDateString()}</CardDescription>
                </CardHeader>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "var(--custom-tick-color)" }}

                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed"/>} />
                        <defs>
                            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-value)"
                                    stopOpacity={1}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-value)"
                                    stopOpacity={0.5}
                                />
                            </linearGradient>

                        </defs>
                        <Area
                            dataKey="value"
                            type="linear"
                            fill="url(#fillValue)"
                            fillOpacity={0.4}
                            stroke="var(--color-mobile)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">

                </div>
            </CardFooter>
        </Card>
    )
}
