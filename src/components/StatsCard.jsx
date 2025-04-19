import React from "react";

const StatsCard = ({stats}) => {
  return (
    <div className="h-full text-[#051922] w-[10%] flex flex-col gap-y-5 mt-4">
      <div className="border-l-2 border-l-[#2A5CBB] pl-2">
        <h2 className="text-xs ">{stats.avgProvisioned.title}</h2>
        <div>
          <span className="text-base font-semibold">{stats.avgProvisioned.value}</span>
          <span className="text-xs ml-2">{stats.avgProvisioned.unit}</span>
        </div>
      </div>
      <div className="border-l-2 border-l-[#82B4FF] pl-2">
        <h2 className="text-xs">{stats.avgRequested.title}</h2>
        <div>
          <span className="text-base font-semibold">{stats.avgRequested.value}</span>
          <span className="text-xs ml-2">{stats.avgRequested.unit}</span>
        </div>
      </div>
      <div className="border-l-2 border-l-[#C9F7DC] pl-2">
        <h2 className="text-xs">{stats.avgUsed.title}</h2>
        <div>
          <span className="text-base font-semibold">{stats.avgUsed.value}</span>
          <span className="text-xs ml-2">{stats.avgUsed.unit}</span>
        </div>
      </div>
    </div>
  ); 
};

export default StatsCard;
