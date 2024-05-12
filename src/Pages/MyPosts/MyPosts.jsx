import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../Context/AuthProvider";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import { IoCloseCircleSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { url, user, themeData, sweetAlert } = useContext(AuthData);
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState({});
  const [deadline, setDeadline] = useState(false);

  const [startDate, setStartDate] = useState(); // 15/07/2024
  useEffect(() => {
    const parseDateString = (dateString) => {
      if (dateString) {
        const [day, month, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`);
      }
    };
    setStartDate(parseDateString(oldData?.deadline));
  }, [deadline]);

  useEffect(() => {
    axios.get(`${url}/all-volunteer-post?email=${user.email}`).then((res) => {
      setData(res.data);
    });
  }, [user, url]);

  const handleModal = (post) => {
    document.getElementById("my_modal_3").showModal();
    setDeadline(!deadline);
    setOldData(post);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      postTitle: form.title.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: form.volunteers_needed.value,
      organizer_name: form.organizer_name.value,
      organizer_email: form.organizer_email.value,
      deadline: `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`,
    };
    axios
      .patch(`${url}/all-volunteer-post/${oldData?._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast("Successfully updated");
          form.reset();
        } else if (res.data.modifiedCount == 0) {
          toast("No Changes Made", {
            sticky: true, // Make the Toast sticky
          });
        } else {
          toast("Oops! Something went wrong!");
        }
      })
      .catch((err) => {
        if (err.code == "ERR_NETWORK") {
          toast("Network request failed! Please check network and try again!");
        } else {
          toast("Oops! Something went wrong!");
        }
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/all-volunteer-post/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data1) => {
            console.log(data1);
            if (data1.deletedCount > 0) {
              setData(data.filter((item) => item._id !== id));
              console.log(data);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="relative">
      <div className="max-w-[1250px]  pt-8 mx-auto">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8">
          My Added Volunteer Need Posts
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody className="flex flex-col gap-3 *:!rounded-[10px]">
              {data?.map((post) => (
                <tr
                  className="font-bold border border-gray-300 flex items-center justify-between text-lg"
                  key={post._id}
                >
                  <td>
                    <img
                      src={post.thumbnail}
                      className="min-w-[200px] max-w-[200px] h-[130px] rounded-[10px] bg-gray-200"
                      alt=""
                    />
                  </td>
                  <td>{post.postTitle}</td>
                  <td>{post.deadline}</td>
                  <td className="flex justify-center">
                    <div className="w-full h-full flex flex-col justify-between gap-2">
                      <button
                        onClick={() => handleModal(post)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Edit"
                        data-tooltip-place="top"
                        className="btn bg-transparent hover:text-cRed text-2xl hover:bg-transparent border-none shadow-none"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Delete"
                        data-tooltip-place="bottom"
                        className="btn bg-transparent hover:text-cRed text-3xl hover:bg-transparent border-none shadow-none"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Tooltip id="my-tooltip" />
      </div>
      <dialog
        id="my_modal_3"
        className="modal min-h-screen backdrop-blur-[8px] !overflow-y-auto"
      >
        <div className="max-w-[1450px] mx-auto py-6 lg:py-10">
          <div
            className={`mx-auto  ${
              themeData ? "dark:bg-gray-800" : "bg-gray-100"
            } min-h-[calc(100vh-113px)] w-full relative p-3 lg:p-6 rounded-[20px]`}
          >
            <h3 className="text-center md:text-2xl text-xl lg:text-3xl font-bold">
              Add Your Volunteer Post
            </h3>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn text-3xl text-cRed btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <IoCloseCircleSharp />
              </button>
            </form>
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 lg:px-10  mt-8 lg:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="font-bold">Title</label>
                <input
                  type="text"
                  className={`w-full h-12 ${
                    themeData ? "bg-gray-800" : "bg-white"
                  } border border-gray-200 rounded-[10px] px-4`}
                  defaultValue={oldData?.postTitle}
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
                  defaultValue={oldData?.thumbnail}
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
                  defaultValue={oldData?.description}
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
                  defaultValue={oldData?.category}
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
                  defaultValue={oldData?.location}
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
                  defaultValue={oldData?.volunteersNeeded}
                  name="volunteers_needed"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label className="font-bold">Deadline</label>
                <DatePicker
                  className={`w-full border border-gray-200 !h-12 rounded-[10px] ${
                    themeData ? "bg-gray-800" : "bg-white"
                  } pl-4`}
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
            <Toaster position="bottom-center" reverseOrder={false} />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyPosts;
