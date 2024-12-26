"use client";

import Loading from "@/app/components/Loading/Loading";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/about");
        const result = await response.json();

        // Get the last item based on the order of the returned data
        if (result.length > 0) {
          setData(result[result.length - 1]); // Get the last item
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-14">
      {data && (
        <>
        {!loading && (
        <h1 className="text-3xl font-semibold mb-6 font-montserrat text-center sm:text-left">
          О нас
        </h1>
      )}
          <div className="border border-gray-200 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{data.name}</h2>
            <p className="text-gray-700 text-base mb-6">{data.description}</p>
            {data.images && data.images.length > 0 && (
              <div className="flex justify-center">
                <img
                  src={`http://localhost:5000/${data.images[0]}`}
                  alt={data.name}
                  className="w-full max-w-md object-contain rounded-md shadow"
                />
              </div>
            )}
          </div>
        </>
      )}
      {/* Title displayed only after loading completes */}
      
    </div>
  );
};

export default Page;
