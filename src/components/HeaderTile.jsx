import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const HeaderTile = ({title, subText, showBlinkIcon}) => {
  return (
    <>
    <div className="flex items-center gap-5">
      <Badge className="bg-[#BCF7FF] text-[#004F5A] font-medium">Demo</Badge>
      <p className="text-[#0D7381] text-xs font-semibold">
        {subText}
      </p>
      <Button className="ml-auto text-xs font-semibold py-0 px-2.5">
        Connect Cluster
      </Button>
    </div>
    <div className="text-[#051922] text-[28px] font-semibold mt-10">
    <span>{title}</span>
{ showBlinkIcon &&   <sup className="ml-0.5">
      <span class="relative inline-flex size-4">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#69BBD5]"></span>
        <span class="relative inline-flex size-4 rounded-full bg-[#69BBD5]"></span>
      </span>
      {/* <span class="inline-flex h-5 w-5 animate-ping rounded-full bg-sky-400 opacity-75"></span> */}
    </sup>}
  </div>
  </>
  );
};

export default HeaderTile;
