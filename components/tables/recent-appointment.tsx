import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Table } from "./table";
import { Appointment } from "@/types/data-types";
import { ProfileImage } from "../profile-image";
import { format } from "date-fns";
import { AppointmentStatusIndicator } from "../appointment-status-indicator";
import { ViewAppointment } from "../view-appointment";
import { Eye, ArrowUpRight } from "lucide-react";

interface DataProps {
  data: any[];
}
const columns = [
  { header: "Info", key: "name" },
  {
    header: "Date",
    key: "appointment_date",
    className: "hidden md:table-cell",
  },
  {
    header: "Time",
    key: "time",
    className: "hidden md:table-cell",
  },
  {
    header: "Doctor",
    key: "doctor",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    key: "status",
    className: "hidden xl:table-cell",
  },
  {
    header: "Actions",
    key: "action",
  },
];
export const RecentAppointments = ({ data }: DataProps) => {
  const renderRow = (item: Appointment) => {
    const name = item?.patient?.first_name + " " + item?.patient?.last_name;
    return (
      <tr key={item?.id}>
        <td className="py-4 px-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-300/40 to-violet-600/30 blur-sm scale-110 z-0" />
          <ProfileImage
            url={item?.patient?.img!}
            name={name}
                className="bg-violet-600 shadow-lg border-2 border-white w-12 h-12 text-lg relative z-10"
            bgColor={item?.patient?.colorCode!}
          />
            </div>
          <div>
              <h3 className="text-base font-bold uppercase text-gray-900 tracking-tight">{name}</h3>
              <span className="text-xs capitalize text-gray-500 font-medium">{item?.patient?.gender?.toLowerCase()}</span>
            </div>
          </div>
        </td>

        <td className="hidden md:table-cell font-medium text-gray-700 px-2 align-middle">{format(item?.appointment_date, "yyyy-MM-dd")}</td>
        <td className="hidden md:table-cell font-medium text-gray-700 px-2 align-middle">{item?.time}</td>
        <td className="hidden md:table-cell py-2 px-2 align-middle">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/40 to-blue-600/30 blur-sm scale-110 z-0" />
            <ProfileImage
              url={item?.doctor?.img!}
              name={item?.doctor?.name}
                className="bg-blue-600 shadow-md border-2 border-white w-12 h-12 text-lg relative z-10"
              bgColor={item?.doctor?.colorCode!}
                textClassName="text-black font-bold"
            />
            </div>
            <div className="border-l-2 border-emerald-100 pl-3">
              <h3 className="font-bold uppercase text-gray-900 text-base">{item?.doctor?.name}</h3>
              <span className="text-xs capitalize text-gray-500 font-medium">{item?.doctor?.specialization}</span>
            </div>
          </div>
        </td>

        <td className="hidden xl:table-cell">
          <AppointmentStatusIndicator status={item?.status} />
        </td>

        <td className="px-2 align-middle">
          <div className="flex items-center gap-x-2 h-9">
            <ViewAppointment id={item?.id} />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 p-6 overflow-hidden">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-2xl z-10" />
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Recent Appointments</h1>
        </div>
        <Button asChild variant="outline" className="flex items-center gap-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50">
          <Link href="/record/appointments">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
    </div>
  );
};