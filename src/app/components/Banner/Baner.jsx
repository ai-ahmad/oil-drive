"use client"; 

import React, { useEffect, useState } from 'react';

const Baner = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); 
  const [isImageVisible, setIsImageVisible] = useState(true); 
  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${apiUrl}/banner`);
      const data = await response.json();
      setSlides(data); 
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchSlides(); 

    const timer = setInterval(() => {
      setIsDescriptionVisible(true);
      setIsImageVisible(true); 

      setTimeout(() => {
        setIsDescriptionVisible(false);

        setTimeout(() => {
          setIsImageVisible(false); 

          setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsImageVisible(true); 
          }, 500);
        }, 500); 
      }, 4000); 
    }, 6000);

    return () => clearInterval(timer); 
  }, [slides.length]);

  const handlePrevSlide = () => {
    setIsImageVisible(false); 
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsImageVisible(true); 
    }, 500); 
  };

  const handleNextSlide = () => {
    setIsImageVisible(false); 
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsImageVisible(true); 
    }, 500); 
  };

  return (
    <div className="p-7 relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] max-w-7xl mx-auto overflow-hidden">
      {slides.length > 0 && (
        <img
          src={`${imgUrl}${slides[currentSlide].image_url}`} 
          alt={`Слайд ${slides[currentSlide].id}`}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isImageVisible ? 'opacity-100' : 'opacity-0'
          }`} // Плавный переход между изображениями
        />
      )}

      {slides.length > 0 && (
        <div
          className={`absolute bottom-10 transform transition-transform duration-700 ${
            isDescriptionVisible ? 'opacity-100' : 'opacity-0'
          } bg-red-500 text-white p-4 md:p-6 rounded text-xs sm:text-sm md:text-lg w-[250px] sm:w-[300px] lg:w-[400px] h-[50px] sm:h-[70px] lg:h-[90px]`}
          style={{
            right: '0%', 
            transform: isDescriptionVisible ? 'translateX(-600px)' : 'translateX(100%)', 
            opacity: 0.7
          }}
        >
          <div className="border-y-cyan-50 border-l-stone-50">
            {slides[currentSlide].description}
          </div>  
        </div>
      )}

      <button 
        onClick={handlePrevSlide} 
        className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 p-0 rounded-full transition duration-300"
      >
        <span className="m-3 sm:m-5 text-2xl sm:text-4xl text-black hover:text-white">&#10094;</span> 
      </button>
      <button 
        onClick={handleNextSlide} 
        className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 p-0 rounded-full transition duration-300"
      >
        <span className="m-3 sm:m-5 text-2xl sm:text-4xl text-black hover:text-white">&#10095;</span> 
      </button>
    </div>
  );
};

export default Baner;
