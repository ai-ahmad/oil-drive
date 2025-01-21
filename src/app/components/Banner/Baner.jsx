"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BannerSkeleton from "./BannerSkeleton";

const Baner = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://admin-dash-oil-trade.onrender.com/api/v1/banner");
        if (!response.ok) throw new Error(`Failed to fetch banners: ${response.status}`);
        const data = await response.json();
        setSlides(data);
        console.log("imagee",data.image_url)
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center"><BannerSkeleton /></div>;
  }

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
        {slides.map((slide) => {
  console.log("Slide data:", slide.image_url); // Вывод данных для проверки
  return (
    <SwiperSlide key={slide._id}>
      <Image
        src={`https://admin-dash-oil-trade.onrender.com${slide.image_url}`}
        alt={slide.description}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </SwiperSlide>
  );
})}

      </Swiper>
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          background-color: #ffffff;
          color: #ef4444;
          border-radius: 9999px;
          padding: 1.05rem 1.3rem;
          width: auto;
          height: auto;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1.2rem;
        }
        .swiper-pagination-bullet {
          background-color: #ffffff;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background-color: #ef4444;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Baner;
