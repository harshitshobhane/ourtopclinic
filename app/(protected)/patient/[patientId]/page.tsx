import { PatientProfileContent } from "@/components/patient-profile-content";
import { getPatientFullDataById } from "@/utils/services/patient";
import { getPatientAppointments } from "@/utils/services/appointment";
import { auth } from "@clerk/nextjs/server";
import { MedicalHistoryContainer } from "@/components/medical-history-container";
import { PatientRatingContainer } from "@/components/patient-rating-container";

export default async function PatientProfilePage({
  params,
  searchParams,
}: {
  params: { patientId: string };
  searchParams: { cat?: string };
}) {
  const { userId } = await auth();
  const { patientId } = params;
  const { cat } = searchParams;

  const actualPatientId = patientId === "self" ? userId! : patientId;
  console.log("Fetching patient data for ID:", actualPatientId);

  const response = await getPatientFullDataById(actualPatientId);
  const hasData = response && "data" in response && response.data;

  const { data: appointments } = await getPatientAppointments({
    page: 1,
    limit: 10,
    id: actualPatientId,
  });

  const now = new Date();
  const upcomingAppointments = (appointments || [])
    .filter(
      (a: any) =>
        a.status === "SCHEDULED" && new Date(a.appointment_date) > now
    )
    .sort(
      (a: any, b: any) =>
        new Date(a.appointment_date).getTime() -
        new Date(b.appointment_date).getTime()
    )
    .slice(0, 3);

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800">Patient not found</h1>
            <p className="text-gray-600 mt-2">
              The patient you're looking for doesn't exist or you don't have
              permission to view it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PatientProfileContent
      data={response.data}
      id={actualPatientId}
      cat={cat || ""}
      medicalHistory={<MedicalHistoryContainer patientId={actualPatientId} />}
      patientRating={<PatientRatingContainer id={actualPatientId} />}
      upcomingAppointments={upcomingAppointments}
    />
  );
}
