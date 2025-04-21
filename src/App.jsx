import React from "react";
import Workload from "./shared-component/Workload/WorkloadHome";
import Dashboard from "./components/Dashboard";
import Header from "./shared-component/Header";
import { Route, Routes, useLocation } from "react-router";
import LoginPage from "./auth/LoginPage";

const App = () => {
  console.log("window.location.pathname", window.location.pathname);
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && (
        <>
          <Header />
          <div className="h-10 bg-linear-to-b from-[#DEF3FB] to-[#F4F6F9]" />
        </>
      )}
      <div className="mx-20">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workload" element={<Workload />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
