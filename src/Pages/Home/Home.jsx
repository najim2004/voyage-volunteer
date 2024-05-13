import Slider from "../../Components/Slider";
import Testimonial from "./Testimonial/Testimonial";
import VolunteerNeed from "./VolunteerNeed/VolunteerNeed";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <VolunteerNeed />
      <Testimonial />
    </div>
  );
};

export default Home;
