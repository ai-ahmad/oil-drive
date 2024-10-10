"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';
import Category from '../SideBar/Category';
import { SlOptionsVertical } from "react-icons/sl";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleOptionsMenu = () => {
    setIsOptionsOpen((prev) => !prev);
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_OILDRIVE_API}/zayavka/create`, formData);
      if (response.status === 200) {
        alert('Заявка успешно отправлена!');
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Ошибка при отправке заявки.');
    } finally {
      setIsModalOpen(false); // Close the modal after submission, regardless of success
    }
  };

  return (
    <header className="bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-white p-2 bg-slate-800 rounded-full xl:hidden" aria-label="Open sidebar">
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Logo */}
        <div className="navbar">
      <div className="navbar-start">
        <Image
          src="https://oiltrade.uz/templates/oiltrade/images/logo1.png"
          alt="OilTrade Logo"
          width={160}
          height={64}
          className="h-16"
        />
        <div className="flex flex-col ml-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-semibold">998 99 797-48-77</span>
            <span>|</span>
            <span className="text-red-600 font-semibold">998 99 837-25-70</span>
          </div>
          <div className="text-gray-500">
            Время работы: с 9.00 до 17.00, сб-вс выходной
          </div>
          <div className="text-gray-500">
            Наша почта: <a href="mailto:oiltrade@mail.ru" className="text-red-600">oiltrade@mail.ru</a>
          </div>
        </div>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Поиск..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button onClick={toggleModal} className="btn bg-red-600 text-white">
          Оставить Заявку
        </button>
      </div>
    </div>

        {/* Mobile options menu toggle button */}
        <button onClick={toggleOptionsMenu} className="text-white bg-slate-800 p-2 rounded-full xl:hidden" aria-label="Open options">
          {isOptionsOpen ? <FaTimes size={24} /> : <SlOptionsVertical size={24} />}
        </button>
      </div>
      {isOptionsOpen && (
        <div className="xl:hidden p-4">
          <div className="flex flex-col items-center space-y-3">

            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold">998 99</div>
              <div className="text-2xl font-bold">797-48-77</div>
              <p className="text-gray-500 text-sm">Время работы: с 9.00 до 17.00, сб-вс выходной</p>
            </div>
            
            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold">998 99</div>
              <div className="text-2xl font-bold">837-25-70</div>
              <p className="text-gray-500 text-sm">
                Наша почта: <a href="mailto:oiltrade@mail.ru" className="text-red-600">oiltrade@mail.ru</a>, отвечаем очень быстро!
              </p>
            </div>

            <a href="https://oiltrade.uz/" className="bg-red-600 text-center text-white py-3 px-4 rounded-full max-w-[60%]">
              Oiltrade.uz
            </a>
          </div>
        </div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed overflow-y-auto top-0 left-0 w-4/5 h-full bg-white z-[999] shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-3 right-[5%] text-white text-3xl"
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
        <nav className="w-full">
          <div className="flex flex-col px-3 py-3 bg-slate-800 text-white">
            <a href="/" className="hover:text-gray-400 text-base py-2 ">Главная</a>
            <a href="/news" className="hover:text-gray-400 text-base py-2 ">Новости</a>
            <a href="/about" className="hover:text-gray-400 text-base py-2 ">О магазине</a>
            <a href="/payment" className="hover:text-gray-400 text-base py-2 ">Оплата и заказ</a>
            <a href="/delivery" className="hover:text-gray-400 text-base py-2 ">Доставка</a>
            <a href="/contact" className="hover:text-gray-400 text-base py-2  ">Контакты</a>
          </div>
          <Category />
        </nav>
      </div>
      {/* Modal for submitting a request */}
      {isModalOpen && (
        <div className="modal modal-open">
        <div className="modal-box w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Оставить заявку</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block mb-2 text-sm font-medium">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={toggleModal}
                className="btn btn-ghost"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="btn bg-red-600 text-white"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

      {/* Desktop Navigation Links */}
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
