import OverviewCards from "@/components/OverviewCards";
import Sidebar from "@/components/Sidebar";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar />

      <div className="p-6 space-y-6 flex-1">
        <OverviewCards />
      </div>
    </div>
  );
};

export default AdminDashboard;
