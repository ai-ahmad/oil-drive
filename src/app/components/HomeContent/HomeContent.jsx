"use client";

import React, { useState, useEffect } from "react";
import ProductItemSkeleton from "../Card/ProductItemSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import Swiper pagination styles
import { Pagination } from "swiper/modules"; // Import the Pagination module
import ProductCard from "../ProductCard/ProductCard";

const HomeContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl lg:text-3xl font-bold mt-10 mb-4">Выгодное предложение</h1>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={20}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1, // 1 slide for small devices
            },
            455: {
              slidesPerView: 2, // 2 slides for slightly larger devices
            },
            845: {
              slidesPerView: 3, // 3 slides for tablets
            },
            1125: {
              slidesPerView: 4, // 4 slides for desktop
            },
          }}
          pagination={{
            clickable: true, // Make the pagination dots clickable
            type: "bullets", // Pagination style
          }}
          modules={[Pagination]} // Enable the Pagination module
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HomeContent;
