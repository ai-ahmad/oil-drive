"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/news/create');
      console.log("Статус ответа:", response.status);
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных: ' + response.statusText);
      }
      const data = await response.json();
      const formattedNews = data.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description1,
        date: item.date,
        image: item.images[0],
      }));

      setNewsData(formattedNews);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Ошибка: {error}</div>;
  }

  if (!newsData.length) {
    return <div className="text-center">Нет доступных новостей.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6">
        <h2 className="text-black text-2xl font-semibold mb-4">Новости:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newsData.map((news) => (
            <a
              href={`/news/${news.id}`}
              key={news.id}
              className="border border-gray-300 bg-white shadow-lg transition-transform duration-200 flex flex-col p-4 mb-4 hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={`http://localhost:5000${news.image}`}
                alt={news.title}
                width={190}
                height={70} 
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
