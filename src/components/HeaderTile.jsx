import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const HeaderTile = ({ title, subText }) => {
  const [showBlinkIcon, setShowBlinkIcon] = useState(true);
  return (
    <>
      <div className="flex items-center gap-5">
        <Badge className="bg-[#BCF7FF] text-[#004F5A] font-medium">Demo</Badge>
        <p className="text-[#0D7381] text-xs font-semibold">{subText}</p>
        <Button
          className="ml-auto text-xs font-semibold py-0 px-2.5"
          id="connect-cluster"
        >
          Connect Cluster
        </Button>
      </div>
      <div className="text-[#051922] text-[28px] font-semibold mt-10">
        <span>{title}</span>
        {showBlinkIcon && (
          //   <sup className="ml-0.5">
          //     <span class="relative inline-flex size-4 hover:hidden">
          //       <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#69BBD5]  "></span>
          //       <span class="relative inline-flex size-4 rounded-full bg-[#69BBD5]"></span>
          //     </span>
          //     {/* <span class="inline-flex h-5 w-5 animate-ping rounded-full bg-sky-400 opacity-75"></span> */}
          //     <div
          //       onClick={() => driverObj.drive()}
          //       id="tour"
          //       className="absolute left-full top-0 ml-2 hidden rounded-full bg-[#69BBD5] px-2 py-0.5 text-xs font-bold text-white peer-hover:block"
          //     >
          //       TOUR
          //     </div>
          //   </sup>
          <sup className="ml-0.5 relative group">
            <span className="relative inline-flex size-4 cursor-pointer group-hover:hidden">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#69BBD5]"></span>
              <span className="relative inline-flex size-4 rounded-full bg-[#69BBD5]"></span>
            </span>

            <div
              onClick={() => {
                setShowBlinkIcon(false);
                driverObj.drive();
              }}
              id="tour"
              className="absolute left-full top-0 ml-2 hidden rounded-full bg-[#69BBD5] px-2 py-0.5 text-xs font-bold text-white group-hover:block"
            >
              TOUR
            </div>
          </sup>
        )}
      </div>
    </>
  );
};

export default HeaderTile;

const driverObj = driver({
  showProgress: true, // Because everyone loves progress bars!
  steps: [
    {
      element: "#tour",
      popover: {
        description: "Understand your clusters situation at a glance.",
      },
    },
    {
      element: "#nodes",
      popover: {
        description:
          "View your cluster details and monitor all the nodes and pods in real time.",
      },
    },
    {
      element: "#resource-usage",
      popover: {
        description:
          "See your cluster resource usage and overhead in real time.",
      },
    },
    {
      element: "#resource-usage-in-graphs",
      popover: {
        description:
          "Find out your cluster resource usage over time in the graphs below.",
      },
    },
    {
      element: "#connect-cluster",
      popover: {
        description:
          "Stay on top of your cluster's status. Connect one (or more) free of charge.",
      },
    },
    // More magical steps...
  ],
});
