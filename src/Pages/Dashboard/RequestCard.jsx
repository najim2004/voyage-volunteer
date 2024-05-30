import PropTypes from "prop-types";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";
import { Link } from "react-router-dom";

const RequestCard = ({ post, handleSave }) => {
  const [isSelected, setSelected] = useState(post.status);
  return (
    <>
      <tr className="font-bold flex justify-between items-center text-lg border  border-gray-300 ">
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
          <div className="">
            <select
              onChange={(e) => setSelected(e.target.value)}
              value={isSelected}
              className="bg-green-500 min-w-[90px] flex justify-center items-center text-white rounded-md !text-center !font-semibold h-10 outline-none *:bg-gray-300 *:text-black"
              name="choose"
              id=""
            >
              <option>Requested</option>
              <option>Accepted</option>
            </select>
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
            onClick={() => handleSave(post._id, isSelected)}
            className="btn bg-red-500 text-white text-xl btn-sm h-10"
          >
            <FaSave />
          </button>
        </td>
      </tr>
    </>
  );
};

RequestCard.propTypes = {
  post: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default RequestCard;
