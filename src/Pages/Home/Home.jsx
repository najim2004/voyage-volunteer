import { Helmet } from "react-helmet-async";
import Slider from "../../Components/Slider";
import Testimonial from "./Testimonial/Testimonial";
import UpcomingEventsSection from "./UpComingEvent/UpComingEvent";
import VolunteerNeed from "./VolunteerNeed/VolunteerNeed";

const Home = () => {
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
