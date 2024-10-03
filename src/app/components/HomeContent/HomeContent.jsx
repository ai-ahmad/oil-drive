"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";

const HomeContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const request = await axios.get(`http://localhost:5000/api/v1/card`);
        if (request.status === 200) {
          setProducts(request.data);
          applyFilter(request.data); // Apply the filter after data is fetched
        } else {
          console.error("Error fetching products", request.statusText);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  // Apply category filter
  const applyFilter = (products) => {
    const selectedCategory = localStorage.getItem("category") || "Прочее";

    if (selectedCategory === "Прочее") {
      setFilteredProducts(products);  // Show all products if no specific category is selected
    } else {
      const filtered = products.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    applyFilter(products);
  }, [products]);

  // Listen to storage changes and reapply the filter when category changes
  useEffect(() => {
    const handleStorageChange = () => {
      applyFilter(products);  // Reapply filter if localStorage is updated
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [products]);

  return (
    <div className="container mx-auto p-4">
      {/* Check if filteredProducts is empty and display "Product not found" */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">Product not found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
  <FaTint className="mr-1 text-adaptive-sm" /> {product.volume?.[0] ? `${product.volume[0]} л` : "Не указано"}
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
      )}
    </div>
  );
};

export default HomeContent;
