"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Loading from "@/app/components/Loading/Loading";

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

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://oildrive-wtc-backend-1.onrender.com/api/v1/contact"
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    return () => {
      const mapContainer = document.querySelector(".leaflet-container");
      if (mapContainer && mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
      }
    };
  }, []);

  return (
    <>
      {contacts.length > 0 ? (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center md:text-left mb-8">
            Контактные данные
          </h1>
          <div className="flex flex-col gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="border border-gray-300 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="flex-1">
                    <p className="text-lg sm:text-xl mb-2 font-semibold text-gray-800">
                      <strong>Имя:</strong> {contact.name}
                    </p>
                    <p className="text-lg sm:text-xl mb-4 text-gray-600">
                      <strong>Описание:</strong> {contact.description}
                    </p>
                  </div>

                  {/* Image Section */}
                  <div className="w-full sm:w-[150px] h-[150px] overflow-hidden rounded-lg flex justify-center items-center">
                    {contact.images && contact.images.length > 0 ? (
                      contact.images.map((image, index) => (
                        <div key={index} className="mb-4">
                          <img
                            src={`https://admin-dash-oil-trade.onrender.com/${image}`}
                            alt={`contact-${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">No images</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Contact;
