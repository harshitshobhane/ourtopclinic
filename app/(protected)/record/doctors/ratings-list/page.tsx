import { getDoctorRatings } from "@/utils/services/rating";
import { RatingsListClient } from "./ratings-list-client";

const RatingsListPage = async (props: { params: { id: string } }) => {
  const { params } = props;
  const ratings = await getDoctorRatings(params.id);

  return <RatingsListClient ratings={ratings} />;
};

export default RatingsListPage; 