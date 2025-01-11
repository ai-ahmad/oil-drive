  import React from "react";

  const NewsSkeleton = () => {
    return (
      <div className="flex  gap-6 bg-white p-4 relative left-8">
        <div className="flex-1 min-w-[200%]">
          <div className="skeleton h-44 w-full md:min-w-[45%] bg-gray-100 mb-4"></div>
          <div className="skeleton h-44 w-full bg-gray-100"></div>
        </div>
        <div className="flex-1 min-w-[200%]">
          <div className="skeleton h-44 w-full bg-gray-100 mb-4"></div>
          <div className="skeleton h-44 w-full bg-gray-100"></div>
        </div>
      </div>
    );
  };

  export default NewsSkeleton;
