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

function CustomTick({x, y, payload}:{x?:number, y?:number, payload?: { value:never }}) {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="hsl(var(--custom-tick-color))"
                transform="rotate(-35)"
            >
                {payload?.value}
            </text>
        </g>
    );
}
const chartConfig = {
    count:{
        label:"Count"
    },
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
                            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
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
