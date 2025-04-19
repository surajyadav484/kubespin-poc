"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import InputSelect from "./InputSelect";
import { Badge } from "./ui/badge";
import UnscheduledPodsTable from "./UnscheduledPodsTable";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Copy } from "lucide-react";

export default function NestedDrawers() {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  console.log("🚀 ~ NestedDrawers ~ openSecond:", openSecond);

  return (
    <>
      {/* Trigger to open first drawer */}
      <Drawer open={openFirst} onOpenChange={setOpenFirst} direction="right">
        <DrawerTrigger asChild>
          <Badge
            variant="secondary"
            className="text-xs font-semibold absolute z-10 top-0 left-32 bg-gray-300 hover:cursor-pointer"
          >
            View unscheduled
          </Badge>
        </DrawerTrigger>
        <DrawerContent
          className=" h-full !w-1/3 bg-white shadow-lg transition-transform"
          showOverlay={false}
          style={{
            transform: openFirst
              ? openSecond
                ? "translateX(-600px)" // Adjust position when second drawer is open
                : "translateX(0)"
              : "translateX(100%)",
          }}
        >
          <div className="mt-10 p-5">
            <div>
              <p className="text-xl text-[#051522]">5 Unscheduled pods</p>
              <p className="text-xs text-[#5D6E75]">in 5 workloads</p>
            </div>
            <div>
              {/* <Input type="text"  /> */}
              <InputSelect />
            </div>

            <div className="mt-4">
              <UnscheduledPodsTable setOpenSecond={setOpenSecond} />
            </div>

            {/* <Button onClick={() => setOpenSecond(true)} className="mt-auto">
              Open Second Drawer
            </Button> */}
          </div>

          {/* Nested Drawer (attached to the end of the first drawer) */}
        </DrawerContent>
      </Drawer>
      <Drawer open={openSecond} onOpenChange={setOpenSecond} direction="right">
        <DrawerContent
          className="fixed right-0 top-0 h-full !w-[40%] shadow-xl transition-transform"
          showOverlay={false}
          style={{
            transform: openSecond ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <DrawerHeader>
            <button className="ml-auto" onClick={() => setOpenSecond(false)}>
              X
            </button>
          </DrawerHeader>
          <div className="p-4 flex flex-col h-full">
            <PodEventDetails />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function PodEventDetails() {
  const [expanded, setExpanded] = useState(false);

  const event = {
    pod: "pod.2",
    action: "Unschedulable ...",
    reason: "Not enough space",
    timestamp: "2025-03-17 21:57:19",
    reportingComponent: "controller",
    message: "Not enough space in cluster",
  };

  return (
    <div className="w-full  p-6">
      <div className="mb-4">
        <h2 className="text-sm text-muted-foreground">WORKLOAD:</h2>
        <h1 className="text-2xl font-semibold">workload.2</h1>
        <p className="text-muted-foreground text-sm">ReplicaSet</p>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="border-b w-full bg-transparent p-0 mb-4">
          <TabsTrigger
            value="events"
            className="px-4 py-2  text-blue-600 font-medium"
          >
            Unscheduled pod events
          </TabsTrigger>
          <TabsTrigger value="pods" className="px-4 py-2 text-muted-foreground">
            Unscheduled pods list
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <p className="text-sm mb-2 text-muted-foreground">1 pod event</p>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="w-[100px]">POD ⬍</TableHead>
                  <TableHead>ACTION ⬍</TableHead>
                  <TableHead>REASON ⬍</TableHead>
                  <TableHead>TIMESTAMP ⬍</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => setExpanded(!expanded)}
                >
                  <TableCell>{event.pod}</TableCell>
                  <TableCell>{event.action}</TableCell>
                  <TableCell>{event.reason}</TableCell>
                  <TableCell>{event.timestamp}</TableCell>
                  <TableCell className="text-right">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </TableCell>
                </TableRow>
                {expanded && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={5}>
                      <div className="p-4 space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            REPORTING COMPONENT:
                          </span>{" "}
                          <span className="font-medium">
                            {event.reportingComponent}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            MESSAGE:
                          </span>{" "}
                          <span className="font-medium">{event.message}</span>
                          <Copy className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-black" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pods">
          <p className="text-sm text-muted-foreground">
            No unscheduled pods listed.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
