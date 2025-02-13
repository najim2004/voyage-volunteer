import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthData } from "../../Context/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet-async";
const AddVolunteer = () => {
  const { user, themeData, sweetAlert, url, refetchData } =
    useContext(AuthData);
  const [startDate, setStartDate] = useState(new Date());

  const handleAddPost = (e) => {
    const todayDate = new Date();
    e.preventDefault();
    const form = e.target;
    const data = {
      postDate: `${todayDate.getDate()}/${
        todayDate.getMonth() + 1
      }/${todayDate.getFullYear()}`,
      postTitle: form.title.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteers_needed.value),
      organizer_name: form.organizer_name.value,
      organizer_email: form.organizer_email.value,
      deadline: `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`,
    };

    axios
      .post(`${url}/all-volunteer-post`, data)
      .then((res) => {
        sweetAlert("Successfully Added", "success", false, false, 1500);
        refetchData.allPost();
        form.reset();
      })
      .catch((err) => {
        if (err.code == "ERR_NETWORK") {
          sweetAlert(
            false,
            "warning",
            "Network request failed! Please check network and try again!",
            true,
            false
          );
        } else {
          sweetAlert("Oops!", "warning", "Something went wrong", true, false);
        }
      });
  };

  return (
    <div className="max-w-[1450px] min-h-[calc(100vh-113px)] flex items-center mt-10 px-3 mx-auto">
      <Helmet>
        <title>VV | Add Your Post</title>
      </Helmet>
      <div
        className={`lg:max-w-[70%] w-full md:w-[80%] mx-auto  ${
          themeData ? "dark:bg-gray-800" : "bg-gray-100"
        }  p-3 lg:p-6 rounded-[20px]`}
      >
        <h3 className="text-center md:text-2xl text-xl lg:text-3xl font-bold">
          Add Your Volunteer Post
        </h3>

        <form
          onSubmit={handleAddPost}
          className="grid grid-cols-1 lg:px-10 mt-8 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="font-bold">Title</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Tittle"
              name="title"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Thumbnail</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Thumbnail"
              name="thumbnail"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <label className="font-bold">Description</label>
            <textarea
              type="text"
              className={`w-full h-[150px] ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] p-4`}
              placeholder="Description"
              name="description"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Category</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Category"
              name="category"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Location</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Location"
              name="location"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">volunteers needed</label>
            <input
              type="number"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="volunteers needed"
              name="volunteers_needed"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label className="font-bold">Deadline</label>
            <DatePicker
              className={`w-full border border-gray-200 !h-12 rounded-[10px] ${
                themeData ? "bg-gray-800" : "bg-white"
              } text-center`}
              showIcon
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              showTimeSelect={false}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Organizer name</label>
            <input
              type="text"
              disabled
              value={user?.displayName}
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Organizer name"
              name="organizer_name"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Organizer email</label>
            <input
              type="text"
              value={user?.email}
              disabled
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Organizer name"
              name="organizer_email"
            />
          </div>

          <input
            type="submit"
            className="w-full btn btn-sm lg:col-span-2 h-12 rounded-[10px] text-white font-bold bg-cRed"
            name=""
            id="Add"
          />
        </form>
      </div>
    </div>
  );
};

export default AddVolunteer;
