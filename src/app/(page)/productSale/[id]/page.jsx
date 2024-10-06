"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaExpand, FaCompress } from 'react-icons/fa';
import Navigation from '@/app/components/Navigations/Header';
import Sidebar from '@/app/components/SideBar/Sidebar';

const ProductDetail = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false); // Состояние полноэкранного режима
  const imageRef = useRef(null); // Ссылка на изображение

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/card/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Товар не найден');
          } else {
            throw new Error('Ошибка загрузки данных: ' + response.statusText);
          }
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Ошибка загрузки товара:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Добавляем обработчик события для отслеживания полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Ошибка: {error}</div>;
  }

  if (!product) {
    return <div className="text-center">Товар не найден</div>;
  }

  // Функция для отображения звездочек
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Функция для обработки клика на изображение
  const handleImageClick = () => {
    if (imageRef.current) {
      if (!document.fullscreenElement) {
        imageRef.current.requestFullscreen().catch(err => {
          console.error(`Ошибка при попытке открыть полноэкранный режим: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Функция для выхода из полноэкранного режима
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <Navigation />
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
          <div className="bg-white shadow-md p-6 max-w-6xl mx-auto my-8 flex flex-col items-center relative">
            {/* Контейнер для изображения и карточки информации */}
            <div className="flex w-full space-x-6 items-start">
              {/* Изображение товара */}
              <div className="relative">
                
              <h1 className="text-5xl font-bold mb-4 ml-10" >{product.name}</h1>
                <Image
                  ref={imageRef} // Ссылка на изображение
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  layout="intrinsic"
                  objectFit="cover"
                  width={400} // Размер изображения
                  height={350} // Размер изображения
                  className="cursor-pointer transition-all duration-300"
                  onClick={handleImageClick} // Открытие на полный экран по клику
                />
                {!isFullscreen ? (
                  <button 
                    onClick={handleImageClick} 
                    className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-full focus:outline-none z-50">
                    <FaExpand />
                  </button>
                ) : (
                  <button 
                    onClick={exitFullscreen} 
                    className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-full focus:outline-none z-50">
                    <FaCompress />
                  </button>
                )}
              </div>

              {/* Карточка с информацией о товаре */}
              <div className="w-[400px] bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-red-500 line-through">{product.price} сум</p>
                  <p className="text-3xl font-bold text-green-500">{product.discount_price} сум</p>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-2xl mr-4">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-2xl font-semibold">На складе: {product.stock}</span>
                </div>
                <p className="text-2xl text-gray-700 mb-4">Объём: {product.volume}</p>
              </div>
            </div>

            {/* Описание продукта ниже под кнопкой */}
            <div className="w-full mt-6 text-left">
              <div className="mt-4">
                <p className="text-lg text-gray-700">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;