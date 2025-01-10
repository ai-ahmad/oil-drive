import React from "react"; 
 
const StatyaSkeleton = () => { 
  return ( 
    <div className="border border-gray-300 bg-white shadow-lg transition-transform duration-200 h-80 w-full flex flex-col p-4 mb-4 rounded-md"> 
      <div className="w-full h-72 bg-gray-200 skeleton rounded-md mb-6"></div> 
      <div className=" h-8 w-full bg-gray-200 skeleton rounded mt-auto"></div> 
    </div> 
  ); 
}; 
 
export default StatyaSkeleton;