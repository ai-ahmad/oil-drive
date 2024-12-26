"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Loading from "@/app/components/Loading/Loading";

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
  const [contacts, setContacts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/contact");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      {contacts.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-14">
          <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
            Контактные данные
          </h1>
          <div className="flex flex-col gap-8">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="border border-gray-300 rounded-lg p-4 shadow-md"
              >
                <p className="text-lg sm:text-xl mb-2">
                  <strong>Имя:</strong> {contact.name}
                </p>
                <p className="text-lg sm:text-xl mb-4">
                  <strong>Описание:</strong> {contact.description}
                </p>

                {contact.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contact.images.map((image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg border"
                      >
                        <Image
                          src={image.image}
                          alt={`Image of ${contact.name}`}
                          width={400}
                          height={250}
                          className="rounded-lg object-cover w-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No images available for this contact.</p>
                )}
              </div>
            ))}
          </div>
          {isMounted && (
            <div className="w-full h-80 sm:h-96 mt-6">
              <DynamicMap
                center={[41.2995, 69.2401]}
                zoom={13}
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
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Contact;
