import React from "react";

const OilCategorySkeleton = () => {
  return (
    <div className="flex gap-4 container justify-between flex-col md:flex-row text-md pt-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="px-6 py-6 rounded-md shadow-md animate-pulse justify-start flex gap-4"
        >
          <div className="h-4 w-4 skeleton bg-gray-300 rounded"></div>
          <div className="h-4 w-36 lg:w-32 skeleton bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default OilCategorySkeleton;
