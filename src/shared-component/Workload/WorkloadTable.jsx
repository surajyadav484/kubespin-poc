// import React, { useState } from 'react';
// import { Info, ArrowUp, ArrowDown } from 'lucide-react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

// export default function WorkloadsTable() {
//   const [selected, setSelected] = useState([]);
//   const [orderBy, setOrderBy] = useState('');
//   const [order, setOrder] = useState('desc');
//   const [workloadColumnWidth, setWorkloadColumnWidth] = useState(180);
//   const resizingRef = useRef(false);
//   const startXRef = useRef(0);
//   const startWidthRef = useRef(0);

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

  // const rows = [
  //   { id: 1, workload: 'snapshots', type: 'ReplicaSet', namespace: 'tools', pods: 19, cpuRequests: 2.69, memRequests: 6.72, storageRequests: 0, cpuCost: 0.10, memCost: 0.04, storageCost: 0.00, totalCost: 43.19, color: 'blue' },
  //   { id: 2, workload: 'ingestor', type: 'StatefulSet', namespace: 'security', pods: 9, cpuRequests: 1.24, memRequests: 3.09, storageRequests: 0, cpuCost: 0.04, memCost: 0.02, storageCost: 0.00, totalCost: 19.18, color: 'blue' },
  //   { id: 3, workload: 'scalator', type: 'Pod', namespace: 'system', pods: 4, cpuRequests: 0.48, memRequests: 1.2, storageRequests: 0, cpuCost: 0.01, memCost: 0.01, storageCost: 0.00, totalCost: 5.99, color: 'yellow' },
  //   { id: 4, workload: 'reporter', type: 'DaemonSet', namespace: 'external-worker', pods: 6, cpuRequests: 0.91, memRequests: 2.27, storageRequests: 0, cpuCost: 0.04, memCost: 0.02, storageCost: 0.00, totalCost: 15.80, color: 'blue' },
  //   { id: 5, workload: 'external-worker-sup', type: 'Job', namespace: 'logging', pods: 12, cpuRequests: 1.58, memRequests: 3.91, storageRequests: 0, cpuCost: 0.05, memCost: 0.02, storageCost: 0.00, totalCost: 22.34, color: 'green' },
  //   { id: 6, workload: 'logger', type: 'Deployment', namespace: 'tools', pods: 16, cpuRequests: 2.04, memRequests: 5.1, storageRequests: 0, cpuCost: 0.06, memCost: 0.03, storageCost: 0.00, totalCost: 28.29, color: 'blue' },
  //   { id: 7, workload: 'querier', type: 'ReplicaSet', namespace: 'security', pods: 13, cpuRequests: 1.71, memRequests: 4.29, storageRequests: 0, cpuCost: 0.06, memCost: 0.02, storageCost: 0.00, totalCost: 25.15, color: 'blue' },
  //   { id: 8, workload: 'server', type: 'StatefulSet', namespace: 'system', pods: 12, cpuRequests: 1.63, memRequests: 4.07, storageRequests: 0, cpuCost: 0.06, memCost: 0.02, storageCost: 0.00, totalCost: 24.87, color: 'blue' },
  //   { id: 9, workload: 'store-gateway', type: 'Pod', namespace: 'external-worker', pods: 17, cpuRequests: 2.38, memRequests: 5.96, storageRequests: 0, cpuCost: 0.08, memCost: 0.04, storageCost: 0.00, totalCost: 37.84, color: 'blue' },
  //   { id: 10, workload: 'binder', type: 'DaemonSet', namespace: 'logging', pods: 20, cpuRequests: 2.58, memRequests: 6.46, storageRequests: 0, cpuCost: 0.08, memCost: 0.04, storageCost: 0.00, totalCost: 36.51, color: 'blue' },
  //   { id: 11, workload: 'recorder', type: 'Job', namespace: 'tools', pods: 14, cpuRequests: 1.87, memRequests: 4.67, storageRequests: 0, cpuCost: 0.06, memCost: 0.03, storageCost: 0.00, totalCost: 27.69, color: 'blue' },
  //   { id: 12, workload: 'postgres', type: 'Deployment', namespace: 'security', pods: 12, cpuRequests: 1.69, memRequests: 4.23, storageRequests: 0, cpuCost: 0.06, memCost: 0.03, storageCost: 0.00, totalCost: 26.95, color: 'blue' },
  //   { id: 13, workload: 'distributor', type: 'ReplicaSet', namespace: 'system', pods: 19, cpuRequests: 2.5, memRequests: 6.24, storageRequests: 0, cpuCost: 0.08, memCost: 0.03, storageCost: 0.00, totalCost: 38.29, color: 'blue' },
  //   { id: 14, workload: 'observability-controller', type: 'StatefulSet', namespace: 'external-worker', pods: 13, cpuRequests: 1.78, memRequests: 4.45, storageRequests: 0, cpuCost: 0.06, memCost: 0.03, storageCost: 0.00, totalCost: 27.50, color: 'blue' },
  //   { id: 15, workload: 'node', type: 'Pod', namespace: 'logging', pods: 6, cpuRequests: 0.78, memRequests: 1.95, storageRequests: 0, cpuCost: 0.03, memCost: 0.01, storageCost: 0.00, totalCost: 11.22, color: 'blue' },
  //   { id: 16, workload: 'fluentbit', type: 'DaemonSet', namespace: 'tools', pods: 11, cpuRequests: 1.35, memRequests: 3.37, storageRequests: 0, cpuCost: 0.04, memCost: 0.02, storageCost: 0.00, totalCost: 17.54, color: 'blue' },
  //   { id: 17, workload: 'node-exporter', type: 'Job', namespace: 'security', pods: 14, cpuRequests: 1.8, memRequests: 4.51, storageRequests: 0, cpuCost: 0.06, memCost: 0.02, storageCost: 0.00, totalCost: 25.40, color: 'blue' },
  //   { id: 18, workload: 'predictor', type: 'Deployment', namespace: 'system', pods: 14, cpuRequests: 1.87, memRequests: 4.67, storageRequests: 0, cpuCost: 0.06, memCost: 0.03, storageCost: 0.00, totalCost: 27.67, color: 'blue' }
  // ];

//   // Sort function
//   function getComparator(order, orderBy) {
//     return order === 'desc'
//       ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
//       : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
//   }

//   const sortedRows = [...rows].sort(getComparator(order, orderBy));

//   const getColorBar = (color) => {
//     let bgColor = 'bg-blue-500';

//     if (color === 'green') {
//       bgColor = 'bg-green-500';
//     } else if (color === 'yellow') {
//       bgColor = 'bg-yellow-500';
//     }

//     return <div className={`w-1 h-6 ${bgColor} rounded-sm mr-2`}></div>;
//   };

//   // For showing indeterminate checkbox state
//   const isIndeterminate = selected.length > 0 && selected.length < rows.length;

//   return (
//     <div className="p-4 font-sans">
//       <h2 className="text-lg font-medium text-gray-700 mb-4">
//         50 workloads
//       </h2>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-3 py-1"></th>
//                 <th className="px-3 py-1"></th>
//                 <th className="px-3 py-1"></th>
//                 <th className="px-3 py-1"></th>
//                 <th className="px-3 py-1"></th>
//                 <th colSpan="3" className="px-3 py-1 text-center text-xs font-semibold text-gray-700 border-b border-gray-200">
//                   AVG. REQ. PER HOUR
//                 </th>
//                 <th colSpan="3" className="px-3 py-1 text-center text-xs font-semibold text-gray-700 border-b border-gray-200">
//                   TOTAL COST PER RESOURCE
//                 </th>
//                 <th className="px-3 py-1"></th>
//                 <th className="px-3 py-1"></th>
//               </tr>
//               <tr>
//                 <th className="px-3 py-2 text-left">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 rounded border-gray-300 text-blue-600"
//                     checked={rows.length > 0 && selected.length === rows.length}
//                     onChange={handleSelectAllClick}
//                     ref={el => {
//                       if (el) {
//                         el.indeterminate = isIndeterminate;
//                       }
//                     }}
//                   />
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">WORKLOAD</span>
//                     <button
//                       onClick={() => handleRequestSort('workload')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'workload' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                   <div 
//                     className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-gray-300 hover:bg-blue-500"
//                     onMouseDown={handleResizeStart}
//                   />
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">TYPE</span>
//                     <button
//                       onClick={() => handleRequestSort('type')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'type' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">NAMESPACE</span>
//                     <button
//                       onClick={() => handleRequestSort('namespace')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'namespace' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">PODS</span>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Info size={12} className="ml-1 text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent className='bg-gray-600'>
//                           <p>Average hourly POD count</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>

//                     <button
//                       onClick={() => handleRequestSort('pods')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'pods' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">CPU</span>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Info size={12} className="ml-1 text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent className='bg-gray-600'>
//                           <p>Average hourly CPU requests per workload</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <button
//                       onClick={() => handleRequestSort('cpuRequests')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'cpuRequests' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">MEM</span>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Info size={12} className="ml-1 text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent className='bg-gray-600'>
//                           <p>Average hourly Memory requests per workload</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <button
//                       onClick={() => handleRequestSort('memRequests')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'memRequests' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">STO.</span>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Info size={12} className="ml-1 text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent className='bg-gray-600'>
//                           <p>Average hourly Storage requests per workload</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <button
//                       onClick={() => handleRequestSort('storageRequests')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'storageRequests' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">CPU</span>
//                     <button
//                       onClick={() => handleRequestSort('cpuCost')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'cpuCost' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">MEM</span>
//                     <button
//                       onClick={() => handleRequestSort('memCost')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'memCost' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">STO.</span>
//                     <button
//                       onClick={() => handleRequestSort('storageCost')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'storageCost' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">TOTAL COST</span>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Info size={12} className="ml-1 text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent className='bg-gray-600 w-72'>
//                           <p>Sum of all pod costs in the workload.</p>
//                           <br />
//                           <p className='text-wrap'>Storage cost is not split between resource offering types and added only to On-Demand.</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <button
//                       onClick={() => handleRequestSort('totalCost')}
//                       className="ml-1 flex items-center justify-center"
//                     >
//                       {orderBy === 'totalCost' ? (
//                         order === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
//                       ) : <ArrowUp size={12} className="text-gray-400" />}
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-3 py-2 text-left">
//                   <div className="flex items-center">
//                     <span className="font-semibold text-xs text-gray-700">CHANGE</span>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Info size={12} className="ml-1 text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent className='bg-gray-600 w-72'>
//                           <p className='text-wrap'>Shows the percentage difference in total cost compared to the previous period.</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {sortedRows.map((row) => {
//                 const isItemSelected = isSelected(row.id);

//                 return (
//                   <tr
//                     key={row.id}
//                     onClick={() => handleClick(row.id)}
//                     className={`hover:bg-gray-50 cursor-pointer ${isItemSelected ? 'bg-blue-50' : ''}`}
//                   >
//                     <td className="px-3 py-2">
//                       <input
//                         type="checkbox"
//                         className="h-4 w-4 rounded border-gray-300 text-blue-600"
//                         checked={isItemSelected}
//                         onChange={() => { }} // Controlled component
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                     </td>
//                     <td className="px-3 py-2">
//                       <div className="flex items-center" style={{width: `${workloadColumnWidth}px`, minWidth: `${workloadColumnWidth}px` }}>
//                         {getColorBar(row.color)}
//                         <span className="text-blue-500 hover:underline">{row.workload}</span>
//                       </div>
//                     </td>
//                     <td className="px-3 py-2">{row.type}</td>
//                     <td className="px-3 py-2">
//                       <span className="text-blue-500">{row.namespace}</span>
//                     </td>
//                     <td className="px-3 py-2">{row.pods}</td>
//                     <td className="px-3 py-2">{row.cpuRequests.toFixed(2)} CPU</td>
//                     <td className="px-3 py-2">{row.memRequests.toFixed(2)} GiB</td>
//                     <td className="px-3 py-2">{row.storageRequests} GiB</td>
//                     <td className="px-3 py-2">${row.cpuCost.toFixed(2)}</td>
//                     <td className="px-3 py-2">${row.memCost.toFixed(2)}</td>
//                     <td className="px-3 py-2">${row.storageCost.toFixed(2)}</td>
//                     <td className="px-3 py-2">
//                       <div className="w-32">
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="font-medium">${row.totalCost.toFixed(2)}</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-1">
//                           <div
//                             className="bg-blue-600 h-1 rounded-full"
//                             style={{ width: `${(row.totalCost / 45) * 100}%` }}
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-3 py-2">-</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }