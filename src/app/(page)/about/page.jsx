"use client";

import Loading from "@/app/components/Loading/Loading";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState([]); // Инициализируем data как массив
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://oildrive-wtc-backend-1.onrender.com/api/v1/about");
        const result = await response.json();

        if (result.length > 0) {
          setData(result); // Сохраняем массив данных
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-14">
      <h1 className="text-3xl font-semibold mb-6 font-montserrat text-center sm:text-left">
        О нас
      </h1>
      <div className="space-y-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 bg-white rounded-lg p-6 shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{item.name}</h2>
            <p className="text-gray-700 text-base mb-6">{item.description}</p>
            {item.images && item.images.length > 0 && (
              <div className="flex justify-center">
                <img
                  src={`https://oildrive-wtc-backend-1.onrender.com/${item.images[0]}`}
                  alt={item.name}
                  className="w-full max-w-md object-contain rounded-md shadow"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
