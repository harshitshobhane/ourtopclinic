"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { Users } from "lucide-react";
import { formatNumber } from "@/utils";

export const StatSummary = ({ data, total }: { data: any; total: number }) => {
  const dataInfo = [
    { name: "Total", count: total || 0, fill: "white" },
    {
      name: "Appointments",
      count: data?.PENDING + data?.SCHEDULED || 0,
      fill: "#000000",
    },
    { name: "Consultation", count: data?.COMPLETED || 0, fill: "#2563eb" },
  ];

  const appointment = dataInfo[1].count;
  const consultation = dataInfo[2].count;

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 p-2 sm:p-6 w-full h-full overflow-hidden">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-2xl z-10" />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-600 rounded-full p-2 shadow-sm">
            <Users className="w-5 h-5" />
          </span>
          <h1 className="text-base sm:text-2xl font-extrabold text-gray-900 tracking-tight">Summary</h1>
        </div>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="font-normal text-xs border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 flex items-center gap-2"
        >
          <Link href="/record/appointments">See details</Link>
        </Button>
      </div>
      <div className="relative w-full h-[180px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height={typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 300}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={dataInfo}
          >
            <RadialBar background dataKey={"count"} />
          </RadialBarChart>
        </ResponsiveContainer>
        <Users
          size={30}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#000000] rounded-xl" />
            <div className="flex flex-col">
              <h1 className="font-bold text-base sm:text-xl text-gray-900">{formatNumber(appointment)}</h1>
              <h2 className="text-xs text-gray-500 font-medium">
                {dataInfo[1].name} ({((appointment / (appointment + consultation)) * 100).toFixed(0)}%)
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#2563eb] rounded-xl" />
            <div className="flex flex-col">
              <h1 className="font-bold text-base sm:text-xl text-gray-900">{formatNumber(consultation)}</h1>
              <h2 className="text-xs text-gray-500 font-medium">
                {dataInfo[2].name} ({((consultation / (appointment + consultation)) * 100).toFixed(0)}%)
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};