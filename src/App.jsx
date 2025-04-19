import React from "react";
import Workload from "./shared-component/Workload/WorkloadHome";
import Dashboard from "./components/Dashboard";
import Header from "./shared-component/Header";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div >
      {/* <h1 class="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1> */}
        <Header />
      <div className=" h-10 bg-linear-to-b from-[#DEF3FB] to-[#F4F6F9]" />
      <div className="mx-20">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workload" element={<Workload />} />
      </Routes>
    </div>
    </div>
  );
};

export default App;
