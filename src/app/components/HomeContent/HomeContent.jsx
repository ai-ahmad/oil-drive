"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CiStar, CiShoppingTag } from "react-icons/ci";
import { FaCheck, FaInfoCircle, FaTint } from "react-icons/fa";

const HomeContent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const request = await axios.get("http://localhost:5001/api/v1/card");
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
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <a href='simple' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[400px]">
            {/* Product Image */}
            <div className="flex justify-center h-[200px] sm:h-[250px]">
              <Image
                src={`http://localhost:5001/${product.image}`} 
                alt={product.name} 
                width={200} 
                height={200}
                className="object-contain"
              />
            </div>

         

            {/* Product Description */}
            <div className="mt-4">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">{product.description}</p>

            
              <div className="flex items-center py-2 mt-2">
                <CiShoppingTag className="text-gray-600 mr-1" />
                <p className="text-sm sm:text-base">{product.category}</p>
              </div>

        
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-lg sm:text-xl md:text-2xl">{product.price ? `${product.price} сум` : "- сум."}</span>
             
              </div>

            
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm sm:text-base flex items-center">
                  <FaTint className="mr-1" /> {product.volume[0]} л
                </span>
                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
                  <FaInfoCircle className="mr-2" /> Подробнее
                </button>
              </div>

              {/* More Info Button */}
            
            </div>
          </div>
        ))}
      </a>
    </div>
  );
};

export default HomeContent;
