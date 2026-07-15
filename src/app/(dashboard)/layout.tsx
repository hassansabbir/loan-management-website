import React from "react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import Topbar from "@/components/ui/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col ml-64 min-h-screen overflow-x-hidden">
        {/* Fixed Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
