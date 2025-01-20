"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/components/Loading/Loading";

const NewsItem = ({ params }) => {
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  // Unwrap the params object using React.use
  useEffect(() => {
    const unwrapParams = async () => {
      const result = await params; // Unwrapping the Promise
      setUnwrappedParams(result);
    };

    unwrapParams();
  }, [params]);

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsItem = async (id) => {
    if (!id) return;

    try {
      const response = await fetch(`${'https://admin-dash-oil-trade.onrender.com/api/v1/news'}/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError("News item not found.");
        } else {
          throw new Error("Error loading data: " + response.statusText);
        }
      }
      const data = await response.json();
      setNewsItem(data);
    } catch (error) {
      console.error("Error fetching news item:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unwrappedParams) {
      fetchNewsItem(unwrappedParams.id);
    }
  }, [unwrappedParams]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">Ошибка: {error}</div>;
  }

  if (!newsItem) {
    return <div className="text-center mt-5">Новость отсутствует</div>;
  }

  return (
    <div className=" mx-auto w-full my-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto">
        {/* Заголовок новости */}
        <div className="bg-gradient-to-r text-black py-4 px-6">
          <h1 className="text-4xl font-semibold">{newsItem.title}</h1>
        </div>

        {/* Описание новости 1 */}
        <div className="px-6 py-4">
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">{newsItem.description1}</p>
        </div>

        {/* Изображение новости */}
        <div className="px-6 py-4">
          <Image
            src={`https://admin-dash-oil-trade.onrender.com${newsItem.images[0]}`}
            alt={newsItem.title}
            width={800}
            height={450}
            className="object-cover rounded-xl mx-auto shadow-xl"
          />
        </div>

        {/* Описание новости 2 */}
        <div className="px-6 py-4">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{newsItem.description2}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
