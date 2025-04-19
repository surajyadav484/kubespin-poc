import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DotIcon, IceCream } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import CpuGaugeChart from "@/charts/SemiPieChart";
import CustomAreaChart from "@/charts/AreaChart";
import MemoryPieChart from "./MemoryPieChart";
import CPUPieChart from "./CPUPieChart";
import StoragePieChart from "./StoragePieChart";
import CPUMemoryAreaChart from "./CPUMemoryAreaChart";
import ViewUnsubscribed from "./ViewUnsubscribed";
import HeaderTile from "./HeaderTile";

const Dashboard = () => {
  return (
    <div>
      {/* <div className="flex items-center gap-5">
        <Badge className="bg-[#BCF7FF] text-[#004F5A] font-medium">Demo</Badge>
        <p className="text-[#0D7381] text-xs font-semibold">
          Get free cost monitoring, security and optimization insights for K8s
        </p>
        <Button className="ml-auto text-xs font-semibold py-0 px-2.5">
          Connect Cluster
        </Button>
      </div> */}
      <HeaderTile title='Dashboard' showBlinkIcon subText="Get free cost monitoring, security and optimization insights for K8s" />
      
      <div className="mt-5 flex gap-x-5">
        {/* Cluster details */}
        <div>
          <p className="text-[#5D6E75] text-xs font-semibold">
            Cluster details
          </p>
          <Table className="mt-2 w-[500px] bg-white !shadow border-none">
            <TableBody>
              <TableRow className="border-b-0">
                <TableCell>Cluster Status:</TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-[#BCF7FF] text-[#004F5A] font-medium">
                    Demo
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow className="border-b-0">
                <TableCell>K8S provider:</TableCell>
                <TableCell className="text-right">
                  <IceCream />
                </TableCell>
              </TableRow>
              <TableRow className="border-b-0">
                <TableCell>region:</TableCell>
                <TableCell className="text-right">
                  Asia Pacific (Mumbai)
                </TableCell>
              </TableRow>
              <TableRow className="border-b-0">
                <TableCell>Kubernetes version:</TableCell>
                <TableCell className="text-right">1.25.0</TableCell>
              </TableRow>
              <TableRow className="border-b-0">
                <TableCell>connected:</TableCell>
                <TableCell className="text-right">about 1 month ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>cluster id:</TableCell>
                <TableCell className="text-right">
                  11111111-1111-1111-1111-111111111111
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="w-full">
          <p className="text-[#5D6E75] text-xs font-semibold">Nodes</p>
          <div className="px-3 py-2  bg-white mt-2 rounded-md">
            <div>
              <Table className="mt-2 w-full bg-white shadow-md border-none">
                <TableBody>
                  <TableRow className="border-b-0">
                    <TableCell>
                      <div className="border-r-2 border-[#82B4FF]">
                        <p className="text-[10px]">TOTAL NODES</p>
                        <p className="font-semibold text-2xl">100</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="border-r-2 border-[#F7BE2C]">
                        <p className="text-[10px]">ON-DEMAND</p>
                        <p className="font-semibold text-2xl">70</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="border-r-2 border-[#271D51]">
                        <p className="text-[10px]">FALLBACK</p>
                        <p className="font-semibold text-2xl">0</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-[10px]">SPOT</p>
                        <p className="font-semibold text-2xl">30</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <Table className="w-full bg-white shadow-md border-none">
                <TableHeader>
                  <TableRow className="text-[10px] border-none !h-2.5 py-0">
                    <TableHead className="!h-2.5 bg-[#F4F6F9]" />
                    <TableHead className="!h-2.5 bg-[#F4F6F9]" />

                    <TableHead
                      colSpan={2}
                      className="border text-[#839299] text-[10px] border-b-2 border-[#F4F6F9] border-b-[#F4F6F9] border-r-0 rounded-l-3xl !h-2.5 py-0.5"
                    >
                      Overprovisioning
                    </TableHead>
                  </TableRow>
                  <TableRow className="text-[10px] border-b-[#F4F6F9]">
                    <TableHead className="text-[#051922] font-semibold">
                      MANAGED BY
                    </TableHead>
                    <TableHead className="text-[#051922] font-semibold">
                      COUNT
                    </TableHead>
                    <TableHead className="text-[#051922] font-semibold border-l border-l-[#F4F6F9]">
                      CPU
                    </TableHead>
                    <TableHead className="text-[#051922] font-semibold">
                      GiB
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b-0 text-xs text-[#051922]">
                    <TableCell>KUBESPIN</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>83.2%</TableCell>
                    <TableCell>72.3%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <Table className="mt-2 w-full bg-white shadow-md border-none">
              <TableBody>
                <TableRow className="border-b-0">
                  <TableCell>
                    <div className="border-r-2 border-[#271D51]">
                      <p className="text-[10px]">TOTAL PODS</p>
                      <p className="font-semibold text-2xl">1102</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="border-r-2 border-gray-400">
                      <p className="text-[10px]">SCHEDULED</p>
                      <p className="font-semibold text-2xl">1097</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <div>
                        <p className="text-[10px]">UNSUBSCRIBED</p>
                        <p className="font-semibold text-2xl">0</p>
                      </div>
                      <ViewUnsubscribed />
                    </div>
                  </TableCell>
                  {/* <TableCell className='flex justify-center'>
                  <Badge variant="secondary" className="text-xs font-semibold">
                    View unscheduled
                  </Badge>
                </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="w-[500px] flex justify-between items-center rounded-sm text-[#839299] text-[10px] font-semibold bg-white p-2 mt-2 shadow">
        <h3>CAST AI AUTOSCALER POLICIES</h3>
        <h3>0/3</h3>
      </div>
      <div className="flex w-full justify-between my-5 flex-1 gap-x-10">
        <div className="flex-1">
          <p className="text-[#5D6E75] text-xs font-semibold mb-2">CPU</p>
          <CPUPieChart />
        </div>
        <div className="flex-1">
          <p className="text-[#5D6E75] text-xs font-semibold mb-2">Memory</p>
          <MemoryPieChart />
        </div>
        <div className="flex-1">
          <p className="text-[#5D6E75] text-xs font-semibold mb-2">Storage</p>
          <StoragePieChart />
        </div>
      </div>
      <div className="mb-10">
        <CPUMemoryAreaChart />
      </div>
    </div>
  );
};

export default Dashboard;
