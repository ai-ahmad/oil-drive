"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "leaflet/dist/leaflet.css"; // Подключаем стили Leaflet

// Динамический импорт компонентов Leaflet
const DynamicMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Container = ({ children, className }) => {
  return (
    <div className={`max-w-3xl mx-auto py-8 px-4 ${className}`}>{children}</div>
  );
};

const Contact = () => {
  const [viewState, setViewState] = useState({
    longitude: 69.2401,
    latitude: 41.2995,
    zoom: 13,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Контактные данные магазина</h1>

        <p className="mb-4">
          У Вас появились вопросы? Или хотите сотрудничать?
        </p>
        <p className="mb-4">
          Обращайтесь по указанным данным ниже, мы обязательно с Вами все
          обсудим.
        </p>
        <p className="mb-6">
          Либо закажите обратный звонок в правом верхнем углу сайта, мы
          обязательно Вам перезвоним.
        </p>

        <div className="space-y-2 mb-6">
          <p>
            <strong>Наш адрес:</strong> Узбекистан, г.Ташкент, Ул. Полевая
            (Ориентир Аэропорт)
          </p>
          <p>
            <strong>Телефон/Telegram:</strong> +998 99 797 48 77 (Руководитель
            отдела продаж) Джексанбаев Арслан Русланович
          </p>
          <p>
            <strong>Телефон/Telegram:</strong> +998 90 324 45 56 (Менеджер по
            вопросам закупок) Чоудри Али Сергеевич
          </p>
          <p>
            <strong>Телефон/Telegram:</strong> +998 99 837-25-70 (Директор по
            развитию) Владлена
          </p>
          <p>
            <strong>Телефон/Telegram:</strong> +998 90 000 00 00 (Заведующий
            складом) А.А
          </p>
          <p>
            <strong>Email:</strong> oiltrade.uz@mail.ru
          </p>
        </div>

        {/* Рендер карты только после монтирования компонента */}
        {isMounted && (
          <div className="w-full h-96 mt-6">
            {" "}
            {/* Измените высоту здесь */}
            <DynamicMap
              center={[viewState.latitude, viewState.longitude]}
              zoom={viewState.zoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[41.2995, 69.2401]}>
                <Popup>Tashkent, Uzbekistan</Popup>
              </Marker>
            </DynamicMap>
          </div>
        )}

        <div className="mt-6">
          <Image
            src="https://oiltrade.uz/uploads/posts/2020-02/medium/1582641343_flv_watermark.png"
            alt="oiltrade.img"
            width={400}
            height={250}
            className="rounded-lg"
          />
        </div>
      </Container>
    </>
  );
};

export default Contact;
