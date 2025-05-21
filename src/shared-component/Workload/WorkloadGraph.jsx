import React, { useState, useEffect } from "react";
import {
  format,
  parse,
  isWithinInterval,
  subDays,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import ReactSelect from "react-select";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import jsonData from "../../data.json";

// For a more realistic dataset that shows all records
const fullData = jsonData;

export default function DateRangePickerWithData() {
  const today = startOfDay(new Date());

  const [dateRange, setDateRange] = useState({
    from: startOfMonth(today),
    // from: subDays(today, 29),
    to: today,
  });

  const [filteredData, setFilteredData] = useState([]);
  const [activeMetric, setActiveMetric] = useState("");

  // Parse full JSON data and convert date strings to proper Date objects
  const parsedData = fullData.map((item) => {
    // For DD/MM/YYYY format
    const dateParts = item.Date.split("/");
    const parsedDate = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );

    return {
      ...item,
      parsedDate,
      formattedDate: format(parsedDate, "MMM dd"),
      displayDate: format(parsedDate, "dd"),
    };
  });

  // Presets configuration
  const presets = [
    {
      name: "This Month",
      getValue: () => ({
        from: startOfMonth(today),
        to: today,
      }),
    },
    {
      name: "Last 7 Days",
      getValue: () => ({
        from: subDays(today, 6),
        to: today,
      }),
    },
    {
      name: "Last Week",
      getValue: () => {
        const lastWeekStart = startOfWeek(subDays(today, 7));
        const lastWeekEnd = endOfWeek(subDays(today, 7));
        return {
          from: lastWeekStart,
          to: lastWeekEnd,
        };
      },
    },
    {
      name: "Last 2 Weeks",
      getValue: () => ({
        from: subDays(today, 13),
        to: today,
      }),
    },
    {
      name: "Last 30 Days",
      getValue: () => ({
        from: subDays(today, 29),
        to: today,
      }),
    },
    {
      name: "Last Month",
      getValue: () => {
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const lastMonthEnd = endOfMonth(subMonths(today, 1));
        return {
          from: lastMonthStart,
          to: lastMonthEnd,
        };
      },
    },
  ];

  const handlePresetChange = (presetName) => {
    const preset = presets.find((p) => p.name === presetName);
    if (preset) {
      const newDateRange = preset.getValue();
      setDateRange(newDateRange);
    }
  };

  const metrics = [
    "Snapshots",
    "Ingestor",
    "Scalator",
    "Reporter",
    "ExternalWorkerSupport",
  ];
  const metricColors = {
    Snapshots: "#2563eb",
    Ingestor: "#00CFFF",
    Scalator: "#D3C6FF",
    Reporter: "#FFD580",
    ExternalWorkerSupport: "#8FF0B2",
  };

  const metricOptions = metrics?.map((metric) => ({
    value: metric,
    label: metric,
  }));

  // Filter data based on selected date range
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const filtered = parsedData.filter((item) =>
        isWithinInterval(item.parsedDate, {
          start: dateRange?.from,
          end: dateRange?.to,
        })
      );

      // Sort the filtered data by date for the chart
      const sortedFiltered = [...filtered].sort(
        (a, b) => a.parsedDate - b.parsedDate
      );
      setFilteredData(sortedFiltered);
    }
  }, [dateRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-sm">
          {/* <p className="font-medium text-gray-900">{label}</p> */}
          <p className="font-medium text-gray-900">
            {payload[0]?.payload?.formattedDate}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="flex justify-between text-sm gap-10"
            >
              <span>{entry.name}</span> <span>${entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full mb-5">
      <Card>
        <CardHeader className="shadow-xs">
          <CardTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
              <div className="border-l-4 border-[#2563eb] px-4 py-3 bg-white rounded">
                <div className="text-sm font-light mb-1">Snapshots</div>
                <div className="text-[20px] font-semibold">$56.39</div>
              </div>
              <div className="border-l-4 border-[#10b981] px-4 py-3 bg-white rounded">
                <div className="text-sm font-light mb-1">Ingestor</div>
                <div className="text-[20px] font-semibold">$25.03</div>
              </div>
              <div className="border-l-4 border-[#8b5cf6] px-4 py-3 bg-white rounded">
                <div className="text-sm font-light mb-1">Scalator</div>
                <div className="text-[20px] font-semibold">$7.85</div>
              </div>
              <div className="border-l-4 border-[#eab308] px-4 py-3 bg-white rounded">
                <div className="text-sm font-light mb-1">Reporter</div>
                <div className="text-[20px] font-semibold">$20.74</div>
              </div>
              <div className="border-l-4 border-[#ef4444] px-4 py-3 bg-white rounded">
                <div className="text-sm font-light mb-1 truncate">
                  External Worker Sup
                </div>
                <div className="text-[20px] font-semibold">$29.21</div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div className="w-full md:w-64">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange?.to ? (
                        <>
                          {format(dateRange?.from, "MMM dd, yyyy")} -{" "}
                          {format(dateRange?.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(dateRange?.from, "MMM dd, yyyy")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-2 border-b">
                    <Select onValueChange={handlePresetChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a preset" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {presets.map((preset) => (
                          <SelectItem key={preset.name} value={preset.name}>
                            {preset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3">
                    <Calendar
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-md">Compute Cost Per Workload</div>
                <div>
                  <ReactSelect
                    options={metricOptions}
                    isClearable
                    value={
                      activeMetric
                        ? { value: activeMetric, label: activeMetric }
                        : null
                    }
                    onChange={(selectedOption) =>
                      setActiveMetric(
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                    placeholder="Select metric"
                    className="w-50"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "32px",
                      }),
                      indicatorsContainer: (base) => ({
                        ...base,
                        height: "32px",
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "0 6px",
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 5,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="displayDate"
                      stroke="black"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="black"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {metrics?.map((metric) => (
                      <Line
                        key={metric}
                        type="linear"
                        dataKey={metric}
                        stroke={metricColors[metric]}
                        strokeWidth={metric === activeMetric ? 4 : 2}
                        dot={metric === activeMetric}
                        activeDot={metric === activeMetric ? 4 : 2}
                        opacity={metric === activeMetric ? 4 : 2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
