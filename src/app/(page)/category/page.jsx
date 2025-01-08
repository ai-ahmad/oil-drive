"use client";
import ProductItemSkeleton from "@/app/components/Card/ProductItemSkeleton";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import useApiRequest from "@/app/hooks/useApiRequest";
import React, { useEffect, useState } from "react";

const Category = () => {
  const {
    loading: productsLoading,
    error: productsError,
    sendRequest: fetchProducts,
    data: products,
  } = useApiRequest();

  const {
    loading: categoriesLoading,
    error: categoriesError,
    sendRequest: fetchCategories,
    data: categories,
  } = useApiRequest();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;

  useEffect(() => {
    if (apiUrl) {
      fetchProducts(`${apiUrl}/card`, "GET");
    }
  }, [apiUrl, fetchProducts]);

  useEffect(() => {
    if (apiUrl) {
      fetchCategories(`${apiUrl}/category`, "GET");
    }
  }, [apiUrl, fetchCategories]);

  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col lg:flex-row container mx-auto pb-10">
      <aside className="w-full lg:w-1/4 p-4 border rounded-lg lg:min-h-screen mb-6 lg:mb-0 md:text-start text-center">
        <h2 className="text-lg font-bold mb-4">Категории</h2>
        {categoriesLoading ? (
          <div>
            <div className="p-4 shadow-md rounded-lg">
              <div className="skeleton w-full h-5"></div>
            </div>
            <div className="p-4 shadow-md rounded-lg">
              <div className="skeleton w-3/4 h-5"></div>
            </div>
            <div className="p-4 shadow-md rounded-lg">
              <div className="skeleton w-full h-5"></div>
            </div>
            <div className="p-4 shadow-md rounded-lg">
              <div className="skeleton w-2/3 h-5"></div>
            </div>
            <div className="p-4 shadow-md rounded-lg">
              <div className="skeleton w-10/12 h-5"></div>
            </div>
          </div>
        ) : categoriesError ? (
          <p className="text-red-500">Ошибка: {categoriesError}</p>
        ) : (
          <ul>
            <li
              className={`cursor-pointer mb-2 p-2 rounded transition duration-300 ${
                selectedCategory === null
                  ? "bg-red-600 text-white"
                  : "hover:bg-red-100 hover:shadow-md"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Показать все
            </li>
            {categories?.map((category) => (
              <li
                key={category._id}
                className={`cursor-pointer mb-2 p-2 rounded transition duration-300 ${
                  selectedCategory === category.category_name
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-100 hover:shadow-md"
                }`}
                onClick={() => setSelectedCategory(category.category_name)}
              >
                {category.category_name}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <div className="w-full lg:w-3/4 px-0 lg:px-4">
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductItemSkeleton key={index} />
            ))}
          </div>
        ) : productsError ? (
          <div className="text-red-500">Ошибка: {productsError}</div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div>Продукты не найдены.</div>
        )}
      </div>
    </div>
  );
};

export default Category;
