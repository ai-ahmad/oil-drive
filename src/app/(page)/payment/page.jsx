'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5009/api/v1/zakaz');
        const result = await response.json();
        
        // Get the second-to-last item (length - 2)
        if (result.length > 1) {
          setData(result[result.length - 2]);
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6">
        {data ? (
          <div key={data._id} className="border p-4 rounded-md shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
            <p className="mb-4">{data.description}</p>
            {data.images && data.images.length > 0 && (
              <div className="flex justify-center">
                <Image
                  src={`http://localhost:5009/${data.images[0]}`} 
                  alt={data.name}
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Payment;
