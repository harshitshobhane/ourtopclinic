import { auth } from "@clerk/nextjs/server";
import { getPatientAppointments } from "@/utils/services/appointment";
import MessagesWrapper from "./MessagesWrapper";

export default async function MessagesPage() {
  const { userId } = await auth();
  // Fetch all appointments for this patient
  const { data: appointments = [] } = await getPatientAppointments({
    page: 1,
    limit: 1000,
    id: userId!,
  });
  // Filter for SCHEDULED or COMPLETED
  const filtered = (appointments || []).filter(
    (a: any) => a.status === "SCHEDULED" || a.status === "COMPLETED"
  );
  // Deduplicate doctors by id
  const doctorMap = new Map();
  for (const a of filtered) {
    if (a.doctor && a.doctor.id && !doctorMap.has(a.doctor.id)) {
      doctorMap.set(a.doctor.id, a.doctor);
    }
  }
  const doctors = Array.from(doctorMap.values());

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <MessagesWrapper doctors={doctors} />
    </div>
  );
} 