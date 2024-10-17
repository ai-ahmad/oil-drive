'use client';  // This makes the component a Client Component

import React, { useState, useEffect } from "react";

const Page = () => {
  // State to hold the fetched data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/dastavka/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result); // Save the fetched data in the state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading when the request is done
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  // Handle the loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle the error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the fetched data
  return (
    <div>
      <h1>Dastavka Data</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.description}
              <br />
              <img
                src={`http://localhost:5000/${item.images[0]}`}
                alt={item.name}
                style={{ width: "200px", height: "auto" }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Page;
