import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthData } from "../../Context/AuthProvider";
import axios from "axios";
import RequestForm from "./RequestForm/RequestForm";

const ViewDetails = () => {
  const { id } = useParams();
  const { url, themeData, sweetAlert } = useContext(AuthData);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${url}/all-volunteer-post/${id}`).then((res) => {
      setData(res.data);
    });
  }, [url, id]);

  const handleRequest = () => {
    if (data.volunteersNeeded !== 0) {
      document.getElementById("my_modal_3").showModal();
    } else {
      sweetAlert("Sorry", "warning", "No More Volunteers Need", true, 2000);
    }
  };
  return (
    <div className="relative overflow-x-hidden px-3">
      <div className="max-w-[1350px] items-center  min-h-[calc(100vh-112px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
        <div className="md:h-[300px] h-[200px] lg:h-[500px] bg-gray-200 rounded-[10px]">
          <img
            src={data?.thumbnail}
            className="h-full w-full rounded-[10px]"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <div className="flex-grow">
            <h3 className="text-xl font-bold lg:text-3xl">{data?.postTitle}</h3>
            <h3 className="mt-10 ">
              <span className="text-xl  font-semibold">Category:</span>{" "}
              {data?.category}
            </h3>
            <h3 className="mt-4 ">
              <span className="text-xl  font-semibold">Location:</span>{" "}
              {data?.location}{" "}
            </h3>
            <h3 className="mt-4 ">
              <span className="text-xl  font-semibold">Volunteer Need: </span>{" "}
              {data?.volunteersNeeded}
            </h3>
            <h3 className="mt-4 ">
              <span className="text-xl  font-semibold">Deadline: </span>{" "}
              {data?.deadline}
            </h3>
            <p className="mt-4 leading-[30px]  text-justify">
              <span className="text-xl  font-semibold">Description:</span>
              {data?.description}
            </p>
          </div>
          <button
            onClick={handleRequest}
            className="w-full mt-6 lg:mt-10 md:h-9 h-8 lg:h-12 btn btn-sm text-white text-xl bg-cRed font-semibold rounded-[5px]"
          >
            Be a Volunteer
          </button>
        </div>
      </div>

      <dialog
        id="my_modal_3"
        className="modal backdrop-blur-[8px] overflow-y-auto"
      >
        <div className="w-full">
          <RequestForm data={data} />
        </div>
      </dialog>
    </div>
  );
};

export default ViewDetails;
