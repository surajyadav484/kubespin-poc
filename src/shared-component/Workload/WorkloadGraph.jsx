import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import chartData from "../../data.json";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
    Snapshots: {
        label: "Snapshots",
        color: "blue",
    },
    Ingestor: {
        label: "Ingestor",
        color: "green",
    },
    Scalator: {
        label: "Scalator",
        color: "red",
    },
    Reporter: {
        label: "Reporter",
        color: "yellow",
    },
    ExternalWorkerSupport: {
        label: "ExternalWorkerSupport",
        color: "violet",
    },
};

export default function WorkloadGraph() {
    return (
        <Card>
            <CardHeader>
                <CardDescription>COMPUTE COST PER WORKLOAD</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="Date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="Snapshots"
                            type="linear"
                            stroke={chartConfig.Snapshots.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="Ingestor"
                            type="linear"
                            stroke={chartConfig.Ingestor.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="Scalator"
                            type="linear"
                            stroke={chartConfig.Scalator.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="Reporter"
                            type="linear"
                            stroke={chartConfig.Reporter.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="ExternalWorkerSupport"
                            type="linear"
                            stroke={chartConfig.ExternalWorkerSupport.color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}