"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/zayavka/create', formData);
      if (response.status === 200) {
        alert('Заявка успешно отправлена!');
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Ошибка при отправке заявки.');
    } finally {
      setIsModalOpen(false); // Закрыть модальное окно после нажатия кнопки "Отправить", даже если отправка не удалась
    }
  };
  

  return (
    <header className="bg-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* logo */}
        <div>
          <Image
            src={'https://oiltrade.uz/templates/oiltrade/images/logo1.png'}
            alt="OilTrade Logo"
            width={160}
            height={64}
            className="h-16"
          />
        </div>

        <address className="hidden lg:flex items-center space-x-6 not-italic">
          <div className="text-black">
            <p className="text-sm">
              <span className="font-bold text-red-600">
                <a href="tel:+998997974877" className="flex items-center gap-2" aria-label="Call 998 99 797-48-77">
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
                <a href="tel:+998998372570" className="flex items-center gap-2" aria-label="Call 998 99 837-25-70">
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
              type="text"
              placeholder="Поиск..."
              className="border rounded-l-full px-4 py-2 text-sm focus:outline-none"
              aria-label="Search"
            />
            <button className="bg-gray-200 border-l px-4 py-2 rounded-r-full" aria-label="Search Button">
              🔍
            </button>
          </div>
          <div>
            <button 
              onClick={toggleModal} // Открытие модального окна
              className=" w-[200px] h-[50px] bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500 text-sm"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Оставить заявку</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="comment">Комментарий</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 py-2 px-4 rounded"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
    </header>
  );
};

export default Navigation;
