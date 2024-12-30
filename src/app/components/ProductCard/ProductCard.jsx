"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import "swiper/css";

const DEFAULT_IMAGE =
  "https://oiltrade.uz/uploads/posts/2024-11/1732016139_maslo-motornoe-lukojl-m8d_pr47945_1000x1000f.jpg";

const ProductCard = ({ product }) => (
  <>
    <Link href={`/card/${product._id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300 my-4 border">
        {/* Image */}
        <div className="flex justify-center mb-4 h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
          <Image
            src={`https://admin-dash-oil-trade.onrender.com\\${product.image.main_images[0]}` || DEFAULT_IMAGE}
            alt={product.name}
            width={150}
            height={150}
            className="object-contain max-w-full max-h-full"
            unoptimized
          />
        </div>

        {/* Product Details */}
        <div className="mt-2 flex flex-col justify-between h-full">
          <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold">
            {product.name}
          </p>

          <p className="text-gray-700 text-xs sm:text-sm md:text-base mt-1 line-clamp-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm sm:text-base flex items-center">
            {product.volume?.[0] || "N/A"} л
            </span>
          </div>
          <div className="flex items-center justify-end mt-2">
            <span className="font-bold text-sm sm:text-base bg-green-500 p-1 px-2 text-white rounded-md">{product.price ? `${product.price} сум` : "- сум."}</span>
          </div>
          <div className="flex items-center justify-end py-2 mt-1 gap-1">
            <CiShoppingTag className="text-gray-600" />
            <p className="text-xs sm:text-xs md:text-base">{product.category || "Uncategorized"}</p>
          </div>
        </div>
      </div>
    </Link>
  </>
);

export default ProductCard;
