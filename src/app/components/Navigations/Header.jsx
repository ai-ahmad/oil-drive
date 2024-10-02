"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* logo  */}
        {/* Company Logo */}
        <div>
          <Image
            src={'https://oiltrade.uz/templates/oiltrade/images/logo1.png'}
            alt="OilTrade Logo"
            width={160}
            height={64}
            className="h-16"
          />
        </div>

        {/* Contact Information for Desktop */}
        <address className="hidden lg:flex items-center space-x-6 not-italic">
          <div className="text-black">
            <p className="text-sm">
              <span className="font-bold text-red-600">
                <a href="tel:+998997974877" className='flex items-center gap-2' aria-label="Call 998 99 797-48-77">
                  <FaPhoneAlt /> 998 99 797-48-77
                </a>
              </span>
              <br />
              <span className="text-gray-600">Время работы: с 9.00 до 17.00</span>
            </p>
          </div>
          <div className="text-black">
            <p className="text-sm">
              <span className="font-bold text-red-600">
                <a href="tel:+998998372570" className='flex items-center gap-2' aria-label="Call 998 99 837-25-70">
                  <FaPhoneAlt /> 998 99 837-25-70
                </a>
              </span>
              <br />
              <span className="text-gray-600">Наша почта: <a href="mailto:oiltrade@mail.ru" className="text-red-600">oiltrade@mail.ru</a></span>
            </p>
          </div>
        </address>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-red-600">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Search Box and CTA button */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="relative">
            <input
            onChange={() => searchProducs}
              type="text"
              placeholder="Поиск..."
              className="border rounded-l-full px-4 py-2 text-sm focus:outline-none"
              aria-label="Search"
            />
            <button 
              className="bg-gray-200 border-l px-4 py-2 rounded-r-full" 
              aria-label="Search Button"
            >
              🔍
            </button>
          </div>
          <div>
            <button className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500 text-sm">
              OilTrade.uz
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links for Mobile */}
      <nav className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-gray-900 text-white py-4">
          <div className="container mx-auto flex flex-col items-center space-y-2">
            <a href="/" className="hover:text-gray-400 text-sm">Главная</a>
            <a href="/news" className="hover:text-gray-400 text-sm">Новости</a>
            <a href="/about" className="hover:text-gray-400 text-sm">О магазине</a>
            <a href="/payment" className="hover:text-gray-400 text-sm">Оплата и заказ</a>
            <a href="/delivery" className="hover:text-gray-400 text-sm">Доставка</a>
            <a href="/contact" className="hover:text-gray-400 text-sm">Контакты</a>
          </div>
        </div>
      </nav>

      {/* Navigation Links for Tablet and Laptop */}
      <nav className="hidden lg:block bg-gray-900 text-white">
        <div className="container mx-auto flex justify-center space-x-6 py-4">
          <a href="/" className="hover:text-gray-400 text-sm">Главная</a>
          <a href="/news" className="hover:text-gray-400 text-sm">Новости</a>
          <a href="/about" className="hover:text-gray-400 text-sm">О магазине</a>
          <a href="/payment" className="hover:text-gray-400 text-sm">Оплата и заказ</a>
          <a href="/delivery" className="hover:text-gray-400 text-sm">Доставка</a>
          <a href="/contact" className="hover:text-gray-400 text-sm">Контакты</a>
        </div>
      </nav>

      {/* Mobile Contact Information */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-100 py-4`}>
        <div className="container mx-auto flex flex-col items-center space-y-2">
          <div className="text-black text-sm">
            <span className="font-bold text-red-600">
              <a href="tel:+998997974877" className='flex items-center gap-2' aria-label="Call 998 99 797-48-77">
                <FaPhoneAlt /> 998 99 797-48-77
              </a>
            </span>
            <br />
            <span className="text-gray-600">Время работы: с 9.00 до 17.00</span>
          </div>
          <div className="text-black text-sm">
            <span className="font-bold text-red-600">
              <a href="tel:+998998372570" className='flex items-center gap-2' aria-label="Call 998 99 837-25-70">
                <FaPhoneAlt /> 998 99 837-25-70
              </a>
            </span>
            <br />
            <span className="text-gray-600">Наша почта: <a href="mailto:oiltrade@mail.ru" className="text-red-600">oiltrade@mail.ru</a></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
