import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none"></div>

      <div className="fixed top-0 left-0 h-screen w-14 lg:w-[5rem] xl:w-[6rem] hover:w-[14%] md:hover:w-[8%] lg:hover:w-[16%] xl:hover:w-[14%] z-20 transition-all duration-300 ease-in-out flex flex-col justify-between">
        <Sidebar />
      </div>

      <div className="ml-14 lg:ml-[5rem] xl:ml-[6rem] transition-all duration-300 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 w-full p-1 sm:p-2 md:p-4 overflow-y-auto min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;