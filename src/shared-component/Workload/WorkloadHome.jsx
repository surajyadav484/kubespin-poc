import React from 'react'
import WorkloadTable from './Table'
import WorkloadGraph from './WorkloadGraph'

const Workload = () => {
  return (
    <>
      <div>
        <h1 className='bg-red-700 text-[28px] font-bold'>Workloads</h1>
      </div>
      <div>
        <WorkloadGraph/>
      </div>
      <WorkloadTable />
    </>
  )
}

export default Workload