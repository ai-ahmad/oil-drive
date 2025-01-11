import React from "react"; 
 
const StatyaSkeleton = () => { 
  return ( 
    <div className="border border-gray-300 bg-white shadow-lg transition-transform duration-200 h-80 w-full flex flex-col  mb-4 rounded-xl"> 
      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-200 skeleton rounded-t-xl rounded-b-none mb-4"></div> 
      <div className="h-16 sm:h-12 md:h-18 lg:h-20 w-full bg-gray-200 skeleton rounded-b-xl rounded-t-none mt-auto"></div> 
    </div> 
  ); 
}; 
 
export default StatyaSkeleton;