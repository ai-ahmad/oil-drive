import React, { useState, useEffect } from "react";
import Link from "next/link"; // Импортируем Link из next/link

const Statya = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://admin-dash-oil-trade.onrender.com/api/v1/news/"
        );
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl text-gray-600">Загрузка...</span>
      </div>
    );
  }

  return (
    <div className="p-5 container">
      <h1 className="text-6xl font-bold text-center mb-10">Статьи и новости</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link href={`/news/${item._id}`} key={item._id}> {/* Используем Link для перехода по ID */}
            <div
              className="bg-white shadow-lg rounded-xl overflow-hidden group relative transition-transform transform hover:scale-105 cursor-pointer"
            >
              {/* Изображение как фон для всего div с легким затемнением по умолчанию */}
              {item.images && item.images.length > 0 ? (
                <div
                  className="relative w-full h-80 bg-cover bg-center group-hover:brightness-100 brightness-50 transition-all duration-300"
                  style={{
                    backgroundImage: `url(https://admin-dash-oil-trade.onrender.com${item.images[0]})`,
                  }}
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 flex justify-center items-center">
                  <span className="text-gray-500">Нет изображения</span>
                </div>
              )}

              {/* Содержимое, которое поднимется вверх при ховере */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end items-center group-hover:justify-start transition-all duration-300 ease-in-out">
                <p className="text-white font-semibold mt-2">{item.description1 || "Описание отсутствует"}</p>
              </div>

              {/* Кнопка "Читать дальше", появляется только при ховере */}
              <div className="absolute bottom-0 p-4 w-full bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center">
                <span className="text-white font-semibold">Читать дальше</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Statya;
