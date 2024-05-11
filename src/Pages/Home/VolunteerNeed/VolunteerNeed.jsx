import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthData } from "../../../Context/AuthProvider";
import { CgDetailsMore } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

const VolunteerNeed = () => {
  const { data } = useContext(AuthData);
  return (
    <div className="mt-[100px] max-w-[1250px] mx-auto">
      <h3 className="text-4xl text-center font-semibold">
        Volunteer Needs Now
      </h3>
      <p className="text-center max-w-[700px] mx-auto font-medium mt-6">
        Discover urgent volunteer opportunities in your community. Browse
        projects needing immediate support, from food drives to environmental
        cleanup, and make a difference today.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0, 6).map((post) => (
          <div key={post._id} className="p-4 flex flex-col">
            <div className="flex-grow ">
              <img
                className="w-full bg-gray-200 h-[250px] rounded-[5px]"
                src={post.thumbnail}
                alt=""
              />
              <div className="flex justify-between font-medium text-gray-500 mt-4">
                <p className="flex items-center gap-1">
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
