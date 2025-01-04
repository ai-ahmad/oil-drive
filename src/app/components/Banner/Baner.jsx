"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Baner = () => {
  const slides = [
    {
      _id: "1",
      image_url: "https://oiltrade.uz/templates/oiltrade/images/3.jpg",
      description: "GNV",
    },
    {
      _id: "2",
      image_url: "https://oiltrade.uz/templates/oiltrade/images/1.jpg",
      description: "Tebeoil",
    },
    {
      _id: "3",
      image_url: "https://oiltrade.uz/templates/oiltrade/images/2.jpg",
      description: "SHELL",
    },
  ];

  return (
    <div className="relative container w-full h-56 sm:h-72 md:h-96 lg:h-[450px] xl:h-128 2xl:h-144 overflow-hidden rounded-lg">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}  
        loop={true} 
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <Image
              src={slide.image_url}
              alt={slide.description}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          background-color: #ffffff; /* Red-500 */
          color: #ef4444; /* White */
          border-radius: 9999px; /* Fully rounded */
          padding: 1.05rem 1.3rem; /* p-5 */
          width: auto; /* Maintain aspect ratio for padding */
          height: auto;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1.2rem; /* Adjust arrow size */
        }
        .swiper-pagination-bullet {
          background-color: #ffffff; /* White */
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background-color: #ef4444; /* Red-500 */
          opacity: 1;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none; /* Hide navigation arrows on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default Baner;
