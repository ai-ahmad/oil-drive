"use client";

import Loading from '@/app/components/Loading/Loading';
import axios from 'axios';
import Image from 'next/image';

import { useEffect, useState } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API

  useEffect(() => {
    const getNews = async () => {
      try {
        // Fetch news from the API
        const response = await axios.get(`${apiUrl}/news`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false)
      }
    };

    getNews();
  }, []);
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-3xl mx-auto p-6 ">
          <h1 className="text-3xl  mb-6 font-montserrat">Новости:</h1>

          <div className="space-y-8">
            {news.map((item) => (
              <article key={item._id} className="border-b pb-8">
                <Image
                  src={item.images && item.images.length > 0 ? `${item.images[0]}` : '/default.jpg'}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-auto mb-4"
                  priority={true}
                />
                <time className="text-sm text-gray-500">{item.date}</time>
                <h2 className="text-xl font-semibold mt-2 mb-2">
                  <a href={`/news/${item._id}`} className="text-red-600 hover:underline">
                    {item.title}
                  </a>
                </h2>
                <p className="text-gray-700">{item.description1}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
