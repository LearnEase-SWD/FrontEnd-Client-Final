import React from "react";
import Navbar from "../Navbar";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 z-50 bg-white w-full">
      <div className="h-[8vh]">
        <Navbar />
      </div>
      <div className="flex h-[92vh]">
        <div className="w-1/3 lg:flex hidden h-[88vh] animate-pulse p-4 flex-col gap-3">
          <div className="h-8 bg-gradient rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-2/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/5 mx-4"></div>
          <div className="h-8 bg-gradient rounded w-4/5 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w1/2 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-2/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/5 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-4/5 mx-4"></div>
          <div className="h-8 bg-gradient rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-2/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/5 mx-4"></div>
        </div>
        <div className="lg:w-2/3 w-full h-[88vh] flex flex-col animate-pulse p-4 gap-2">
          <div className="w-full h-[50vh] bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/5"></div>
          <div className="h-8 bg-orange-500 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
