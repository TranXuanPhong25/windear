"use client"

import {TrendingUp} from "lucide-react"
import {CartesianGrid, LabelList, Line, LineChart, XAxis} from "recharts"

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
import {useGetAddBookAnalytics} from "@/hooks/admin/useGetAddBookAnalytics.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function AddBookLineChart() {
    const {data:chartData,isLoading,error}= useGetAddBookAnalytics();
    if(isLoading) return <LoadingBlock className="!bg-transparent h-[40vh]"/>
    if(error) return <div>Error: {error.message}</div>
    return (
        <Card>
            <CardHeader>
                <CardTitle>Line Chart - Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="time"
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
