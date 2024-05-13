import { useContext } from "react";
import { AuthData } from "../../../Context/AuthProvider";
import Marquee from "react-fast-marquee";

const Testimonial = () => {
  const { testimonial, themeData } = useContext(AuthData);
  return (
    <div className="max-w-[1450px] mx-auto">
      <section className="my-8">
        <div className="container flex flex-col items-center mx-auto mb-8 md:p-10 md:px-12">
          <h1 className="p-4 text-4xl font-semibold leading-none text-center">
            What our people are saying about us
          </h1>
          <p className="text-center max-w-[700px] mx-auto font-medium">
            Discover why our community loves us! From seamless user experience
            to impactful volunteering opportunities, hear what our users have to
            say about their experiences with us
          </p>
        </div>
        <Marquee>
          <div className=" flex">
            {testimonial?.map((item) => (
              <div key={item._id} className="flex flex-col max-w-sm mx-4 mb-6">
                <div
                  className={`px-4 py-12 h-[350px] rounded-t-lg sm:px-8 md:px-12 ${
                    themeData ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`relative px-6 py-1 text-lg italic text-center ${
                      themeData ? "text-gray-200" : "dark:text-gray-800"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-8 h-8 text-cRed"
                    >
                      <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                      <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                    </svg>
                    {item.testimonial}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="absolute right-0 w-8 h-8 text-cRed"
                    >
                      <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                      <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                    </svg>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-cRed dark:text-gray-50">
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 object-cover h-16 mb-2 -mt-16 bg-center bg-cover rounded-full"
                  />
                  <p className="text-xl font-semibold leading-tight">
                    {item.name}
                  </p>
                  <p className="text-sm uppercase">{item.position}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </section>
    </div>
  );
};

export default Testimonial;
