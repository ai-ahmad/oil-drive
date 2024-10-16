"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/app/components/Loading/Loading';

const NewsItem = ({ params }) => {
  const { id } = params;
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API
  const fetchNewsItem = async () => {
    if (!id) return;

    try {
      const response = await fetch(`${apiUrl}/news/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('News item not found.');
        } else {
          throw new Error('Error loading data: ' + response.statusText);
        }
      }
      const data = await response.json();
      setNewsItem(data);
    } catch (error) {
      console.error('Error fetching news item:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsItem();
  }, [id]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!newsItem) {
    return <div className="text-center">No available news item.</div>;
  }

  return (
    <>
      <div className="flex container">
        <div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
          <div className="bg-white shadow-md p-6 max-w-7xl w-full mx-4 my-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{newsItem.title}</h1>
            <Image
              src={`${imgUrl}/${newsItem.images[0]}`}
              alt={newsItem.title}
              width={700}
              height={100}
              className="object-cover mb-4"
            />
            <p className="text-lg text-gray-700 mb-4">{newsItem.description1}</p>
            <p className="text-lg text-gray-700 mb-4">{newsItem.description2}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem