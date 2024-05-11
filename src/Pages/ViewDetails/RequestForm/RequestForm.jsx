import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthData } from "../../../Context/AuthProvider";
const RequestForm = ({ data }) => {
  const { user, themeData, sweetAlert } = useContext(AuthData);
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
      volunteersNeeded: data.volunteersNeeded,
      deadline: data.deadline,
      organizer_name: data.organizer_name,
      organizer_email: data.organizer_email,
    };
    console.log(requestData);
  };
  return (
    <div className="max-w-[1250px] p-3 lg:p-6 mx-auto">
      <div
        className={`lg:max-w-[70%] mx-auto  ${
          themeData ? "dark:bg-gray-800" : "bg-gray-100"
        } min-h-[calc(100vh-113px)] p-3 lg:p-6 rounded-[20px]`}
      >
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
      </div>
    </div>
  );
};

RequestForm.propTypes = {
  data: PropTypes.object,
};
export default RequestForm;
