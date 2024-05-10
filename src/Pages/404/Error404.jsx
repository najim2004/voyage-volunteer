import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFound from "/public/notfound.json";
const Error404 = () => {
  return (
    <div>
      <div className="flex flex-col h-screen overflow-hidden items-center justify-center">
        <Lottie className="max-w-[300px]" animationData={notFound} />;
        <p className="lg:text-[50px] text-3xl font-semibold  text-center">
          The Page You're Looking For Can't Found
        </p>
        <Link to={"/"}>
          <button className="btn rounded-sm bg-cRed text-white font-semibold px-10 mt-6">
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
