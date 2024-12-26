"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/components/Loading/Loading";

const NewsItem = ({ params }) => {
  const { id } = params;
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  const fetchNewsItem = async () => {
    if (!id) return;

    try {
      const response = await fetch(`${'https://admin-dash-oil-trade.onrender.com/api/v1/news'}/${id}`); // Запрос конкретной новости по id
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
    fetchNewsItem();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Ошибка: {error}</div>;
  }

  if (!newsItem) {
    return <div className="text-center">Новость отсутствует</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-14">
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{newsItem.title}</h1>
        <Image
          src={`${imgUrl}/${newsItem.images[0]}`}
          alt={newsItem.title}
          width={700}
          height={400}
          className="object-cover rounded-md mb-4 w-full"
        />
        <p className="text-lg text-gray-700 mb-4">{newsItem.description1}</p>
        <p className="text-lg text-gray-700">{newsItem.description2}</p>
      </div>
    </div>
  );
};

export default NewsItem;
