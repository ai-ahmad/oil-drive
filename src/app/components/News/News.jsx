import React, { useEffect, useState } from "react";
import Image from "next/image";
import NewsSkeleton from "./NewsSkeleton";
import { FaArrowRight } from "react-icons/fa6";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const staticNewsData = [
    {
      id: "1",
      title: "Моторные масла",
      description: "Описание моторных масел и их характеристик.",
      date: "01/01/2024",
      image:
        "https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainCatalog%2Foil1v2.png&w=384&q=75",
    },
    {
      id: "2",
      title: "Трансмиссионные масла",
      description: "Информация о трансмиссионных маслах.",
      date: "02/01/2024",
      image:
        "https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainCatalog%2Foil2v2.png&w=384&q=75",
    },
    {
      id: "3",
      title: "Охлаждающие жидкости",
      description: "Описание охлаждающих жидкостей и их преимущества.",
      date: "03/01/2024",
      image:
        "https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainCatalog%2Foil3v2.png&w=384&q=75",
    },
    {
      id: "4",
      title: "Тормозные жидкости",
      description: "Особенности тормозных жидкостей.",
      date: "04/01/2024",
      image:
        "https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainCatalog%2Foil4v2.png&w=384&q=75",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setNewsData(staticNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-4 w-full ">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
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
      <div className="py-8">
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex"
            >
              <div className="flex-1 p-6 text-left flex flex-col justify-center">
                <h1 className="text-xl md:text-xl lg:text-3xl font-semibold md:font-bold text-gray-800 mb-4">
                  {news.title}
                </h1>
                <div className="text-gray-400 text-sm flex items-center gap-4 mt-auto">
                  <span className="text-lg font-medium"></span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                    <FaArrowRight className="text-gray-800 text-lg md:text-2xl" />
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center size-32 md:size-36 lg:size-56  my-auto">
                <Image
                  src={news.image}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-r-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
