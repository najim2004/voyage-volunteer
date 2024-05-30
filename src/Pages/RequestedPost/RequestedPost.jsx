import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import no from "/public/no.json";
import { Link } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import useAxiosSecure from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
import { MdReadMore } from "react-icons/md";

const RequestedPost = () => {
  const { url, user, reRender, setRender } = useContext(AuthData);
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/requests?v_email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [url, user, reRender, axiosSecure]);

  const handleCancel = async (id, pId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res1 = await axios.delete(`${url}/requests/${id}`);
          console.log(res1.data);
          if (res1.data.deletedCount > 0) {
            const res = await axios.patch(
              `${url}/all-volunteer-post/increment/${pId}`
            );
            console.log(res.data);
            setData(data.filter((item) => item._id !== id));
            setRender(!reRender);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <div className="relative">
      <Helmet>
        <title>VV | My Requested Post</title>
      </Helmet>
      <div className="max-w-[1250px] min-h-[calc(100vh-140px)] pt-8 mx-auto">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8">
          My Volunteer Requested Posts
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody className="flex flex-col gap-3 *:!rounded-[10px]">
              {data?.map((post) => (
                <tr
                  className="font-bold flex justify-between items-center text-lg border  border-gray-300 "
                  key={post._id}
                >
                  <td>
                    <img
                      src={post.thumbnail}
                      className="min-w-[200px] max-w-[200px] h-[130px] rounded-[10px] bg-gray-200"
                      alt=""
                    />
                  </td>
                  <td className="lg:w-[350px]">{post.postTitle}</td>
                  <td className="text-nowrap">Deadline:{post.deadline}</td>
                  <td>
                    <div className=" bg-green-500 w-[90px] flex justify-center items-center text-white rounded-md !text-center !font-semibold h-10">
                      {post.status}
                    </div>
                  </td>
                  <td>
                    <Link to={`/details/${post.id}`}>
                      <button className="btn btn-sm text-2xl flex items-center gap-1 rounded-[5px] font-bold text-white bg-cRed h-10">
                        <MdReadMore />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(post._id, post.id)}
                      className="btn bg-red-500 text-white btn-sm h-10"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.length == 0 && (
          <div className="flex flex-col items-center justify-center">
            <Lottie animationData={no} className="max-w-[350px]" />
            <h3 className="text-3xl font-bold text-red-500">No Post Found!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedPost;
