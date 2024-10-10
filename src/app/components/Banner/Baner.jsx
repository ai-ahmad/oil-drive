"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Baner = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_OILDRIVE_API;
  const imgUrl = process.env.NEXT_PUBLIC_OILDRIVE_IMG_API;

  const fetchSlides = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`http://localhost:5000/api/v1/banner`);
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // End loading
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
    <div className="container px-7 relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] max-w-7xl mx-auto overflow-hidden bg-red-500">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        slides.length > 0 && (
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image_url}
                  alt={`Slide ${slide._id}`}
                  height={100}
                  width={100}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 ${
                    currentSlide === index && isDescriptionVisible ? 'opacity-100' : 'opacity-0'
                  } bg-red-500 text-white p-4 md:p-6 rounded text-xs sm:text-sm md:text-lg w-[250px] sm:w-[300px] lg:w-[400px] h-[50px] sm:h-[70px] lg:h-[90px]`}
                  style={{
                    opacity: 0.7,
                  }}
                >
                  <div className="border-y-cyan-50 border-l-stone-50">
                    {slide.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      <button
        onClick={handlePrevSlide}
        className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 p-0 rounded-full transition duration-300"
      >
        <span className="m-3 sm:m-5 text-2xl sm:text-4xl text-black hover:text-white">
          &#10094;
        </span>
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 p-0 rounded-full transition duration-300"
      >
        <span className="m-3 sm:m-5 text-2xl sm:text-4xl text-black hover:text-white">
          &#10095;
        </span>
      </button>
    </div>
  );
};

export default Baner;
