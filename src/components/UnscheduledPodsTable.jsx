import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, ArrowUpDown } from "lucide-react";

const workloads = [
  {
    workload: "workload.1",
    namespace: "namespace.1",
    type: "ReplicaSet",
    pods: 1,
  },
  {
    workload: "workload.2",
    namespace: "namespace.2",
    type: "ReplicaSet",
    pods: 1,
  },
  {
    workload: "workload.3",
    namespace: "namespace.3",
    type: "ReplicaSet",
    pods: 1,
  },
  {
    workload: "workload.4",
    namespace: "namespace.4",
    type: "ReplicaSet",
    pods: 1,
  },
  {
    workload: "workload.5",
    namespace: "namespace.5",
    type: "ReplicaSet",
    pods: 1,
  },
];

export default function WorkloadTable({ setOpenSecond }) {
  return (
    <div className="rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer">
              WORKLOAD{" "}
              <ArrowUpDown className="inline h-4 w-4 ml-1 text-muted-foreground" />
            </TableHead>
            <TableHead className="cursor-pointer">
              NAMESPACE{" "}
              <ArrowUpDown className="inline h-4 w-4 ml-1 text-muted-foreground" />
            </TableHead>
            <TableHead className="cursor-pointer">
              TYPE{" "}
              <ArrowUpDown className="inline h-4 w-4 ml-1 text-muted-foreground" />
            </TableHead>
            <TableHead className="cursor-pointer">
              PODS{" "}
              <ArrowUpDown className="inline h-4 w-4 ml-1 text-muted-foreground" />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {workloads.map((item, index) => (
            <TableRow key={index} className="hover:bg-muted">
              <TableCell className="text-blue-600 hover:underline cursor-pointer">
                {item.workload}
              </TableCell>
              <TableCell>{item.namespace}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.pods}</TableCell>
              <TableCell>
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground hover:cursor-pointer"
                  onClick={() => setOpenSecond(true)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
