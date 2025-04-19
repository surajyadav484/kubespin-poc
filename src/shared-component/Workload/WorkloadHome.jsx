import React from 'react'
import WorkloadTable from './Table'
import WorkloadGraph from './WorkloadGraph'
import HeaderTile from '@/components/HeaderTile'

const Workload = () => {
  return (
    <>
      {/* <div>
        <h1 className='bg-red-700 text-[28px] font-bold'>Workloads</h1>
      </div> */}
      <HeaderTile title='Workloads' subText="Get free cost monitoring, security and optimization insights for K8s" />
      <div className="mt-5">
        <WorkloadGraph/>
      </div>
      <WorkloadTable />
    </>
  )
}

export default Workload