import { availableDays } from "@/components/available-doctor";
import { PatientRatingContainer } from "@/components/patient-rating-container";
import { ProfileImage } from "@/components/profile-image";
import { RatingContainer } from "@/components/rating-container";
import { RecentAppointments } from "@/components/tables/recent-appointment";
import { getDoctorById } from "@/utils/services/doctor";
import { format } from "date-fns";
import Link from "next/link";
import { BsCalendarDateFill, BsPersonWorkspace } from "react-icons/bs";
import { FaBriefcaseMedical, FaCalendarDays } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { DoctorProfileClient } from "./doctor-profile-client";
import { getDoctorRatings, getRecentApplications } from "@/utils/services/rating";

const DoctorProfile = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { data, totalAppointment } = await getDoctorById(params?.id);

  if (!data) return null;

  // Calculate available days on the server
  const availableDaysStr = availableDays({ data: data.working_days });

  // Get recent applications
  const recentApplications = await getRecentApplications(params?.id);

  // Get ratings data
  const ratings = await getDoctorRatings(params?.id);

  return (
    <DoctorProfileClient 
      data={data} 
      totalAppointment={totalAppointment} 
      availableDaysStr={availableDaysStr}
      recentApplications={recentApplications}
      ratings={ratings}
    />
  );
};

export default DoctorProfile;