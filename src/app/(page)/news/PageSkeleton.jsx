"use client";
import React from "react";

const PageSkeleton = () => {
  return (
    <div className="transition-transform duration-200 flex flex-col">
      <div className="w-full h-44 bg-gray-200 skeleton rounded-md mb-2"></div>
      <div className="p-2 text-center">
        <div className="h-6 w-full bg-gray-200 skeleton rounded mb-1 mx-auto"></div>
        <div className="h-4 w-full bg-gray-200 skeleton rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default PageSkeleton;
