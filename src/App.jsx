import React from 'react'
import Workload from './shared-component/Workload/WorkloadHome'
import Dashboard from './components/Dashboard'
import Header from './shared-component/Header'
const App = () => {
  return (
    <div className='p-3'>
      {/* <h1 class="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1> */}
      <Header />
      <div className=' h-10 bg-linear-to-b from-[#DEF3FB] to-[#F4F6F9]' />
      <Dashboard />
      <Workload />
    </div>
  )
}

export default App
