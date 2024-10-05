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

  return (
    <>
      <Navigation />
      <div className="flex">
        <Sidebar />
        <div className="flex justify-start w-full bg-gray-100 min-h-screen">
          <div className="bg-white shadow-md p-6 max-w-7xl w-full mx-4 my-8 flex flex-col items-start relative">
            {/* Название продукта */}
            <h1 className="text-4xl font-semibold mb-4 text-left ml-10">
              {product.name}
            </h1>

            {/* Контейнер для изображения и карточки информации */}
            <div className="flex w-full">
              {/* Изображение товара */}
              <div className="relative flex items-start">
                <div className="relative">
                  <Image
                    ref={imageRef} // Ссылка на изображение
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    layout="intrinsic"
                    objectFit="cover"
                    width={400}
                    height={350}
                    className="max-w-full max-h-full cursor-pointer transition-all duration-300"
                    onClick={handleImageClick} // Добавляем обработчик клика
                  />
                </div>
              </div>

              {/* Карточка с информацией о товаре */}
              <div className="w-[430px] h-[100px] bg-white border border-gray-300 rounded-lg shadow-sm p-4 ml-4 overflow-hidden">
                <div className="flex items-center mb-2 ml-10">
                  <p className="text-2xl font-bold text-red-500 line-through mr-2">{product.price} сум</p>
                  <p className="text-2xl font-bold text-green-500 ml-10">{product.discount_price} сум</p>
                </div>
                <div className="flex items-center mb-4 ml-10">
                  <div className="flex items-center mr-4 w-[50px] h-[50px]">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-lg ml-20 font-semibold">На складе: {product.stock}</span>
                </div>
              </div>
            </div>

            {/* Информация о объёме товара, расположенная ниже карточки */}
            <div className="text-left w-full mt-4">
              <p className="text-lg text-gray-700 mb-4">Объём: {product.volume}</p>
              <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
