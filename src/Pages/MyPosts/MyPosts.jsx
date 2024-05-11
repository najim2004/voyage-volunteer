import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../Context/AuthProvider";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { IoCloseCircleSharp } from "react-icons/io5";

const MyPosts = () => {
  const { url, user } = useContext(AuthData);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    axios.get(`${url}/all-volunteer-post?email=${user.email}`).then((res) => {
      setData(res.data);
    });
  }, [user]);
  return (
    <div className="relative">
      <div className="max-w-[1250px]  pt-8 mx-auto">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody>
              {data?.map((post) => (
                <tr className="font-bold text-lg" key={post._id}>
                  <th>
                    <img
                      src={post.thumbnail}
                      className="w-[200px] h-[130px] rounded-[10px] bg-gray-200"
                      alt=""
                    />
                  </th>
                  <td>{post.postTitle}</td>
                  <td>{post.deadline}</td>
                  <td>
                    <div className="w-full h-full flex flex-col justify-between gap-2">
                      <button
                        onClick={handleModal}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Edit"
                        data-tooltip-place="top"
                        className="btn bg-transparent hover:text-cRed text-2xl hover:bg-transparent border-none shadow-none"
                      >
                        <FaRegEdit />
                      </button>
                      <button
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
      <div
        className={`${
          show ? "flex" : "hidden"
        } absolute -mt-[72px] min-h-screen w-full backdrop-blur-[8px] z-50 top-0 left-0 bg-black  bg-opacity-50`}
      >
        <div className="inset-0 h-full relative w-full">
          <IoCloseCircleSharp
            className="text-5xl absolute text-cRed right-5 top-5"
            onClick={() => setShow(!show)}
          />
          
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
