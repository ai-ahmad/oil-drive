'use client';

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/about');
        const result = await response.json();
        
        // Get the last item based on the order of the returned data
        if (result.length > 0) {
          setData(result[result.length - 1]); // Get the last item
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        {data ? (
          <div key={data._id} className="border p-4 rounded-md shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
            <p className="mb-4">{data.description}</p>
            {data.images && data.images.length > 0 && (
              <div className="flex justify-center">
                <img
                  src={`http://localhost:5000/${data.images[0]}`} 
                  alt={data.name}
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Page;
