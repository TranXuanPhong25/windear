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
import {useGetAddBookAnalytics} from "@/hooks/admin/useGetAddBookAnalytics.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import CustomTick from "@/components/admin/dashboard/analytic/CustomTick.tsx";


const chartConfig = {
    count:{
        label:"Count"
    },
    //too lazy to remove this
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-2))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export function AddBookLineChart() {
    const {data: chartData, isLoading, error} = useGetAddBookAnalytics();

    if (isLoading) return <LoadingBlock className="!bg-transparent h-[40vh]"/>
    if (error) return <div>Error: {error.message}</div>
    return (
        <Card className="w-full xl:w-1/2 dark:bg-sidebar shadow-lg">
            <CardHeader>
                <CardTitle>Added book count</CardTitle>
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
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}

                            tick={<CustomTick/>}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Line
                            dataKey="count"
                            type="linear"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >

                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total book added for the last 30 days
                </div>
            </CardFooter>
        </Card>
    )
}
