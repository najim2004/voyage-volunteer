import { BiCategoryAlt } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { AuthData } from "../../Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NeedVolunteerPage = () => {
  const { data, url } = useContext(AuthData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(data);
  }, [data]);
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    axios
      .get(`${url}/all-volunteer-post?category=${search}`)
      .then((res) => {
        if (search) {
          setPosts(res.data);
        } else {
          setPosts(data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-w-[1250px] mx-auto">
      <form
        onSubmit={handleSearch}
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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
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
