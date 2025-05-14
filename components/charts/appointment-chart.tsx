"use client";
import { AppointmentsChartProps } from "@/types/data-types";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Legend,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart2 } from "lucide-react";

interface DataProps {
  data: AppointmentsChartProps;
}
export const AppointmentChart = ({ data }: DataProps) => {
  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 p-2 sm:p-6 h-full overflow-hidden w-full">
      {/* Animated Gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-2xl z-10 animate-shimmer" />
      <div className="flex items-center gap-3 mb-2">
        <span className="relative flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/40 to-blue-400/30 blur-md scale-110 z-0 animate-pulse" />
          <span className="bg-emerald-100 text-emerald-600 rounded-full p-2 shadow-sm relative z-10">
            <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
          </span>
        </span>
        <div>
          <h1 className="text-base sm:text-2xl font-extrabold text-gray-900 tracking-tight">Appointments</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">Monthly Overview</p>
        </div>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-white/90 via-emerald-50 to-blue-50 p-2 sm:p-4 shadow-inner w-full">
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 180 : 300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAppointment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tick={{ fill: "#9ca3af", fontWeight: 500 }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: "#9ca3af", fontWeight: 500 }} tickLine={false} />
          <Tooltip
              contentStyle={{ borderRadius: "14px", borderColor: "#fff", background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 24px 0 rgba(16,185,129,0.12)" }}
              itemStyle={{ fontWeight: 600, color: "#2563eb" }}
              labelStyle={{ color: "#0f172a", fontWeight: 700 }}
          />
          <Legend
            align="left"
            verticalAlign="top"
              iconType="circle"
            wrapperStyle={{
                paddingTop: "10px",
                paddingBottom: "20px",
              textTransform: "capitalize",
                fontWeight: 700,
                color: "#2563eb",
                fontSize: "1rem",
                letterSpacing: "0.01em",
            }}
          />
            <Area
              type="monotone"
            dataKey="appointment"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorAppointment)"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={900}
          />
            <Area
              type="monotone"
            dataKey="completed"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorCompleted)"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={900}
          />
          </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};