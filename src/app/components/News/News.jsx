"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NewsSkeleton from "./NewsSkeleton";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static news data instead of fetching from an API
  const staticNewsData = [
    {
      id: "1",
      title: "Новость 1",
      description: "Описание новости 1",
      date: "01/01/2024",
      image: "https://oiltrade.uz/uploads/posts/2020-03/thumbs/1583766028_delkor.png",
    },
    {
      id: "2",
      title: "Новость 2",
      description: "Описание новости 2",
      date: "02/01/2024",
      image: "https://oiltrade.uz/uploads/posts/2020-03/thumbs/1583766028_delkor.png"
    },
    {
      id: "3",
      title: "Новость 3",
      description: "Описание новости 3",
      date: "03/01/2024",
      image: "https://oiltrade.uz/uploads/posts/2020-03/thumbs/1583766028_delkor.png",
    },
    {
      id: "4",
      title: "Новость 4",
      description: "Описание новости 4",
      date: "04/01/2024",
      image: "https://oiltrade.uz/uploads/posts/2020-03/thumbs/1583766028_delkor.png",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setNewsData(staticNewsData); // Set static data after a delay
      setLoading(false);
    }, 1000); // Simulate delay for loading
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-4 w-full">
        <div className="border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6 rounded-lg">
          <h2 className="text-black text-2xl mb-4">Новости:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <NewsSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Ошибка: {error}</div>;
  }

  if (!newsData.length) {
    return <div className="text-center">Нет доступных новостей.</div>;
  }

  return (
    <div className="container mx-auto py-4 w-full">
      <div className="border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6 rounded-lg">
        <h2 className="text-black text-2xl mb-4">Новости:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newsData.map((news) => (
            <a
              href={`/news/${news.id}`}
              key={news.id}
              className="border border-gray-300 bg-white shadow-lg transition-transform duration-200 flex flex-col p-4 mb-4 hover:scale-105 hover:shadow-2xl rounded-md"
            >
              <Image
                src={news.image}
                alt={news.title}
                width={190}
                height={120}
                className="w-full h-[120px] object-cover mb-2"
              />
              <div className="p-2 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{news.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
