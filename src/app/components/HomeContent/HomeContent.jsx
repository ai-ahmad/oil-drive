"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import ProductItemSkeleton from "../Card/ProductItemSkeleton";

const HomeContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products to show per page
  const [loading, setLoading] = useState(true); // Loading state
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const request = await axios.get(`${apiUrl}/card`);
        if (request.status === 200) {
          setProducts(request.data);
          applyFilter(request.data); // Apply filter after getting data
        } else {
          console.error("Error fetching products", request.statusText);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  }, []);

  const applyFilter = (products) => {
    const selectedCategory = localStorage.getItem("category") || "Прочее";

    if (selectedCategory === "Прочее") {
      setFilteredProducts(products); // Show all products if no category selected
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

  useEffect(() => {
    const handleStorageChange = () => {
      applyFilter(products); // Reapply filter when localStorage changes
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [products]);

  // Calculate the products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-4">
      {loading ? (
        // Render skeletons while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      ) : currentProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">Product not found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <Link key={product._id} href={`/card/${product._id}`}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
                  {console.log(product)
                  }
                  {/* <Image
                    src={`${product.image}`}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-contain max-w-full max-h-full"
                  /> */}
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
                    <p
                      href={`/card/${product._id}`}
                      className="text-blue-500 text-sm sm:text-base"
                    >
                      Подробнее
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* Conditionally render pagination if there are products */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center items-center mt-5 space-x-2">
          <button
            className={`px-4 py-2 rounded-lg border transition-colors duration-300 
            ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white border-gray-300 hover:bg-gray-100"}`}
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg border transition-colors duration-300 
                ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white border-gray-300 hover:bg-gray-100"}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className={`px-4 py-2 rounded-lg border transition-colors duration-300 
            ${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? "bg-gray-300 cursor-not-allowed" : "bg-white border-gray-300 hover:bg-gray-100"}`}
            onClick={() =>
              paginate(
                currentPage < Math.ceil(filteredProducts.length / productsPerPage)
                  ? currentPage + 1
                  : currentPage
              )
            }
            disabled={
              currentPage === Math.ceil(filteredProducts.length / productsPerPage)
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
