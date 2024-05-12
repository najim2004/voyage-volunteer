import { useContext, useEffect, useState } from "react";
import { AuthData } from "../../Context/AuthProvider";
import axios from "axios";

const RequestedPost = () => {
  const { url, user } = useContext(AuthData);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${url}/requests?email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [url,user]);

  const handleCancel = (id) =>{
    
  }
  return (
    <div className="relative">
      <div className="max-w-[1250px]  pt-8 mx-auto">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8">
          My Volunteer Requested Posts
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody className="flex flex-col gap-3 *:!rounded-[10px]">
              {data?.map((post) => (
                <tr className="font-bold flex justify-between items-center text-lg border  border-gray-300 " key={post._id}>
                  <td>
                    <img
                      src={post.thumbnail}
                      className="min-w-[200px] max-w-[200px] h-[130px] rounded-[10px] bg-gray-200"
                      alt=""
                    />
                  </td>
                  <td>{post.postTitle}</td>
                  <td className="text-nowrap">{post.deadline}</td>
                  <td>
                    <div className=" bg-green-500 w-[90px] flex justify-center items-center text-white rounded-md !text-center !font-semibold h-10">
                      {post.status}
                    </div>
                  </td>
                  <td>
                    <button className="btn bg-cRed text-white btn-sm h-10">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedPost;
