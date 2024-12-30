"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import ProductItemSkeleton from "../Card/ProductItemSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DEFAULT_IMAGE =
  "https://oiltrade.uz/uploads/posts/2024-11/1732016139_maslo-motornoe-lukojl-m8d_pr47945_1000x1000f.jpg";

const ProductCard = ({ product }) => (
  <>
    <Link href={`/card/${product._id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-center h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
          <Image
            src={`https://admin-dash-oil-trade.onrender.com\\${product.image.main_images[0]}` || DEFAULT_IMAGE}
            alt={product.name}
            width={150}
            height={150}
            className="object-contain max-w-full max-h-full"
            unoptimized
          />
        </div>
        <div className="mt-4 flex flex-col justify-between h-full">
          <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold">
            {product.name}
          </p>
         
          <div className="flex items-center py-2 mt-2">
            <CiShoppingTag className="text-gray-600 mr-1" />
            <p className="text-sm sm:text-base">{product.category || "Uncategorized"}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-adaptive-sm">
              {product.price ? `${product.price} сум` : "- сум."}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm sm:text-base flex items-center">
              <FaTint className="mr-1 text-adaptive-sm" /> {product.volume?.[0] || "N/A"} л
            </span>
          </div>
        </div>
      </div>
    </Link>
  </>
);

const HomeContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/card/`);
      if (!response.ok) {
        throw new Error("Failed to fetch products data.");
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Ошибка загрузки данных");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-4">
      <div className="mb-6"></div>
      <h1 className="text-6xl font-bold">Выгодное предложение</h1> {/* Сделали жирнее */}

      {error && <div className="text-red-500 text-center">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Swiper spaceBetween={20} slidesPerView={5} loop={true}>
          <div className="mt-10"> {/* Добавили отступ сверху для карточек */}
            {currentProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default HomeContent;
