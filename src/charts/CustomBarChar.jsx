"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

export default function CustomBarChart({
  selectedUsageType,
  chartData,
  stats,
}) {
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <div className=" h-full flex">
          <StatsCard stats={stats} />
          <div className="h-full w-[90%]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 1500]}
                //   unit=" CPU"
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                {/* Filled bars */}
                {selectedUsageType?.includes("used") && (
                  <Bar
                    dataKey="used"
                    stackId="a"
                    //   stroke="#4285F4"
                    //   strokeWidth={1}
                    fill="#C4F0DC" // green-ish
                    //   radius={[8, 8, 0, 0]}
                    radius={[0, 0, 0, 0]}
                    barSize={30}
                  />
                )}

                {selectedUsageType?.includes("requested") && (
                  <Bar
                    dataKey="requested"
                    stackId="a"
                    //   stroke="#4285F4"
                    //   strokeWidth={1}
                    fill="#9ED1FB" // blue-ish
                    //   radius={[8, 8, 0, 0]}
                    radius={[0, 0, 0, 0]}
                  />
                )}
                {/* Transparent outline bar on top */}
                {selectedUsageType?.includes("provisioned") && (
                  <Bar
                    dataKey="provisioned"
                    stackId="a"
                    fill="transparent"
                    stroke="#4285F4"
                    strokeWidth={1}
                    radius={[8, 8, 0, 0]}
                  />
                )}
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
