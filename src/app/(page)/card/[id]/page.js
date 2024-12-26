"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiShoppingTag } from "react-icons/ci"; 
import { FaDownload, FaStar } from "react-icons/fa"; // Иконки загрузки и звездочки
import axios from "axios";
import { jsPDF } from "jspdf"; // Импорт jsPDF для создания PDF
import Loading from "@/app/components/Loading/Loading";

const ProductItem = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kurs, setKurs] = useState(null)
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`https://admin-dash-oil-trade.onrender.com/api/v1/card/${id}`);

      if (response.status === 200) {
        setProduct(response.data);
        setActiveImage(response.data.image.all_images[0]);
      } else {
        setError("Product not found.");
      }
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
    if (!kurs) { // Only fetch if kurs hasn't been fetched yet
      fetchKurs();
    }
  }, [kurs]); // Add kurs as a dependency to prevent unnecessary fetch calls


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
        {product.image && product.image.all_images.length > 0 && (
          product.image.all_images.map((img, index) => (
            <Image
              key={index}
              src={`https://admin-dash-oil-trade.onrender.com/${img}`}
              alt={`${product.name} image ${index + 1}`}
              width={150}
              height={150}
              className={`object-cover cursor-pointer rounded-lg border-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform ${
                activeImage === img ? 'border-red-500 scale-105' : 'border-gray-300 hover:scale-110'
              }`}
              onClick={() => handleImageChange(img)}
            />
          ))
        )}
      </div> 
          <div className="relative h-[400px] w-[350px] overflow-hidden">
            {prevImage && (
              <Image
                src={`https://admin-dash-oil-trade.onrender.com/${prevImage}`}
                alt="Previous image"
                width={350}
                height={400}
                className={`absolute top-0 left-0 object-cover rounded-lg shadow-md transition-transform duration-500 ease-in-out opacity-0 ${
                  animating ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
            )}

            {activeImage && (
              <Image
                src={`hhttps://admin-dash-oil-trade.onrender.com/${activeImage}`}
                alt="Active image"
                width={350}
                height={400}
                className={`absolute top-0 left-0 object-cover rounded-lg shadow-md transition-transform duration-500 ease-in-out opacity-100 ${
                  animating ? '-translate-x-full' : 'translate-x-0'
                }`}
              />
            )}
          </div>

          <div className="flex flex-col space-y-4 lg:ml-8 w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            

            {/* Рейтинг продукта */}
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

            {/* Запас продукта */}
            <p className="text-gray-700 text-lg">
              <strong>Запас:</strong> {product.stock > 0 ? `${product.stock} единиц` : 'Нет в наличии'}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Объем:</strong> {product.volume.join(', ')} л
            </p>
            <p className="text-gray-700 text-lg"><strong>Бренд:</strong> {product.brand}</p>
            <p className="text-gray-700 text-lg"><strong>Страна производитель:</strong> {product.country}</p>
            <p className="text-gray-700 text-lg flex items-center">
              <strong>Категория:</strong>
              <CiShoppingTag className="inline-block mr-1 text-2xl text-gray-500" /> {product.category}
            </p>
            <div className="mt-4 flex gap-5 items-center">
              <span className="font-bold text-xl text-gray-800">
                {product.price ? `${(product.price * kurs).toFixed(2)} сум` : "N/A сум"}
              </span>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <FaDownload />
                <span>Скачать PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white p-8 lg:p-12 rounded-lg shadow-lg w-full lg:max-w-5xl mx-auto mt-12">

          <div className="flex flex-col lg:flex-row w-full justify-around items-start">
            <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
              <Image
                src={`${imgUrl}/${product.image}`}
                alt={product.name}
                width={300}
                height={400}
                className="object-contain"
              />
            </div>

            <div className="lg:w-1/2 p-6 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Артикул:</strong> {product.article}</p>
                <p><strong>Объем:</strong> {product.volume[0]} л</p>
                <p><strong>Бренд:</strong> {product.brand}</p>
                <p><strong>Страна производитель:</strong> {product.country}</p>
                <p><strong>Категория:</strong> <CiShoppingTag className="inline-block mr-1" /> {product.category}</p>
              </div>

              <div className="mt-6 flex items-center gap-16">
                <span className="font-bold text-2xl text-gray-800">
                  {product.price && kurs && kurs[0]
                    ? `${(product.price * kurs[0].kurs).toLocaleString('ru-RU')} сум`
                    : "- сум."}
                </span>
                <div>
                  <button>Скачать</button>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full mt-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Описание</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
