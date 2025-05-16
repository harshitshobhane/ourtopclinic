import { getDoctorRatings } from "@/utils/services/rating";
import { RatingsListClient } from "./ratings-list-client";

interface RatingsListPageProps {
  params: {
    id: string;
  };
}

export default async function RatingsListPage({ params }: RatingsListPageProps) {
  const ratings = await getDoctorRatings(params.id);

  return <RatingsListClient ratings={ratings} />;
} 