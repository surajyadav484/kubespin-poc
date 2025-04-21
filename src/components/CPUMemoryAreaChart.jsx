import CustomAreaChart from "@/charts/AreaChart";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ChartLine, ChartNoAxesColumn } from "lucide-react";
import CustomBarChart from "@/charts/CustomBarChar";

const chartData = {
  "1hrs": {
    stats: {
      avgProvisioned: {title:'AVG. PROVISIONED', value: "1369.72", unit: "CPU/min" },
      avgRequested: {title:'AVG. REQUESTED', value: "604.42", unit: "CPU/min" },
      avgUsed: {title:'AVG. USED', value: "453.31", unit: "CPU/min" },
    },
    data: [
      { month: "10m", requested: 186, used: 80, provisioned: 390 },
      { month: "20m", requested: 305, used: 200, provisioned: 490 },
      { month: "30m", requested: 237, used: 120, provisioned: 360 },
      { month: "40m", requested: 73, used: 190, provisioned: 460 },
      { month: "50m", requested: 209, used: 130, provisioned: 467 },
      { month: "1h", requested: 214, used: 140, provisioned: 500 },
    ],
  },
  "24hrs": {
    stats: {
      avgProvisioned: {title:'AVG. PROVISIONED', value: "1299.68", unit: "CPU/h" },
      avgRequested: {title:'AVG. REQUESTED', value: "651.52", unit: "CPU/h" },
      avgUsed: {title:'AVG. USED', value: "488.64", unit: "CPU/h" },
    },
    data: Array.from({ length: 24 }, (_, i) => ({
      month: `${i + 1}h`,
      requested: Math.floor(Math.random() * 300) + 100,
      used: Math.floor(Math.random() * 200) + 50,
      provisioned: Math.floor(Math.random() * 400) + 100,
    })),
  },
  "7days": {
    stats: {
      avgProvisioned: {title:'AVG. PROVISIONED', value: "1364.91", unit: "CPU/d" },
      avgRequested: {title:'AVG. REQUESTED', value: "720.72", unit: "CPU/d" },
      avgUsed: {title:'AVG. USED', value: "540.54", unit: "CPU/d" },
    },
    data: [
      { month: "1d", requested: 186, used: 80, provisioned: 390 },
      { month: "2d", requested: 305, used: 200, provisioned: 490 },
      { month: "3d", requested: 237, used: 120, provisioned: 360 },
      { month: "4d", requested: 73, used: 190, provisioned: 460 },
      { month: "5d", requested: 209, used: 130, provisioned: 467 },
      { month: "6d", requested: 214, used: 140, provisioned: 500 },
      { month: "7d", requested: 325, used: 120, provisioned: 234 },
    ],
  },
  "30days": {
    stats: {
      avgProvisioned: {title:'AVG. PROVISIONED', value: "1319.48", unit: "CPU/d" },
      avgRequested: {title:'AVG. REQUESTED', value: "676.08", unit: "CPU/d" },
      avgUsed: {title:'AVG. USED', value: "507.06", unit: "CPU/d" },
    },
    data: Array.from({ length: 30 }, (_, i) => ({
      month: `${i + 1}d`,
      requested: Math.floor(Math.random() * 300) + 100,
      used: Math.floor(Math.random() * 200) + 50,
      provisioned: Math.floor(Math.random() * 400) + 100,
    })),
  },
};
const CPUMemoryAreaChart = () => {
  const [selectedChartType, setSelectedChartType] = useState("lineChart");
  const [selectedUsageType, setSelectedUsageType] = useState([
    "provisioned",
    "requested",
    "used",
  ]);
  const [selectedDuration, setSelectedDuration] = useState("1hrs");
  console.log("🚀 ~ CPUMemoryAreaChart ~ selectedDuration:", selectedDuration);

  const handleUsageTypeChange = (checked, value) => {
    if (checked) {
      setSelectedUsageType((prev) => [...prev, value]);
    } else {
      setSelectedUsageType((prev) => {
        const temp = prev.filter((item) => item !== value);
        return temp;
      });
    }
  };

  return (
    <div>
      <div className="flex gap-x-5 justify-between">
        {/* Tabs */}
        <div className="w-[60%]">
          <Tabs
            value={selectedDuration}
            onValueChange={(value) => setSelectedDuration(value)}
          >
            <TabsList className="grid grid-cols-12 gap-2 w-full  ">
              <TabsTrigger value="1hrs">1 Hour</TabsTrigger>
              <TabsTrigger value="24hrs">24 Hour</TabsTrigger>
              <TabsTrigger value="7days">7 Days</TabsTrigger>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
            </TabsList>
            <TabsContent value="account"></TabsContent>
            <TabsContent value="password"></TabsContent>
          </Tabs>
          <hr className="text-gray-500" />
        </div>
        <div className="w-[35%]">
          <div className="flex items-center justify-center gap-x-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="provisioned"
                value="provisioned"
                checked={selectedUsageType.includes("provisioned")}
                onCheckedChange={(value) =>
                  handleUsageTypeChange(value, "provisioned")
                }
              />
              <label
                htmlFor="provisioned"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Provisioned
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requested"
                checked={selectedUsageType.includes("requested")}
                onCheckedChange={(value) =>
                  handleUsageTypeChange(value, "requested")
                }
              />
              <label
                htmlFor="requested"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Requested
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="used"
                checked={selectedUsageType.includes("used")}
                onCheckedChange={(value) =>
                  handleUsageTypeChange(value, "used")
                }
              />
              <label
                htmlFor="used"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Used
              </label>
            </div>
            <ToggleGroup
              type="single"
              value={selectedChartType}
              onValueChange={(value) => {
                setSelectedChartType(value);
              }}
              className="bg-gray-200 px-0.5 py-1 flex h-7 gap-x-0.5"
            >
              <ToggleGroupItem
                value="lineChart"
                aria-label="Toggle bold"
                className="rounded-sm h-6 p-1"
              >
                <ChartLine className="h-3 w-3" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="barChart"
                aria-label="Toggle italic"
                className="rounded-sm h-6 p-1"
              >
                <ChartNoAxesColumn className="h-3 w-3" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <div>
        {selectedChartType === "barChart" ? (
          <>
            <div className="mt-4 h-[250px]">
              <CustomBarChart
                selectedUsageType={selectedUsageType}
                chartData={chartData[selectedDuration]?.data}
                stats={chartData[selectedDuration]?.stats}
              />
            </div>
            <div className="mt-4 h-[250px]">
              <CustomBarChart
                selectedUsageType={selectedUsageType}
                chartData={chartData[selectedDuration]?.data}
                stats={chartData[selectedDuration]?.stats}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 h-[250px]">
              <CustomAreaChart
                selectedUsageType={selectedUsageType}
                chartData={chartData[selectedDuration]?.data}
                stats={chartData[selectedDuration]?.stats}
              />
            </div>
            <div className="mt-4 h-[250px]">
              <CustomAreaChart
                selectedUsageType={selectedUsageType}
                chartData={chartData[selectedDuration]?.data}
                stats={chartData[selectedDuration]?.stats}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CPUMemoryAreaChart;
