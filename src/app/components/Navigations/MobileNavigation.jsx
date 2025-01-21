"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import Image from "next/image";

const MobileNavigation = ({
  toggleSidebar,
  toggleOptionsMenu,
  isSidebarOpen,
  isOptionsOpen,
}) => {
  return (
    <div className="container mx-auto flex justify-between items-center py-4 lg:hidden">
      <button
        onClick={toggleSidebar}
        className="text-white p-2 hover:bg-red-700 border-none bg-red-600 rounded-full"
        aria-label="Open sidebar"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className="flex items-center">
        <a href="/">
          <Image
            src="/assets/img/oildrive-red.png"
            alt="OilDrive Logo"
            width={230}
            height={56}
            className="h-12 rounded-md"
          />
        </a>
      </div>

      <button
        onClick={toggleOptionsMenu}
        className="text-white p-2 border-none bg-red-600 rounded-full"
        aria-label="Open options"
      >
        {isOptionsOpen ? <FaTimes size={24} /> : <SlOptionsVertical size={24} />}
      </button>

      {isOptionsOpen && (
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold">
                998 99 999-99-99
              </div>
              <p className="text-gray-500 text-sm">
                Время работы: с 9.00 до 17.00, сб-вс выходной
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Наша почта:{" "}
                <a href="mailto:oildrive@gmail.com" className="text-red-600">
                  oildrive@gmail.com
                </a>
              </p>
            </div>
            <a
              href="https://oildrive.uz/"
              className="bg-red-600 text-center text-white py-3 px-4 rounded-full"
            >
              Перейти на сайт
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
