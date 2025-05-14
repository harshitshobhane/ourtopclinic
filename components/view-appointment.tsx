import { getAppointmentById } from "@/utils/services/appointment";
import React from "react";
import { NumberDomain } from "recharts/types/util/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { calculateAge, formatDateTime } from "@/utils";
import { ProfileImage } from "./profile-image";
import { Calendar, Phone } from "lucide-react";
import { format } from "date-fns";
import { AppointmentStatusIndicator } from "./appointment-status-indicator";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { AppointmentAction } from "./appointment-action";

export const ViewAppointment = async ({ id, buttonClassName }: { id: string | undefined, buttonClassName?: string }) => {
  const { data } = await getAppointmentById(Number(id!));
  const { userId } = await auth();

  if (!data) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={buttonClassName || "flex items-center justify-center rounded-full bg-blue-500/10 hover:underline text-blue-600 px-1.5 py-1 text-xs md:text-sm"}
        >
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] max-h-[95%] md:max-w-2xl 2xl:max-w-3xl p-8 overflow-y-auto bg-white/80 rounded-2xl shadow-xl border border-emerald-100">
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">Patient Appointment</DialogTitle>
            <DialogDescription className="mb-4 text-base text-gray-500">
              This appointment was booked on the <span className="font-semibold text-emerald-700">{formatDateTime(data?.created_at.toString())}</span>
            </DialogDescription>
          </DialogHeader>

          {data?.status === "CANCELLED" && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded-md mb-4">
              <span className="font-semibold text-sm text-yellow-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
                This appointment has been cancelled
              </span>
              <p className="text-sm text-yellow-800 mt-1"><strong>Reason</strong>: {data?.reason}</p>
            </div>
          )}

          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-6 bg-emerald-400 rounded-full" />
              <p className="font-semibold text-emerald-700 text-sm uppercase tracking-widest">Personal Information</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex gap-4 w-full md:w-1/2 items-center bg-emerald-50/40 rounded-xl p-4 shadow-sm">
                <ProfileImage
                  url={data?.patient?.img!}
                  name={data?.patient?.first_name + " " + data?.patient?.last_name}
                  className="size-20 bg-blue-500 border-2 border-white shadow"
                  textClassName="text-2xl"
                />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-gray-900 uppercase">{data?.patient?.first_name + " " + data?.patient?.last_name}</h2>
                  <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={18} className="text-gray-500" />
                    {calculateAge(data?.patient?.date_of_birth)}
                  </p>
                  <span className="flex items-center text-xs gap-2 text-gray-500">
                    <Phone size={14} className="text-gray-400" />
                    {data?.patient?.phone}
                  </span>
                </div>
              </div>
              <div className="flex-1 bg-gray-50/60 rounded-xl p-4 shadow-sm">
                <span className="text-xs text-gray-500 font-semibold">Address</span>
                <p className="text-gray-700 capitalize text-sm mt-1">{data?.patient?.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-6 bg-blue-400 rounded-full" />
              <p className="font-semibold text-blue-700 text-sm uppercase tracking-widest">Appointment Information</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
              <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                <span className="text-xs text-gray-500">Date</span>
                <p className="text-base font-semibold text-gray-900 mt-1">{format(data?.appointment_date, "MMM dd, yyyy")}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                <span className="text-xs text-gray-500">Time</span>
                <p className="text-base font-semibold text-gray-900 mt-1">{data?.time}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow border border-gray-100 flex flex-col gap-1">
                <span className="text-xs text-gray-500">Status</span>
                <span>
                <AppointmentStatusIndicator status={data?.status} />
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow border border-gray-100 flex flex-col gap-1">
                <span className="text-xs text-gray-500">Mode</span>
                <span className="text-base font-semibold text-gray-900 mt-1">{data?.mode}</span>
              </div>
            </div>

            {data?.note && (
              <div className="bg-emerald-50/60 border-l-4 border-emerald-400 px-4 py-2 rounded italic text-gray-700 text-sm mb-2">
                <span className="text-xs text-emerald-700 font-semibold">Note from Patient:</span> {data?.note}
              </div>
            )}

            <div className="flex items-center gap-2 mb-2 mt-6">
              <span className="w-2 h-6 bg-emerald-400 rounded-full" />
              <p className="font-semibold text-emerald-700 text-sm uppercase tracking-widest">Physician Information</p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex gap-4 items-center bg-emerald-50/40 rounded-xl p-4 shadow-sm">
                <ProfileImage
                  url={data?.doctor?.img!}
                  name={data?.doctor?.name}
                  className="xl:size-20 bg-emerald-600 border-2 border-white shadow"
                  textClassName="xl:text-2xl"
                />
                <div>
                  <h2 className="text-lg uppercase font-bold text-gray-900">{data?.doctor?.name}</h2>
                  <p className="flex items-center gap-2 text-gray-600 capitalize text-sm">{data?.doctor?.specialization}</p>
                </div>
              </div>
            </div>

            {((await checkRole("ADMIN")) || data?.doctor?.id === userId) && (
              <>
                <div className="flex items-center gap-2 mb-2 mt-6">
                  <span className="w-2 h-6 bg-blue-400 rounded-full" />
                  <p className="font-semibold text-blue-700 text-sm uppercase tracking-widest">Actions</p>
                </div>
                <div className="bg-blue-50/60 border-l-4 border-blue-400 px-4 py-2 rounded mb-2">
                <AppointmentAction id={data.id} status={data?.status} />
                </div>
              </>
            )}
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};