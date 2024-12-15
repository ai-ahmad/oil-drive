"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NewsSkeleton from "./NewsSkeleton";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsData = async () => {
    try {
      const response = await fetch('https://admin-dash-oil-trade.onrender.com/api/v1/news/');
      console.log("Статус ответа:", response.status);

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных: " + response.statusText);
      }

      const data = await response.json();
      console.log("Данные из API:", data); // Добавим лог для проверки

      const formattedNews = data.map((item) => {
        // Проверим, что у item есть поле images и что это массив
        const image = item.images && Array.isArray(item.images) && item.images.length > 0
          ? `https://admin-dash-oil-trade.onrender.com${item.images[0]}` // Используем первое изображение
          : '/path/to/default-image.jpg'; // Если изображений нет, используем заглушку

        return {
          id: item._id,
          title: item.title || "Без названия",
          description: item.description1 || "Описание отсутствует",
          date: item.date || "Дата не указана",
          image, // Добавляем путь к изображению
        };
      });

      setNewsData(formattedNews);
      console.log("Форматированные данные новостей:", formattedNews); // Лог для проверки отформатированных данных
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
    return (
      <div className="container mx-auto py-4 w-full">
        <div className="border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6 rounded-lg">
          <h2 className="text-black text-2xl font-montserrat mb-4">Новости:</h2>
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
        <h2 className="text-black text-2xl font-montserrat mb-4">Новости:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newsData.map((news) => (
            <a
              href={`/news/${news.id}`}
              key={news.id}
              className="border border-gray-300 bg-white shadow-lg transition-transform duration-200 flex flex-col p-4 mb-4 hover:scale-105 hover:shadow-2xl rounded-md"
            >
              <Image
                src={news.image} // Загружаем изображение или заглушку
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
