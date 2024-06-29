import { Link } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlinePublic } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader/Loader";

const VolunteerNeed = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/all-volunteer-post`);
      return response.data;
    },
  });
  if (isLoading) return <Loader />;

  return (
    <div className="mt-[100px] px-3 max-w-[1250px] mx-auto">
      <h3 className="text-4xl text-center font-semibold">
        Volunteer Needs Now
      </h3>
      <p className="text-center max-w-[700px] mx-auto font-medium mt-6">
        Discover urgent volunteer opportunities in your community. Browse
        projects needing immediate support, from food drives to environmental
        cleanup, and make a difference today.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-8 md:gap-6 lg:grid-cols-3">
        {data?.slice(0, 6).map((post) => (
          <div key={post._id} className="flex flex-col">
            <div className="flex-grow relative">
              <img
                className="w-full bg-gray-200 h-[250px] rounded-[5px]"
                src={post.thumbnail}
                alt=""
              />
              <div className="absolute top-0 flex left-0 w-full">
                <h3 className="flex items-center gap-1 px-1 mt-1 text-white bg-opacity-30 backdrop-blur-[1px] rounded-full bg-black">
                  <MdOutlinePublic /> {post.postDate}
                </h3>
              </div>
              <div className="flex justify-between font-medium text-gray-500 mt-4">
                <p className="flex items-center gap-1">
                  Deadline:
                  <CiCalendar />
                  {post.deadline}
                </p>
                <p>{post.organizer_name}</p>
              </div>
              <h3 className="mt-3 font-bold text-2xl">{post.postTitle}</h3>
            </div>
            <div className="flex mt-4 justify-between">
              <p className="text-lg flex items-center gap-1 font-semibold text-gray-500">
                <BiCategoryAlt />
                {post.category}
              </p>
              <Link to={`/details/${post._id}`}>
                <button className="btn btn-sm flex items-center gap-1 rounded-[5px] font-bold text-white bg-cRed h-10">
                  View Details <CgDetailsMore />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-5 text-2xl font-semibold text-cRed">
        <Link
          to={"/need_volunteer"}
          className="flex mr-3 lg:mr-6 items-center gap-2"
        >
          See All <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeed;
