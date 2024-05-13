import { useContext } from "react";
import { AuthData } from "../../../Context/AuthProvider";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css/navigation";
const UpcomingEventsSection = () => {
  const { themData } = useContext(AuthData);
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Cleanup Day",
      date: "Saturday, May 15, 2024",
      location: "City Park",
      description:
        "Join us for a day of community service as we clean up our local park. All volunteers are welcome!",
    },
    {
      id: 2,
      title: "Food Drive for the Homeless",
      date: "Sunday, May 23, 2024",
      location: "Downtown Shelter",
      description:
        "Help us collect and distribute food items to those in need. Your support can make a difference!",
    },
    {
      id: 3,
      title: "Environmental Awareness Workshop",
      date: "Saturday, June 5, 2024",
      location: "Local Community Center",
      description:
        "Join us for an interactive workshop on environmental issues and learn how you can contribute to a greener future.",
    },
    {
      id: 4,
      title: "Senior Citizens Bingo Night",
      date: "Friday, June 18, 2024",
      location: "Senior Center",
      description:
        "Volunteers needed to assist with organizing and facilitating a fun-filled bingo night for senior citizens.",
    },
    {
      id: 5,
      title: "Summer Camp Volunteer Orientation",
      date: "Saturday, July 3, 2024",
      location: "Youth Center",
      description:
        "Attend our volunteer orientation session to learn about opportunities to mentor and support children at summer camp.",
    },
    {
      id: 6,
      title: "Blood Drive for Red Cross",
      date: "Sunday, July 25, 2024",
      location: "Local Hospital",
      description:
        "Help save lives by donating blood at our community blood drive. Every donation makes a difference!",
    },
    // Add more upcoming events as needed
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
        <p className="text-center max-w-[700px] mx-auto font-medium mt-6 mb-8">
          Discover exciting opportunities to make a difference in your community
          with our upcoming events. Join us for meaningful experiences and
          impactful volunteering opportunities.
        </p>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            // when window width is smaller than sm breakpoint

            640: {
              slidesPerView: 1,
            },
            // when window width is between sm and md breakpoint
            768: {
              slidesPerView: 1,
            },
            // when window width is between md and lg breakpoint
            1024: {
              slidesPerView: 2,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-[260px]"
        >
          {upcomingEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <div
                className={`${
                  themData ? "bg-gray-800" : ""
                } shadow-md rounded-lg p-6 h-[250px]`}
              >
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date}</p>
                <p className="text-gray-600 mb-4">{event.location}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
