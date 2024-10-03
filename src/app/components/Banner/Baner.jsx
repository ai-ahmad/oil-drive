"use client"; 

import React, { useEffect, useState } from 'react';

const Baner = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); 
  const [isImageVisible, setIsImageVisible] = useState(true); 

  const fetchSlides = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/banner');
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
    <div className="p-7 relative w-[1000px] h-[350px] mx-auto overflow-hidden">
      {slides.length > 0 && (
        <img
          src={`http://localhost:5000${slides[currentSlide].image_url}`} 
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
          } bg-red-500 text-white p-6 rounded text-lg w-[300px] h-[70px]`}
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
        className="absolute left-5 top-1/2 transform -translate-y-1/2 p-0 rounded-full transition duration-300"
      >
        <span className=" m-5 text-4xl text-black hover:text-white">&#10094;</span> 
      </button>
      <button 
        onClick={handleNextSlide} 
        className="absolute right-5 top-1/2 transform -translate-y-1/2 p-0 rounded-full transition duration-300"
      >
        <span className=" m-5 text-4xl text-black hover:text-white">&#10095;</span> 
      </button>
    </div>
  );
};

export default Baner;