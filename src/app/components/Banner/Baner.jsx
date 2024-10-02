import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Импортируйте стили Swiper

const Baner = () => {
  const slides = [
    { id: 1, content: 'Слайд 1' },
    { id: 2, content: 'Слайд 2' },
    { id: 3, content: 'Слайд 3' },
  ];

  return (
    <div className="w-full h-64">
      <Swiper
        spaceBetween={30} // Расстояние между слайдами
        centeredSlides={true} // Центрирование активного слайда
        autoplay={{ delay: 2500, disableOnInteraction: false }} // Автопрокрутка
        pagination={{ clickable: true }} // Пагинация
        navigation // Стрелки навигации
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className="flex items-center justify-center bg-gray-300">
            <h2 className="text-2xl">{slide.content}</h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Baner;
