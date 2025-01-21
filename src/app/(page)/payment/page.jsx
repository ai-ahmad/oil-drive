'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/app/components/Loading/Loading';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }
    return this.props.children;
  }
}

const Payment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin-dash-oil-trade.onrender.com/api/v1/zakaz');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        console.log('API Response:', result);

        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]); // Работаем с первым элементом массива
        } else {
          console.error('No sufficient data in response:', result);
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8">
        {!loading && (
          <h1 className="text-3xl font-semibold mb-6 text-center sm:text-left">
            Оплата
          </h1>
        )}
        {data && (
          <div className="border border-gray-200 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{data.name}</h2>
            <p className="text-gray-700 text-base mb-6">{data.description}</p>
            {data.images && data.images.length > 0 && (
              <div className="flex justify-center">
                <Image
                  src={`https://admin-dash-oil-trade.onrender.com/${data.images[0]}`}
                  alt={data.name}
                  width={400}
                  height={300}
                  className="w-full mmax-w-d object-contain rounded-md shadow"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Payment;
