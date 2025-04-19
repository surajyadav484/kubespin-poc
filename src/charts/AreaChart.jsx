"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import StatsCard from "@/components/StatsCard";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};

export default function CustomAreaChart({ selectedUsageType, chartData, stats }) {
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <div className=" h-full flex">
          <StatsCard stats={stats} />
          <div className="h-full w-[85%]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              {/* Adjusted height */}
              <AreaChart
                className="h-full"
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                {selectedUsageType?.includes("used") && (
                  <Area
                    dataKey="used"
                    type="natural"
                    fill="var(--chart-5)"
                    stroke="var(--color-chart-5)"
                    stackId="a"
                  />
                )}
                {selectedUsageType?.includes("requested") && (
                  <Area
                    dataKey="requested"
                    type="natural"
                    fill="var(--color-chart-4)"
                    stroke="var(--color-chart-4)"
                    stackId="a"
                  />
                )}
                {selectedUsageType?.includes("provisioned") && (
                  <Area
                    dataKey="provisioned"
                    type="natural"
                    fillOpacity={0}
                    stroke="blue"
                    stackId="a"
                  />
                )}
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
