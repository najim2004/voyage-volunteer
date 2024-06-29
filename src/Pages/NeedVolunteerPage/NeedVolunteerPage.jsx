import { BiCategoryAlt } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Helmet } from "react-helmet-async";
import { MdOutlinePublic } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { AuthData } from "../../Context/AuthProvider";

const NeedVolunteerPage = () => {
  const { refetchData, setRefetchData } = useContext(AuthData);
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState();
  const axiosPublic = useAxiosPublic();
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allData"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/all-volunteer-post?title=${search.length > 0 ? search : ""}`
      );
      return response.data;
    },
  });
  useEffect(() => {
    setRefetchData({ ...refetchData, allPost: refetch });
  }, [refetch, refetchData, setRefetchData]);
  if (isLoading) return <Loader />;
  return (
    <div className="max-w-[1250px] mx-auto min-h-[calc(100vh-73px)]">
      <Helmet>
        <title>VV || Volunteer posts</title>
      </Helmet>
      <h3 className="text-3xl font-bold text-center mt-12">
        Find Volunteer Opportunities Near You
      </h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const query = e.target.search.value;
          await setSearch(query);
          await refetch();
        }}
        className="h-12 w-full mt-8 px-3 lg:w-[752px] mx-auto rounded-lg flex items-center "
      >
        <input
          className="w-full rounded-lg outline-none border border-gray-200 rounded-r-none p-4 bg-transparent h-full "
          type="text"
          name="search"
          placeholder="Search your post"
        />

        <input
          type="submit"
          value={"Search"}
          className="btn h-full lg:w-[150px] border-none rounded-l-none bg-cRed text-lg font-semibold text-white"
        />
      </form>
      <div className="mt-10 flex justify-end gap-4 pr-5 text-2xl">
        <RiLayoutGrid2Fill
          className={`${grid ? "text-cRed" : ""}`}
          onClick={() => setGrid(true)}
        />
        <GiHamburgerMenu
          className={`${!grid ? "text-cRed" : ""}`}
          onClick={() => setGrid(false)}
        />
      </div>
      <div className="mt-4 grid px-3 grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 lg:gap-8 lg:grid-cols-3">
        {grid &&
          posts?.map((post) => (
            <div key={post._id} className=" flex flex-col">
              <div className="flex-grow relative ">
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
      {!grid && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody className="flex flex-col gap-3 *:!rounded-[10px]">
              {posts?.map((post) => (
                <tr
                  className="font-bold lg:text-lg border border-gray-300 flex justify-between items-center"
                  key={post._id}
                >
                  <td>
                    <img
                      src={post.thumbnail}
                      className="min-w-[100px] max-w-[100px] lg:max-w-[250px] w-full lg:min-w-[250px] h-[90px] lg:h-[150px] rounded-[10px] bg-gray-200"
                      alt=""
                    />
                  </td>
                  <td className="lg:w-[350px]">{post.postTitle}</td>
                  <td>
                    <p className=" text-nowrap flex items-center gap-1 font-semibold text-gray-500">
                      <BiCategoryAlt />
                      {post.category}
                    </p>
                  </td>
                  <td>
                    <p className="flex text-nowrap items-center gap-1">
                      Deadline:
                      <CiCalendar />
                      {post.deadline}
                    </p>
                  </td>
                  <td>
                    <Link to={`/details/${post._id}`}>
                      <button className="btn btn-sm flex items-center gap-1 rounded-[5px] font-bold text-white bg-cRed h-10 min-w-[150px]">
                        View Details <CgDetailsMore />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-gray-500">No post found</p>
          <Link to={"/"}>
            <button className="btn rounded-md bg-cRed text-white font-semibold px-10 mt-6">
              BACK TO HOME
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NeedVolunteerPage;
