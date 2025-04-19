"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function SemiPieChart({ chartConfig, chartData }) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col py-0 pb-2 gap-0">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={1}
              stroke="#7192D2"
              startAngle={240}
              endAngle={-60}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Table className="w-full bg-white shadow-md border-none">
          <TableBody>
            <TableRow className="border-b-0">
              <TableCell>
                <div className="border-l-2 border-[#82B4FF] px-2">
                  <p className="text-xs text-[#051922]">REQUESTED</p>
                  <p>
                    <span className="font-semibold text-base text-[#051922]">
                      686.79
                    </span>
                    <span className="text-gray-600 text-xs ml-3">49.34% </span>
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="border-l-2 border-[#F7BE2C] px-2">
                  <p className="text-xs text-[#051922]">USED</p>
                  <p>
                    <span className="font-semibold text-base text-[#051922]">
                    515.09
                    </span>
                    <span className="text-gray-600 text-xs ml-3">37%
                    </span>
                  </p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-b-0">
              <TableCell>
                <div className="border-l-2 border-[#C9F7DC] px-2">
                  <p className="text-xs text-[#051922]">ALLOCATABLE</p>
                  <p>
                    <span className="font-semibold text-base text-[#051922]">
                    1376.34
                    </span>
                    <span className="text-gray-600 text-xs ml-3">98.88% </span>
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="border-l-2 border-[#C9F7DC] px-2">
                  <p className="text-xs text-[#051922]">OVERHEAD</p>
                  <p>
                    <span className="font-semibold text-base text-[#051922]">
                    15.66
                    </span>
                    <span className="text-gray-600 text-xs ml-3">1.13% </span>
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardFooter>
    </Card>
  );
}
