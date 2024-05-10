import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthData } from "../../Context/AuthProvider";
const AddVolunteer = () => {
  const { user, themeData } = useContext(AuthData);
  const [startDate, setStartDate] = useState(new Date());
  const handleDate = (date) => {
    setStartDate(date);
    console.log(date.getDate(), date.getMonth() + 1, date.getFullYear());
  };
  return (
    <div className="max-w-[1450px] mt-10 px-3 mx-auto">
      <div
        className={`lg:max-w-[70%] mx-auto  ${
          themeData ? "dark:bg-gray-800" : "bg-gray-100"
        } min-h-[calc(100vh-113px)] p-3 lg:p-6 rounded-[20px]`}
      >
        <h3 className="text-center md:text-2xl text-xl lg:text-3xl font-bold">
          Add Your Volunteer Post
        </h3>

        <form className="grid grid-cols-1 lg:px-10 mt-8 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold">Title</label>
            <input
              type="text"
              className={`w-full h-12 ${
                themeData ? "bg-gray-800" : "bg-white"
              } border border-gray-200 rounded-[10px] px-4`}
              placeholder="Tittle"
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
              onChange={handleDate}
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
            />
          </div>

          <input
            type="submit"
            className="w-full lg:col-span-2 h-12 rounded-[10px] text-white font-bold bg-cRed"
            name=""
            id="Add"
          />
        </form>
      </div>
    </div>
  );
};

export default AddVolunteer;
