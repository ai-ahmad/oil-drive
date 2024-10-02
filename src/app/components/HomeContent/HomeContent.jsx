"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle, FaTint } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";

const HomeContent = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/card/${product._id}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
                <Image
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between h-full">
                <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold">
                  {product.name}
                </p>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                  {product.description}
                </p>
                <div className="flex items-center py-2 mt-2">
                  <CiShoppingTag className="text-gray-600 mr-1" />
                  <p className="text-sm sm:text-base">{product.category}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-adaptive-sm">
                    {product.price ? `${product.price} сум` : "- сум."}
                  </span>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm sm:text-base flex items-center">
                    <FaTint className="mr-1 text-adaptive-sm" /> {product.volume[0]} л
                  </span>
                  <Link href={`/card/${product._id}`} className="text-blue-500 text-sm sm:text-base">
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
