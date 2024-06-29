import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 z-50 h-screen w-full flex justify-center items-center bg-white/50 backdrop-blur-[8px]">
      <span className="loading loading-dots loading-lg text-cRed"></span>
    </div>
  );
};

export default Loader;
