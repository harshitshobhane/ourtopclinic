import { auth } from "@clerk/nextjs/server";
import { getPatientFullDataById } from "@/utils/services/patient";
import { format } from "date-fns";

interface MedicalHistoryWrapperProps {
  patientId: string;
}

export const MedicalHistoryWrapper = async ({ patientId }: MedicalHistoryWrapperProps) => {
  const { userId } = await auth();
  const result = await getPatientFullDataById(patientId);
  if (!result.success) {
    return <div>Error loading medical history.</div>;
  }
  const { data } = result as { success: true; data: any };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Medical History</h2>
      <div className="grid gap-4">
        {data?.appointments?.map((appointment: any, index: number) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Appointment on {format(new Date(appointment.appointment_date), "MMMM dd, yyyy")}
                </p>
                <p className="text-sm text-gray-600">
                  {appointment.notes || "No notes available"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">
                  {appointment.status || "Completed"}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.doctor_name || "Dr. Smith"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 