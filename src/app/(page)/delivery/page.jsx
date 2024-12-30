'use client';

import Loading from "@/app/components/Loading/Loading";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://oildrive-wtc-backend-1.onrender.com/api/v1/dastavka/");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center text-red-600">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-14">
      <h1 className="text-3xl font-bold text-center sm:text-left mb-6">
        Доставка
      </h1>
      {data && data.length > 0 ? (
        <ul className="space-y-6">
          {data.map((item, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-lg p-6 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              {item.images && item.images.length > 0 && (
                <div className="flex justify-center sm:justify-start">
                  <img
                    src={`https://admin-dash-oil-trade.onrender.com/${item.images[0].replace(/\\/g, '/')}`}
                    alt={item.name}
                    className="w-full max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Нет данных для отображения</p>
      )}
    </div>
  );
};

export default Page;
