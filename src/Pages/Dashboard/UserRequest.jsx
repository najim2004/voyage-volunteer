import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../Context/AuthProvider";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxios";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import no from "/public/no.json";
import RequestCard from "./RequestCard";
import Swal from "sweetalert2";
const UserRequest = () => {
  const { url, user, reRender, setRender } = useContext(AuthData);
  const [data, setData] = useState();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/requests?organizer_email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [url, user, reRender, axiosSecure]);
  const handleSave = async (id, status) => {
    console.log(status);
    try {
      const { data } = await axiosSecure.patch(`/requests/${id}`, { status });
      if (data.modifiedCount > 0) {
        setRender(!reRender);
        Swal.fire({
          title: "Successfully Saved!",
          icon: "success",
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative">
      <Helmet>
        <title>VV | User Requested Post</title>
      </Helmet>
      <div className="max-w-[1250px] min-h-[calc(100vh-140px)] pt-8 mx-auto">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8">
          User Requested Posts
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody className="flex flex-col gap-3 *:!rounded-[10px]">
              {data?.map((post) => (
                <RequestCard
                  handleSave={handleSave}
                  key={post._id}
                  post={post}
                />
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

export default UserRequest;
