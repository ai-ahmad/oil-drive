"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { CiShoppingTag } from "react-icons/ci";
import { FaDownload, FaStar } from "react-icons/fa";
import axios from "axios";
import { jsPDF } from "jspdf";
import Loading from "@/app/components/Loading/Loading";

const ProductItem = ({ params }) => {
  const { id } = React.use(params); // Unwrap the promise
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kurs, setKurs] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [animating, setAnimating] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const response = await axios.get(
        `https://admin-dash-oil-trade.onrender.com/api/v1/card/${id}`
      );

      if (response.status === 200) {
        setProduct(response.data);
        setActiveImage(response.data.image.all_images[0]);
      } else {
        setError("Product not found.");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchKurs = async () => {
    try {
      const response = await fetch(`${apiUrl}/curs`);

      if (!response.ok) {
        throw new Error("Failed to fetch kurs data.");
      }

      const data = await response.json();
      setKurs(data);
    } catch (error) {
      console.error("Error fetching kurs data:", error);
    }
  };

  useEffect(() => {
    if (!kurs) {
      fetchKurs();
    }
  }, [kurs]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleImageChange = (newImage) => {
    if (!animating && newImage !== activeImage) {
      setPrevImage(activeImage);
      setAnimating(true);
      setTimeout(() => {
        setActiveImage(newImage);
        setAnimating(false);
      }, 500);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Product Information", 10, 10);
    doc.text(`Name: ${product.name}`, 10, 20);
    doc.text(`Article: ${product.article}`, 10, 30);
    doc.text(`Volume: ${product.volume}`, 10, 40);
    doc.text(`Brand: ${product.brand}`, 10, 50);
    doc.text(`Country: ${product.country}`, 10, 60);
    doc.text(`Price: ${(product.price * kurs).toFixed(2)} сум`, 10, 70);
    doc.text("Description:", 10, 80);
    doc.text(`${product.description}`, 10, 90, { maxWidth: 180 });

    doc.save(`${product.name}.pdf`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product available.</div>;
  }
  
  return (
    <div className="flex flex-col lg:flex-row mt-4 container space-x-6">
      <div className="lg:w-full bg-white p-12 rounded-lg shadow-lg flex flex-col space-y-6">
        <div className="flex lg:flex-row flex-col w-full">

          <div className="flex flex-col items-start space-y-6 lg:w-1/4 lg:ml-12">
            {product.image && product.image.all_images.length > 0 &&
              product.image.all_images.map((img, index) => (
                <Image
                  key={index}
                  src={`https://admin-dash-oil-trade.onrender.com/${img}`}
                  alt={`${product.name} image ${index + 1}`}
                  width={180}  // Увеличиваем размер изображения
                  height={180}
                  className={`object-cover cursor-pointer rounded-lg border-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform ${
                    activeImage === img ? 'border-red-500 scale-105' : 'border-gray-300 hover:scale-110'
                  }`}
                  onClick={() => handleImageChange(img)}
                />
              ))}
          </div>

          <div className="relative h-[450px] w-[400px] overflow-hidden ml-8"> {/* Увеличиваем размеры области для изображения */}
            {prevImage && (
              <Image
                src={`https://admin-dash-oil-trade.onrender.com/${prevImage}`}
                alt="Previous image"
                width={400}  // Увеличиваем размер изображения
                height={450}
                className={`absolute top-0 left-0 object-cover rounded-lg shadow-md transition-transform duration-500 ease-in-out opacity-0 ${
                  animating ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
            )}

            {activeImage && (
              <Image
                src={`https://admin-dash-oil-trade.onrender.com/${activeImage}`}
                alt="Active image"
                width={400}  // Увеличиваем размер изображения
                height={450}
                className={`absolute top-0 left-0 object-cover rounded-lg shadow-md transition-transform duration-500 ease-in-out opacity-100 ${
                  animating ? '-translate-x-full' : 'translate-x-0'
                }`}
              />
            )}
          </div>

          <div className="flex flex-col space-y-4 lg:ml-16 w-full lg:w-1/2"> {/* Сдвигаем текст вправо, увеличив отступ */}
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

            <div className="flex items-center">
              <p className="text-gray-700 text-lg"><strong>Рейтинг:</strong></p>
              <div className="ml-2 flex items-center">
                {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
                {product.rating % 1 > 0 && <FaStar className="text-yellow-500" />}
              </div>
              <span className="ml-2 text-lg text-gray-700">({product.rating})</span>
            </div>

            <p className="text-gray-700 text-lg">
              <strong>Запас:</strong> {product.stock > 0 ? `${product.stock} единиц` : 'Нет в наличии'}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Объем:</strong> {product.volume.join(', ')} л
            </p>
            <p className="text-gray-700 text-lg"><strong>Категория:</strong> {product.category}</p>
            <p className="text-gray-700 text-lg"><strong>Штук:</strong> {product.stock}</p>
            <p className="text-gray-700 text-lg"><strong>Стоимость: </strong> {product.price}</p>
            
            <p className="text-gray-700 text-lg"><strong>Скидочная цена: </strong> {product.discount_price}</p>

            <div className="flex items-center space-x-4 mt-4 border-none">
              <button onClick={handleDownload} className="btn btn-primary flex items-center space-x-2 border-none">
                <FaDownload />
                <span>Скачать PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-0">
          <h3 className="text-xl font-semibold text-gray-900">Описание</h3>
          <p className="text-gray-700 text-lg">{product.description}</p>
        </div>

      </div>
    </div>
  );
};

export default ProductItem;
