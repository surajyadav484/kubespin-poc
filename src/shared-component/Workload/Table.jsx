import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUp,
  ArrowDown,
  Info,
  UnfoldHorizontal,
  ChevronsRight,
  RotateCcw,
  Settings,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SlidersHorizontal } from "lucide-react";

const formatCost = (value) => `$${value.toFixed(2)}`;
const formatResource = (value) => `${value.toFixed(2)}`;
const formatPercentage = (value) => `${value.toFixed(2)}%`;

const data = [
  {
    id: 1,
    workload: "snapshots",
    type: "ReplicaSet",
    namespace: "tools",
    pods: 19,
    cpuRequests: 2.66,
    memRequests: 6.65,
    storageRequests: 0,
    cpuCost: 0.1,
    memCost: 0.04,
    storageCost: 0.0,
    totalCost: 49.32,
    color: "blue",
    change: "-",
    costBreakdown: {
      storage: { value: 0.0, percentage: 0 },
      onDemand: { value: 48.24, percentage: 97.81 },
      fallback: { value: 0.0, percentage: 0 },
      spot: { value: 1.08, percentage: 2.19 },
    },
  },
  {
    id: 2,
    workload: "ingestor",
    type: "StatefulSet",
    namespace: "security",
    pods: 9,
    cpuRequests: 1.24,
    memRequests: 3.09,
    storageRequests: 0,
    cpuCost: 0.04,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 19.18,
    color: "blue",
    change: "-",
    costBreakdown: {
      storage: { value: 0.0, percentage: 0 },
      onDemand: { value: 18.71, percentage: 97.55 },
      fallback: { value: 0.0, percentage: 0 },
      spot: { value: 0.47, percentage: 2.45 },
    },
  },
  {
    id: 3,
    workload: "scalator",
    type: "Pod",
    namespace: "system",
    pods: 4,
    cpuRequests: 0.48,
    memRequests: 1.2,
    storageRequests: 0,
    cpuCost: 0.01,
    memCost: 0.01,
    storageCost: 0.0,
    totalCost: 5.99,
    color: "yellow",
    change: "-",
    costBreakdown: {
      storage: { value: 0.0, percentage: 0 },
      onDemand: { value: 5.87, percentage: 98.0 },
      fallback: { value: 0.0, percentage: 0 },
      spot: { value: 0.12, percentage: 2.0 },
    },
  },
  {
    id: 4,
    workload: "reporter",
    type: "DaemonSet",
    namespace: "external-worker",
    pods: 6,
    cpuRequests: 0.91,
    memRequests: 2.27,
    storageRequests: 0,
    cpuCost: 0.04,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 15.8,
    color: "blue",
    change: "-",
  },
  {
    id: 5,
    workload: "external-worker-sup",
    type: "Job",
    namespace: "logging",
    pods: 12,
    cpuRequests: 1.58,
    memRequests: 3.91,
    storageRequests: 0,
    cpuCost: 0.05,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 22.34,
    color: "green",
    change: "-",
  },
  {
    id: 6,
    workload: "logger",
    type: "Deployment",
    namespace: "tools",
    pods: 16,
    cpuRequests: 2.04,
    memRequests: 5.1,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 28.29,
    color: "blue",
    change: "-",
  },
  {
    id: 7,
    workload: "querier",
    type: "ReplicaSet",
    namespace: "security",
    pods: 13,
    cpuRequests: 1.71,
    memRequests: 4.29,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 25.15,
    color: "blue",
    change: "-",
  },
  {
    id: 8,
    workload: "server",
    type: "StatefulSet",
    namespace: "system",
    pods: 12,
    cpuRequests: 1.63,
    memRequests: 4.07,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 24.87,
    color: "blue",
    change: "-",
  },
  {
    id: 9,
    workload: "store-gateway",
    type: "Pod",
    namespace: "external-worker",
    pods: 17,
    cpuRequests: 2.38,
    memRequests: 5.96,
    storageRequests: 0,
    cpuCost: 0.08,
    memCost: 0.04,
    storageCost: 0.0,
    totalCost: 37.84,
    color: "blue",
    change: "-",
  },
  {
    id: 10,
    workload: "binder",
    type: "DaemonSet",
    namespace: "logging",
    pods: 20,
    cpuRequests: 2.58,
    memRequests: 6.46,
    storageRequests: 0,
    cpuCost: 0.08,
    memCost: 0.04,
    storageCost: 0.0,
    totalCost: 36.51,
    color: "blue",
    change: "-",
  },
  {
    id: 11,
    workload: "recorder",
    type: "Job",
    namespace: "tools",
    pods: 14,
    cpuRequests: 1.87,
    memRequests: 4.67,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 27.69,
    color: "blue",
    change: "-",
  },
  {
    id: 12,
    workload: "postgres",
    type: "Deployment",
    namespace: "security",
    pods: 12,
    cpuRequests: 1.69,
    memRequests: 4.23,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 26.95,
    color: "blue",
    change: "-",
  },
  {
    id: 13,
    workload: "distributor",
    type: "ReplicaSet",
    namespace: "system",
    pods: 19,
    cpuRequests: 2.5,
    memRequests: 6.24,
    storageRequests: 0,
    cpuCost: 0.08,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 38.29,
    color: "blue",
    change: "-",
  },
  {
    id: 14,
    workload: "observability-controller",
    type: "StatefulSet",
    namespace: "external-worker",
    pods: 13,
    cpuRequests: 1.78,
    memRequests: 4.45,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 27.5,
    color: "blue",
    change: "-",
  },
  {
    id: 15,
    workload: "node",
    type: "Pod",
    namespace: "logging",
    pods: 6,
    cpuRequests: 0.78,
    memRequests: 1.95,
    storageRequests: 0,
    cpuCost: 0.03,
    memCost: 0.01,
    storageCost: 0.0,
    totalCost: 11.22,
    color: "blue",
    change: "-",
  },
  {
    id: 16,
    workload: "fluentbit",
    type: "DaemonSet",
    namespace: "tools",
    pods: 11,
    cpuRequests: 1.35,
    memRequests: 3.37,
    storageRequests: 0,
    cpuCost: 0.04,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 17.54,
    color: "blue",
    change: "-",
  },
  {
    id: 17,
    workload: "node-exporter",
    type: "Job",
    namespace: "security",
    pods: 14,
    cpuRequests: 1.8,
    memRequests: 4.51,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 25.4,
    color: "blue",
    change: "-",
  },
  {
    id: 18,
    workload: "predictor",
    type: "Deployment",
    namespace: "system",
    pods: 14,
    cpuRequests: 1.87,
    memRequests: 4.67,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 27.67,
    color: "blue",
    change: "-",
  },
  {
    id: 19,
    workload: "collector",
    type: "ReplicaSet",
    namespace: "logging",
    pods: 10,
    cpuRequests: 1.45,
    memRequests: 3.62,
    storageRequests: 0,
    cpuCost: 0.05,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 20.75,
    color: "blue",
    change: "-",
  },
  {
    id: 20,
    workload: "aggregator",
    type: "StatefulSet",
    namespace: "tools",
    pods: 15,
    cpuRequests: 1.98,
    memRequests: 4.95,
    storageRequests: 0,
    cpuCost: 0.07,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 30.21,
    color: "blue",
    change: "-",
  },
  {
    id: 21,
    workload: "scheduler",
    type: "Pod",
    namespace: "security",
    pods: 7,
    cpuRequests: 0.95,
    memRequests: 2.37,
    storageRequests: 0,
    cpuCost: 0.03,
    memCost: 0.01,
    storageCost: 0.0,
    totalCost: 13.8,
    color: "yellow",
    change: "-",
  },
  {
    id: 22,
    workload: "worker",
    type: "DaemonSet",
    namespace: "system",
    pods: 8,
    cpuRequests: 1.12,
    memRequests: 2.8,
    storageRequests: 0,
    cpuCost: 0.04,
    memCost: 0.01,
    storageCost: 0.0,
    totalCost: 16.49,
    color: "blue",
    change: "-",
  },
  {
    id: 23,
    workload: "loader",
    type: "Job",
    namespace: "external-worker",
    pods: 11,
    cpuRequests: 1.42,
    memRequests: 3.55,
    storageRequests: 0,
    cpuCost: 0.05,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 19.95,
    color: "green",
    change: "-",
  },
  {
    id: 24,
    workload: "analytics",
    type: "Deployment",
    namespace: "logging",
    pods: 18,
    cpuRequests: 2.35,
    memRequests: 5.88,
    storageRequests: 0,
    cpuCost: 0.08,
    memCost: 0.04,
    storageCost: 0.0,
    totalCost: 35.27,
    color: "blue",
    change: "-",
  },
  {
    id: 25,
    workload: "processor",
    type: "ReplicaSet",
    namespace: "tools",
    pods: 20,
    cpuRequests: 2.68,
    memRequests: 6.7,
    storageRequests: 0,
    cpuCost: 0.1,
    memCost: 0.04,
    storageCost: 0.0,
    totalCost: 50.15,
    color: "blue",
    change: "-",
  },
  {
    id: 26,
    workload: "integrator",
    type: "StatefulSet",
    namespace: "security",
    pods: 9,
    cpuRequests: 1.25,
    memRequests: 3.12,
    storageRequests: 0,
    cpuCost: 0.04,
    memCost: 0.02,
    storageCost: 0.0,
    totalCost: 19.42,
    color: "blue",
    change: "-",
  },
  {
    id: 27,
    workload: "optimizer",
    type: "Pod",
    namespace: "system",
    pods: 5,
    cpuRequests: 0.59,
    memRequests: 1.48,
    storageRequests: 0,
    cpuCost: 0.02,
    memCost: 0.01,
    storageCost: 0.0,
    totalCost: 8.75,
    color: "yellow",
    change: "-",
  },
  {
    id: 28,
    workload: "dispatcher",
    type: "DaemonSet",
    namespace: "external-worker",
    pods: 7,
    cpuRequests: 0.99,
    memRequests: 2.48,
    storageRequests: 0,
    cpuCost: 0.03,
    memCost: 0.01,
    storageCost: 0.0,
    totalCost: 14.5,
    color: "blue",
    change: "-",
  },
  {
    id: 29,
    workload: "listener",
    type: "Job",
    namespace: "logging",
    pods: 15,
    cpuRequests: 1.97,
    memRequests: 4.92,
    storageRequests: 0,
    cpuCost: 0.07,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 30.05,
    color: "green",
    change: "-",
  },
  {
    id: 30,
    workload: "controller",
    type: "Deployment",
    namespace: "tools",
    pods: 13,
    cpuRequests: 1.76,
    memRequests: 4.4,
    storageRequests: 0,
    cpuCost: 0.06,
    memCost: 0.03,
    storageCost: 0.0,
    totalCost: 27.01,
    color: "blue",
    change: "-",
  },
];

const InfoTooltip = ({ children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <Info className="h-3 w-3 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SortButton = ({ column, children, showInfo = false, tooltipText }) => {
  const sortDirection = column.getIsSorted();

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => column.toggleSorting(sortDirection === "asc")}
    >
      <div className="flex items-center gap-1">
        <span>{children}</span>
        {showInfo && <InfoTooltip>{tooltipText}</InfoTooltip>}
      </div>
      <div className="flex items-center">
        <ArrowUp
          className={`h-3 w-3 ${
            sortDirection === "asc" ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <ArrowDown
          className={`h-3 w-3 ${
            sortDirection === "desc" ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>
    </button>
  );
};

// Cost breakdown tooltip component
const CostBreakdownTooltip = ({ costData }) => {
  // Default cost breakdown if not provided
  const breakdown = costData?.costBreakdown || {
    storage: { value: 0.0, percentage: 0 },
    onDemand: { value: costData?.totalCost * 0.9778 || 0, percentage: 97.78 },
    fallback: { value: 0.0, percentage: 0 },
    spot: { value: costData?.totalCost * 0.0222 || 0, percentage: 2.22 },
  };

  return (
    <div className="p-2 w-full min-w-[250px]">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left">
            <th className="pb-1"></th>
            <th className="pb-1 text-right pr-3"></th>
            <th className="pb-1 text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1 flex items-center">
              <div className="w-3 h-3 bg-blue-200 mr-2"></div>
              STORAGE
            </td>
            <td className="py-1 text-right pr-3">
              {formatCost(breakdown.storage.value)}
            </td>
            <td className="py-1 text-right text-gray-500">
              {formatPercentage(breakdown.storage.percentage)}
            </td>
          </tr>
          <tr>
            <td className="py-1 flex items-center">
              <div className="w-3 h-3 bg-blue-500 mr-2"></div>
              ON-DEMAND
            </td>
            <td className="py-1 text-right pr-3">
              {formatCost(breakdown.onDemand.value)}
            </td>
            <td className="py-1 text-right text-gray-500">
              {formatPercentage(breakdown.onDemand.percentage)}
            </td>
          </tr>
          <tr>
            <td className="py-1 flex items-center">
              <div className="w-3 h-3 bg-yellow-500 mr-2"></div>
              FALLBACK
            </td>
            <td className="py-1 text-right pr-3">
              {formatCost(breakdown.fallback.value)}
            </td>
            <td className="py-1 text-right text-gray-500">
              {formatPercentage(breakdown.fallback.percentage)}
            </td>
          </tr>
          <tr>
            <td className="py-1 flex items-center">
              <div className="w-3 h-3 bg-gray-800 mr-2"></div>
              SPOT
            </td>
            <td className="py-1 text-right pr-3">
              {formatCost(breakdown.spot.value)}
            </td>
            <td className="py-1 text-right text-gray-500">
              {formatPercentage(breakdown.spot.percentage)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Cost bar component with tooltip
const CostBar = ({ cost, maxCost, rowData }) => {
  // Calculate the width percentage based on the cost value
  const percentage = (cost / maxCost) * 100;
  const barWidth = `${percentage}%`;

  let barColor = "bg-blue-500";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full text-left">
          <div className="flex flex-col">
            <div className="mb-1">{formatCost(cost)}</div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`${barColor} h-2 rounded-full`}
                style={{ width: barWidth }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-gray-600 shadow-lg border rounded-md p-0"
        >
          <CostBreakdownTooltip costData={rowData} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const WorkloadTable = () => {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const initialColumnVisibility = {
    select: true,
  };
  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility
  );

  const columns = [
    {
      id: "select",
      // Move header definition here to access table instance
      header: ({ table }) => (
        // <Checkbox
        //     checked={table.getIsAllPageRowsSelected()}
        //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //     aria-label="Select all"
        // />
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        // <Checkbox
        //     checked={row.getIsSelected()}
        //     onCheckedChange={(value) => row.toggleSelected(!!value)}
        //     aria-label="Select row"
        // />
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
      enableSorting: false,
      enableResizing: false,
    },
    {
      // accessorKey: "workload",
      // header: ({ column }) => <SortButton column={column}>WORKLOAD</SortButton>
      accessorKey: "workload",
      header: ({ column }) => <SortButton column={column}>WORKLOAD</SortButton>,
      size: 200,
      minSize: 100,
      maxSize: 400,
      enableResizing: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <SortButton column={column}>TYPE</SortButton>,
      enableResizing: false,
    },
    {
      accessorKey: "namespace",
      header: ({ column }) => (
        <SortButton column={column}>NAMESPACE</SortButton>
      ),
      enableResizing: false,
    },
    {
      accessorKey: "pods",
      header: ({ column }) => (
        <SortButton
          column={column}
          showInfo
          tooltipText="Number of running pods in this workload"
        >
          PODS
        </SortButton>
      ),
      enableResizing: false,
    },
    {
      header: "RESOURCES",
      columns: [
        {
          accessorKey: "cpuRequests",
          header: ({ column }) => (
            <SortButton
              column={column}
              showInfo
              tooltipText="CPU resource requests per hour"
            >
              CPU
            </SortButton>
          ),
          cell: ({ row }) => `${formatResource(row.original.cpuRequests)} CPU`,
          enableResizing: false,
        },
        {
          accessorKey: "memRequests",
          header: ({ column }) => (
            <SortButton
              column={column}
              showInfo
              tooltipText="Memory resource requests per hour"
            >
              MEM
            </SortButton>
          ),
          cell: ({ row }) => `${formatResource(row.original.memRequests)} GiB`,
          enableResizing: false,
        },
        {
          accessorKey: "storageRequests",
          header: ({ column }) => (
            <SortButton
              column={column}
              showInfo
              tooltipText="Storage resource requests per hour"
            >
              STO.
            </SortButton>
          ),
          cell: ({ row }) =>
            `${formatResource(row.original.storageRequests)} GiB`,
          enableResizing: false,
        },
      ],
      enableResizing: false,
    },
    {
      header: "COSTS",
      columns: [
        {
          accessorKey: "cpuCost",
          header: ({ column }) => <SortButton column={column}>CPU</SortButton>,
          cell: ({ row }) => formatCost(row.original.cpuCost),
          enableResizing: false,
        },
        {
          accessorKey: "memCost",
          header: ({ column }) => <SortButton column={column}>MEM</SortButton>,
          cell: ({ row }) => formatCost(row.original.memCost),
          enableResizing: false,
        },
        {
          accessorKey: "storageCost",
          header: ({ column }) => <SortButton column={column}>STO.</SortButton>,
          cell: ({ row }) => formatCost(row.original.storageCost),
          enableResizing: false,
        },
      ],
      enableResizing: false,
    },
    {
      accessorKey: "totalCost",
      header: ({ column }) => (
        <SortButton
          column={column}
          showInfo
          tooltipText="Total cost of all resources"
        >
          Total Cost
        </SortButton>
      ),
      cell: ({ row }) => {
        // Find the maximum cost to properly scale the bars
        const maxCost = Math.max(...data.map((item) => item.totalCost));
        return (
          <CostBar
            cost={row.original.totalCost}
            maxCost={maxCost}
            rowData={row.original}
          />
        );
      },
      enableResizing: false,
    },
    {
      accessorKey: "change",
      header: ({ column }) => (
        <SortButton
          column={column}
          showInfo
          tooltipText="Change in cost compared to previous period"
        >
          Change
        </SortButton>
      ),
      cell: ({ row }) => row.original.change,
      enableResizing: false,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
    enableRowSelection: true,
    enableColumnGroups: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="w-full mb-2">
      <Drawer direction="right" className="shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-gray-500">
            {Object.keys(rowSelection).length > 0
              ? `${Object.keys(rowSelection).length}/`
              : ""}
            {table.getFilteredRowModel().rows.length} workloads
          </div>

          <DrawerTrigger asChild>
            <div
              variant="outline"
              className="flex items-center gap-2 flex-row-reverse"
            >
              <Settings size="7%" className="cursor-pointer" />
            </div>
          </DrawerTrigger>
        </div>
        <DrawerContent side="right">
          <DrawerHeader>
            <div className="inline-flex justify-between items-center w-full mb-2">
              <DrawerClose asChild>
                <div className="p-1 w-8 h-8 box-border flex items-center justify-center rounded-md border border-transparent hover:border-gray-300 hover:bg-gray-200 cursor-pointer transition">
                  <ChevronsRight className="w-5 h-5" />
                </div>
              </DrawerClose>
              <Button
                className=" bg-transparent shadow-none text-black p-1 box-border flex items-center justify-center rounded-md border border-transparent hover:border-gray-300 hover:bg-gray-200 cursor-pointer transition"
                onClick={() => setColumnVisibility(initialColumnVisibility)}
              >
                <RotateCcw />
                Restore default
              </Button>
            </div>
            <DrawerTitle>Table management</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 py-2 grid gap-4">
            {table
              .getAllLeafColumns()
              .filter((column) => column.id !== "select")
              .map((column) => (
                <div key={column.id} className="flex items-center gap-2">
                  <Switch
                    id={`toggle-${column.id}`}
                    checked={column.getIsVisible()}
                    onCheckedChange={() => column.toggleVisibility()}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={`toggle-${column.id}`}
                    className="text-[15px]"
                  >
                    {column.id}
                  </Label>
                </div>
              ))}
          </div>
        </DrawerContent>
      </Drawer>

      <div className="rounded-md border">
        <div className="max-h-[600px] overflow-auto">
          <div className="min-w-full inline-block align-middle">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`align-center relative ${
                          header.column.columnDef.columns
                            ? "border-x text-center"
                            : "border-x-0 text-center"
                        }`}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {header.column.getCanResize() &&
                          headerGroup.depth > 0 && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className="absolute right-0 top-0 h-full w-4 flex items-center justify-center cursor-col-resize select-none touch-none"
                              style={{ transform: "translateX(10%)" }}
                            >
                              <UnfoldHorizontal />
                            </div>
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadTable;
