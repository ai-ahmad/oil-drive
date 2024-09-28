"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CiStar, CiShoppingTag } from "react-icons/ci";
import { FaCheck, FaInfoCircle, FaTint } from "react-icons/fa";

const HomeContent = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const request = await axios.get("http://localhost:5000/api/v1/card");
        if (request.status === 200) {
          setProducts(request.data);
        } else {
          console.error("Error fetching products", request.statusText);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[400px]"
            onClick={() => handleCardClick(product)} // Обработчик клика
          >
            <div className="flex justify-center h-[200px] sm:h-[250px]">
              <Image
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">{product.description}</p>
              <div className="flex items-center py-2 mt-2">
                <CiShoppingTag className="text-gray-600 mr-1" />
                <p className="text-sm sm:text-base">{product.category}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-lg sm:text-xl md:text-2xl">{product.price ? `${product.price} сум` : "- сум."}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm sm:text-base flex items-center">
                  <FaTint className="mr-1" /> {product.volume[0]} л
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
                  <FaInfoCircle className="mr-2" /> Подробнее
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-[800px] w-full mx-auto shadow-lg relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <div className="text-sm text-green-600 flex items-center">
            
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-4">
              <Image
                src={`http://localhost:5000/${selectedProduct.image}`}
                alt={selectedProduct.name}
                width={300}
                height={300}
                className="object-contain my-4 mx-auto md:mx-0"
              />
              <div className="ml-0 md:ml-6">
                <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
                <p className="font-bold text-lg mb-2">
                  Артикул: <span className="font-normal">{selectedProduct.article}</span>
                </p>
                <p className="font-bold text-lg mb-2">
                  Объем: <span className="font-normal">{selectedProduct.volume[0]} л</span>
                </p>
                <p className="font-bold text-lg mb-2">
                  Бренд: <span className="font-normal">{selectedProduct.brand}</span>
                </p>
                <p className="font-bold text-lg mb-2">
                  Страна производителя: <span className="font-normal">{selectedProduct.country}</span>
                </p>
                <p className="font-bold text-2xl text-red-500">
                  {selectedProduct.price ? `${selectedProduct.price} сум` : "- сум."}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleCloseModal}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
