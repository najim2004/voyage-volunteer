import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthData } from "../../../Context/AuthProvider";
import axios from "axios";
import { IoCloseCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { Warning } from "postcss";
import toast, { Toaster } from "react-hot-toast";
import { render } from "react-dom";
const RequestForm = ({ data }) => {
  const { user, themeData, sweetAlert, url, reRender, setRender } =
    useContext(AuthData);
  const [requestedData, setRequestedData] = useState([]);
  const [reRender2, setReRender2] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/requests?email=${user?.email}`, { withCredentials: true })
      .then((res) => {
        setRequestedData(res.data);
      });
  }, [url, user, reRender, reRender2]);

  const handleRequest = (e) => {
    e.preventDefault();
    const requestData = {
      v_name: e.target.v_name.value,
      v_email: e.target.v_email.value,
      status: "requested",
      postTitle: data.postTitle,
      thumbnail: data.thumbnail,
      description: data.description,
      category: data.category,
      location: data.location,
      volunteersNeeded: parseInt(data.volunteersNeeded),
      deadline: data.deadline,
      organizer_name: data.organizer_name,
      organizer_email: data.organizer_email,
      id: data._id,
    };

    const findData = requestedData?.map((item) => {
      if (
        item.postTitle == requestData.postTitle &&
        item.deadline == requestData.deadline
      ) {
        return true;
      }
    });
    setRender(!reRender);
    if (!findData.includes(true)) {
      if (requestData.v_email !== requestData.organizer_email) {
        axios
          .post(`${url}/requests`, requestData)
          .then((res) => {
            setRender(!reRender);
            axios
              .patch(`${url}/all-volunteer-post/decrement/${data?._id}`)
              .then((res) => {
                console.log(res.data);
                setRender(!reRender);
                setReRender2(!reRender2);
                toast("Request sent successfully");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast("Sorry you can't Request on your post!");
      }
    } else {
      toast("Already requested");
    }
  };
  return (
    <div className="max-w-[1250px] p-3 lg:p-6 min-h-[calc(100vh-113px)] overflow-x-hidden flex items-center justify-center mx-auto">
      <div
        className={`lg:max-w-[70%] mx-auto  ${
          themeData ? "dark:bg-gray-800" : "bg-gray-100"
        }  p-3 relative lg:p-6 rounded-[20px] overflow-x-hidden`}
      >
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn text-3xl text-cRed btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <IoCloseCircleSharp />
          </button>
        </form>

        <h3 className="text-center md:text-2xl mt-8 text-xl lg:text-3xl font-bold">
          Volunteer Join Requesting Form
        </h3>
        <form
          onSubmit={handleRequest}
          className="grid grid-cols-1 mx-auto r-form lg:px-10 mt-8 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="font-bold">Volunteer name</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="volunteer name"
              name="v_name"
              value={user?.displayName}
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">volunteer email</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="volunteer email"
              name="v_email"
              value={user?.email}
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Suggestion</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Suggestion"
              name="suggestion"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Title</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              value={data?.postTitle}
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Thumbnail</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              value={data?.thumbnail}
              disabled
            />
          </div>
          <div className="space-y-2 ">
            <label className="font-bold">Description</label>
            <textarea
              type="text"
              className={`w-full h-[100px] ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] p-4`}
              value={data?.description}
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Category</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              value={data?.category}
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Location</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              value={data?.location}
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">volunteers needed</label>
            <input
              type="number"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              value={data?.volunteersNeeded}
              disabled
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label className="font-bold">Deadline</label>
            <input
              type="text"
              disabled
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              value={data?.deadline}
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Organizer name</label>
            <input
              type="text"
              disabled
              value={data?.organizer_name}
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Organizer email</label>
            <input
              type="text"
              value={data?.organizer_email}
              disabled
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
            />
          </div>

          <input
            type="submit"
            className="w-full lg:col-span-2 btn btn-sm h-12 rounded-[10px] text-white font-bold bg-cRed"
            value={"Request Now"}
          />
        </form>
        <Toaster
          toastOptions={{
            className: `!bg-gray-200 !text-red-500`,
          }}
          position="bottom-center"
          reverseOrder={false}
        />
      </div>
    </div>
  );
};

RequestForm.propTypes = {
  data: PropTypes.object,
};
export default RequestForm;
