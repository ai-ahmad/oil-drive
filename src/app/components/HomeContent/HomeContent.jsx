"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import ProductItemSkeleton from "../Card/ProductItemSkeleton";

// Static product data
const productsData = [
  {
    _id: "1",
    name: "Product 1",
    description: "Description of Product 1",
    category: "Category 1",
    price: 1000,
    volume: [1],
    image: { main_images: [] }
  },
  {
    _id: "2",
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    price: 1500,
    volume: [2],
    image: { main_images: [] }
  },
  {
    _id: "3",
    name: "Product 3",
    description: "Description of Product 3",
    category: "Category 3",
    price: 2000,
    volume: [3],
    image: { main_images: [] }
  },
  {
    _id: "4",
    name: "Product 4",
    description: "Description of Product 4",
    category: "Category 4",
    price: 2500,
    volume: [4],
    image: { main_images: [] }
  },
  {
    _id: "5",
    name: "Product 5",
    description: "Description of Product 5",
    category: "Category 5",
    price: 3000,
    volume: [5],
    image: { main_images: [] }
  },
  {
    _id: "6",
    name: "Product 6",
    description: "Description of Product 6",
    category: "Category 6",
    price: 3500,
    volume: [6],
    image: { main_images: [] }
  },
  // Add more products as needed
];

const DEFAULT_IMAGE =
  "https://oiltrade.uz/uploads/posts/2024-11/1732016139_maslo-motornoe-lukojl-m8d_pr47945_1000x1000f.jpg";

const ProductCard = ({ product }) => (
  <Link href={`/card/${product._id}`}>
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
        <Image
          src={DEFAULT_IMAGE}
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
        <p className="text-gray-700 text-xs sm:text-sm md:text-base">
          {product.description}
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
            <FaTint className="mr-1 text-adaptive-sm" />{" "}
            {product.volume?.[0] || "N/A"} л
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

const HomeContent = () => {
  const [products, setProducts] = useState(productsData); // Use static data
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const applyFilter = (products) => {
      const selectedCategory =
        typeof window !== "undefined"
          ? localStorage.getItem("category") || "Прочее"
          : "Прочее";

      if (selectedCategory === "Прочее") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) =>
          product.category.includes(selectedCategory)
        );
        setFilteredProducts(filtered);
      }
    };

    applyFilter(products);
  }, [products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-4">
      {/* Banner */}
      <div className="mb-6">
        
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      ) : currentProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">Product not found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HomeContent;
