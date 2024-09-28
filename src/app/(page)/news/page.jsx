"use client"

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        // Fetch news from the API
        const response = await axios.get('http://localhost:5001/api/v1/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      
    };

    getNews();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Новости:</h1>

      <div className="space-y-8">
        {news.map((item) => (
          <article key={item._id} className="border-b pb-8">
            <Image
              src={item.images && item.images.length > 0 ? `http://localhost:5001${item.images[0]}` : '/default.jpg'}
              alt={item.title}
              width={400}
              height={200}
              className="w-full h-auto mb-4"
            />
            <time className="text-sm text-gray-500">{item.date}</time>
            <h2 className="text-xl font-semibold mt-2 mb-2">
              <a href={`/news/${item._id}`}>
                <a className="text-red-600 hover:underline">{item.title}</a>
              </a>
            </h2>
            <p className="text-gray-700">{item.description1}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
