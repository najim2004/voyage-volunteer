import sImg1 from "../assets/slider/slider1.jpg";
import sImg2 from "../assets/slider/slider2.jpg";
import sImg3 from "../assets/slider/slider3.jpg";
import sImg4 from "../assets/slider/slider4.jpg";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { useContext } from "react";
import { AuthData } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
const Slider = () => {
  const { user } = useContext(AuthData);
  return (
    <div className="h-screen w-full -mt-[72px]">
      <Swiper
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation]}
        className="mySwiper relative group"
      >
        <SwiperSlide>
          <div
            className="h-screen bg-center bg-no-repeat bg-cover w-full"
            style={{ backgroundImage: `url(${sImg1})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-screen bg-center bg-no-repeat bg-cover w-full"
            style={{ backgroundImage: `url(${sImg2})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-screen bg-center bg-no-repeat bg-cover w-full"
            style={{ backgroundImage: `url(${sImg3})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-screen bg-center bg-no-repeat bg-cover w-full"
            style={{ backgroundImage: `url(${sImg4})` }}
          ></div>
        </SwiperSlide>
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30 z-50">
          <div className="relative flex justify-center items-center inset-0 w-full h-full">
            <div className="absolute h-full top-0 z-40 group-hover:flex hidden items-center justify-between lg:p-6 left-0">
              <button className="btn bg-transparent border-none hover:bg-transparent text-5xl text-cRed shadow-none !p-0 prev-btn">
                <LuChevronLeftCircle />
              </button>
            </div>
            <div className="absolute h-full top-0 z-40 group-hover:flex hidden items-center justify-between lg:p-6 right-0">
              <button className="btn bg-transparent border-none hover:bg-transparent text-5xl text-cRed shadow-none !p-0 next-btn">
                <LuChevronRightCircle />
              </button>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h1 className="text-6xl text-white font-bold max-w-[1000px] text-center leading-[80px]">
                Welcome to Volunteer Management Website
              </h1>
              <p className="text-gray-300 text-xl max-w-[700px] text-center my-4">
                Join us in making a difference by discovering volunteer
                opportunities near you. Explore meaningful ways to contribute
                and create positive change in your community. Together, we can
                make a difference
              </p>
              <div className="">
                {
                  <Link to={user ? "/need_volunteer" : "/login"}>
                    <button className="btn btn-sm w-[200px] border-[2px] hover:bg-cRed border-cRed text-xl bg-transparent h-12 rounded-md text-white font-bold">
                      Get Start
                    </button>
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
