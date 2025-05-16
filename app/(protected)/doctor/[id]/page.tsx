import { auth } from "@clerk/nextjs/server";

interface DoctorProfilePageProps {
  params: Promise<{ id: string }>;
  searchParams: {
    cat?: string;
  };
}

export default async function DoctorProfilePage({ params, searchParams }: DoctorProfilePageProps) {
  const { userId } = await auth();
  const { id } = await params;
  const { cat } = searchParams;

  // If id is "self", use the logged-in user's ID
  const actualDoctorId = id === "self" ? userId! : id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
          <p className="text-gray-600 mt-2">Doctor ID: {actualDoctorId}</p>
        </div>
      </div>
    </div>
  );
}
