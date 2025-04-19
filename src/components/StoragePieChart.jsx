import CustomAreaChart from '@/charts/AreaChart';
import SemiPieChart from '@/charts/SemiPieChart';
import React from 'react';

const StoragePieChart = () => {
    const chartData = [
        { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
        { browser: "edge", visitors: 600, fill: "blue", fillOpacity: 0 },
        { browser: "firefox", visitors: 50, fill: "var(--color-firefox)" },
      ];
      
      const chartConfig = {
        visitors: {
          label: "Visitors",
        },
        chrome: {
          label: "Chrome",
          color: "var(--chart-1)",
        },
        safari: {
          label: "Safari",
          color: "var(--chart-2)",
        },
        firefox: {
          label: "Firefox",
          color: "var(--chart-3)",
        },
        edge: {
          label: "Edge",
          color: "var(--chart-4)",
        },
        other: {
          label: "Other",
          color: "var(--chart-5)",
        },
      };
      
  return (
    <SemiPieChart chartConfig={chartConfig} chartData={chartData} />
  );
}

export default StoragePieChart;
