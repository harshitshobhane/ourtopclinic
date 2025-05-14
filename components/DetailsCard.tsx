import { getPatientFullDataById } from "@/utils/services/patient";
import { format } from "date-fns";

const SmallCard = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full md:w-1/3">
    <span className="text-sm text-gray-500">{label}</span>
    <p className="text-sm md:text-base capitalize">{value}</p>
  </div>
);

export const DetailsCard = async ({ id }: { id: string }) => {
  const { data } = await getPatientFullDataById(id);
  return (
    <div className="bg-white rounded-xl p-6 w-full lg:w-[70%] border-none space-y-6">
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
        <SmallCard label="Gender" value={data?.gender?.toLowerCase() || ""} />
        <SmallCard label="Date of Birth" value={data?.date_of_birth ? format(data?.date_of_birth, "yyyy-MM-dd") : ""} />
        <SmallCard label="Phone Number" value={data?.phone || ""} />
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
        <SmallCard label="Marital Status" value={data?.marital_status || ""} />
        <SmallCard label="Blood Group" value={data?.blood_group || ""} />
        <SmallCard label="Address" value={data?.address || ""} />
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
        <SmallCard label="Contact Person" value={data?.emergency_contact_name || ""} />
        <SmallCard label="Emergency Contact" value={data?.emergency_contact_number || ""} />
        <SmallCard label="Last Visit" value={data?.lastVisit ? format(data?.lastVisit, "yyyy-MM-dd") : "No last visit"} />
      </div>
    </div>
  );
}; 