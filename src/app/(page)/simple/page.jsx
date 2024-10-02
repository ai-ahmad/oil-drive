"use client";
import Image from "next/image";
import { FaCheck, FaStar, FaDownload } from "react-icons/fa";

const Simple = () => {
  const product = {
    name: "Масло гидравлическое Лукойл ГЕЙЗЕР СТ 32",
    imageUrl: "/product.png", // Замените на путь к изображению
    article: "ОТ-381",
    volume: "205 л",
    brand: "ЛУКОЙЛ",
    country: "Россия",
    inStock: true,
    price: null, // Цена пока неизвестна
    rating: 5,
    passportLink: "/product-passport.pdf", // Замените на правильный путь к паспорту продукта
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left section - Product Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Right section - Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Stock status and rating */}
            <div className="flex items-center mb-4">
              {product.inStock ? (
                <FaCheck className="text-green-500 mr-2" />
              ) : (
                <span className="text-red-500 mr-2">Нет в наличии</span>
              )}
              <span className="text-yellow-500 flex items-center">
                {[...Array(product.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </span>
            </div>

            {/* Price and buy button */}
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold mr-4">
                {product.price ? `${product.price} сум` : "- сум."}
              </span>
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                Купить
              </button>
            </div>

            {/* Download product passport */}
            <div className="mb-4">
              <a
                href={product.passportLink}
                className="text-red-500 hover:underline flex items-center"
                download
              >
                <FaDownload className="mr-2" />
                Паспорт продукта
              </a>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-300 pt-4">
              <p className="text-gray-700 mb-2">
                <strong>Артикул:</strong> {product.article}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Объем:</strong> {product.volume}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Бренд:</strong> {product.brand}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Страна производитель:</strong> {product.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-t border-gray-300">
        <div className="flex space-x-6 mt-4">
          <button className="text-black font-bold border-b-2 border-black pb-2">
            Описание
          </button>
          <button className="text-gray-500">Отзывы и вопросы (0)</button>
        </div>
        <div className="mt-4">
          <p>
            Здесь можно разместить описание товара, например, характеристики,
            состав или другие важные детали.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Simple;
