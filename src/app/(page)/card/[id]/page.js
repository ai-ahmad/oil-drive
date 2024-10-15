"use client"; // This makes the component a Client Component

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaDownload } from "react-icons/fa"; // Icons for rating and download
import { CiShoppingTag } from "react-icons/ci"; // Icon for shopping tag
import axios from "axios";
import Loading from "@/app/components/Loading/Loading";
import Navigation from "@/app/components/Navigations/Header";
import Sidebar from "@/app/components/SideBar/Sidebar";

const ProductItem = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kurs, setKurs] = useState(1); // Default to 1 to avoid NaN issues
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`${apiUrl}/card/${id}`);
      if (response.status === 200) {
        setProduct(response.data);
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

  const FetchKurs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/curs');
      const data = await res.json();
      if (data && data.kurs) {
        setKurs(data.kurs);
      } else {
        console.error("Kurs data is not valid:", data);
        setKurs(1); // Fallback value
      }
    } catch (error) {
      console.error("Error fetching kurs:", error);
      setKurs(1); // Fallback value
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    FetchKurs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product available.</div>;
  }

  const handleDownload = () => {
    const pdfUrl = `${imgUrl}${product.product_info_pdf}`;
    window.location.href = pdfUrl;
  };

  return (
    <>
      <Navigation />
      <div className="flex flex-row mt-4 container">
        <Sidebar />
        <div className="flex flex-col md:flex-row bg-white p-5 rounded-lg shadow-lg w-full md:max-w-3xl mx-auto mt-12 justify-around items-center">
          <div className="md:w-1/3 flex justify-center items-center mb-4 md:mb-0">
            <Image
              src={`${imgUrl}${product.image}`}
              alt={product.name}
              width={200}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="md:w-2/3 p-4 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <div className="space-y-2 text-gray-600">
              <p><strong>Артикул:</strong> {product.article}</p>
              <p><strong>Объем:</strong> {product.volume[0]} л</p>
              <p><strong>Бренд:</strong> {product.brand}</p>
              <p><strong>Страна производитель:</strong> {product.country}</p>
              <p><strong>Категория:</strong> <CiShoppingTag className="inline-block mr-1" /> {product.category}</p>
            </div>
            <div className="mt-4 flex gap-5 items-center">
              <span className="font-bold text-xl text-gray-800">
                {product.price && kurs
                  ? `${(product.price * kurs).toFixed(2)} сум`
                  : "N/A сум"}
              </span>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <FaDownload />
                <span>Скачать pdf</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full md:max-w-5xl mx-auto mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Описание</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    </>
  );
};

export default ProductItem;
