"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaDownload } from "react-icons/fa"; // Icons for rating and download
import { CiShoppingTag } from "react-icons/ci"; // Icon for shopping tag
import axios from "axios";
import Loading from "@/app/components/Loading/Loading";

const ProductItem = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
    <>
      <div className="flex flex-row mt-4 container">
        <div className="hidden lg:block">
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

              <div className="mt-6">
                <span className="font-bold text-2xl text-gray-800">
                  {product.price ? `${product.price} сум` : "- сум."}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Описание</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductItem;
