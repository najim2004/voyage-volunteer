import { Helmet } from "react-helmet-async";
import Slider from "../../Components/Slider";
import Testimonial from "./Testimonial/Testimonial";
import UpcomingEventsSection from "./UpComingEvent/UpComingEvent";
import VolunteerNeed from "./VolunteerNeed/VolunteerNeed";
import { useContext } from "react";
import { AuthData } from "../../Context/AuthProvider";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
  const { dataLoading } = useContext(AuthData);
  if (dataLoading) return <Loader />;
  return (
    <div>
      <Helmet>
        <title>Voyage Volunteer | Home</title>
      </Helmet>
      <Slider></Slider>
      <VolunteerNeed />
      <Testimonial />
      <UpcomingEventsSection />
    </div>
  );
};

export default Home;
