import React from 'react'
import WorkloadTable from './WorkloadTable'

const Workload = () => {
  return (
    <>
    <div>
        <h1 className='bg-red-700 text-[28px] font-bold'>Workloads</h1>
    </div>
    <div>
        Graph will go here
    </div>
    <WorkloadTable/>
    </>
  )
}

export default Workload