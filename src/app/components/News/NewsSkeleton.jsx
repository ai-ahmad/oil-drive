import React from "react";

const NewsSkeleton = () => {
  return (
    <div className="flex gap-6 bg-white ">
      <div className="skeleton h-44 md:h-44 lg:h-56 w-full bg-gray-100 mb-4"></div>
    </div>
  );
};

export default NewsSkeleton;
