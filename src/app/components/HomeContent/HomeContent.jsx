"use client"; 

import React, { useState, useEffect } from "react";
import ProductItemSkeleton from "../Card/ProductItemSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import the pagination styles
import { Pagination } from "swiper/modules"; // Import the Pagination module
import ProductCard from "../ProductCard/ProductCard";

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
      console.log("abc", data);
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
              slidesPerView: 1, // 1 slide for mobile
            },
            640: {
              slidesPerView: 3, // 3 slides for tablet
            },
            1024: {
              slidesPerView: 4, // 4 slides for desktop
            },
          }}
          pagination={{
            clickable: true, // Make the pagination dots clickable
            type: "bullets", // You can also use 'fraction' or 'progressbar'
          }}
          modules={[Pagination]} // Enable the Pagination module
        >
          <div className="mt-10">
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
