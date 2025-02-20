'use client';

import Loading from "@/app/components/Loading/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import PageSkeleton from "./PageSkeleton";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  useEffect(() => {
    const getNews = async () => {
      try {
        console.log("Fetching news from:", apiUrl);  // Для отладки
        const response = await axios.get(`${apiUrl}/news`);
        console.log("Fetched news:", response.data);  // Для отладки
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mx-auto py-4 w-full">
        <div className=" bg-white shadow-lg w-full max-w-screen-xl p-6 rounded-lg">
          <h2 className="text-black text-2xl mb-4">Новости:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <PageSkeleton key={index} />
            ))}
          </div>
        </div>  
      </div>
    );
  }

  return (
    <div className=" mx-auto container py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center sm:text-left">
        Новости:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <Link href={`/news/${item._id}`} key={item._id}>
            <article
              className="border border-gray-200 rounded-lg p-4 shadow-md bg-white hover:shadow-lg  cursor-pointer"
            >
              <Image
                src={
                  item.images && item.images.length > 0
                    ? `${imgUrl}${item.images[0]}`
                    : "/default.jpg"
                }
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                priority={true}
              />
              <time className="text-sm text-gray-500 block mb-2">{item.date}</time>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                <span className="text-red-600 s hover:underline">{item.title}</span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">{item.description1}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
