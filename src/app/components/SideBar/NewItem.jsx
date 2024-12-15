import React from 'react';

const NewsItem = ({ newsItem }) => {
  const { title, description1, date, image } = newsItem;  // Используем image

  return (
    <div className="bg-white shadow-md mb-4 p-4">
      {image && (
        <div className="mb-4">
          <img
            src={image}  // Используем image, переданное в пропсах
            alt={title}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <p className="text-xs text-gray-500 mb-2">{date}</p>

      <h3 className="text-lg font-bold text-red-600 mb-2">{title}</h3>

      <p className="text-sm text-gray-700 mb-4">{description1.substring(0, 35)}...</p>

      <a href="#" className="text-blue-600 text-sm font-semibold">
        Подробнее
      </a>
    </div>
  );
};

export default NewsItem;
