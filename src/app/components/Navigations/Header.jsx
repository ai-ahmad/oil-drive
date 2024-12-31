"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import Category from "../SideBar/Category";
import { SlOptionsVertical } from "react-icons/sl";
import { FaDroplet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
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
      const response = await axios.post(
        "https://admin-dash-oil-trade.onrender.com/api/v1/zayavka/create",
        formData
      );
      if (response.status === 201) {
        alert("Заявка успешно отправлена!");
      }
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert("Ошибка при отправке заявки.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="bg-white mb-6">
      <nav className="hidden lg:block w-full">
        <div className="container mx-auto flex items-center justify-between w-full py-3">
          <div className="space-x-10">
            <a href="/" className="hover:text-gray-400">
              Главная
            </a>
            <a href="/news" className="hover:text-gray-400">
              Новости
            </a>
            <a href="/about" className="hover:text-gray-400">
              О магазине
            </a>
            <a href="/payment" className="hover:text-gray-400">
              Оплата и заказ
            </a>
            <a href="/delivery" className="hover:text-gray-400">
              Доставка
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Контакты
            </a>
            
          </div>
          <div>
            <span className="text-adaptive-xs">
              +998 99 999-99-99
            </span>
          </div>
        </div>
      </nav>
      <div className="container mx-auto flex justify-between items-center py-4 ">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 bg-red-600 rounded-full lg:hidden"
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

        <div className="hidden lg:flex space-x-4 items-center">
          <button
            onClick={toggleModal}
            className="btn bg-red-600 px-8 text-white"
          >
            <FaBars />
            Каталог
          </button>
          <input
            type="text"
            placeholder="Поиск..."
            className="input input-bordered w-[500px]"
          />
        </div>
        <div className="hidden lg:flex">
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="bg-red-500 p-2 text-white rounded-full">
              <FaDroplet />
              </div>
              <span className="text-xs">Подбор масла</span>
            </div>
            <div className=" space-x-4 items-center">
          <button
            onClick={toggleModal}
            className="btn bg-red-600 px-8 text-white"
          >
            <FaBars />
            Оставить заявку
          </button>
         
        </div>
          </div>
        </div>
        <button
          onClick={toggleOptionsMenu}
          className="text-white p-2 bg-red-600 rounded-full lg:hidden"
          aria-label="Open options"
        >
          {isOptionsOpen ? (
            <FaTimes size={24} />
          ) : (
            <SlOptionsVertical size={24} />
          )}
        </button>
      </div>

      {isOptionsOpen && (
        <div className="lg:hidden p-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold">998 99 999-99-99</div>
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
              OilDrive.uz
            </a>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-4/5 h-full bg-white z-[999] transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-3 right-3 text-3xl text-white"
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
        <nav className="">
          <div className="flex flex-col space-y-4 p-4 bg-slate-800 text-white">
            <a href="/" className="hover:text-gray-400 text-lg">
              Главная
            </a>
            <a href="/news" className="hover:text-gray-400 text-lg">
              Новости
            </a>
            <a href="/about" className="hover:text-gray-400 text-lg">
              О магазине
            </a>
            <a href="/payment" className="hover:text-gray-400 text-lg">
              Оплата и заказ
            </a>
            <a href="/delivery" className="hover:text-gray-400 text-lg">
              Доставка
            </a>
            <a href="/contact" className="hover:text-gray-400 text-lg">
              Контакты
            </a>
            <a href="/contact" className="hover:text-gray-400 text-lg">
              Подбор масла
            </a>
          </div>
          <Category />
        </nav>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Оставить заявку</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Имя
                </label>
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
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
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
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium"
                >
                  Телефон
                </label>
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
                <label
                  htmlFor="comment"
                  className="block mb-2 text-sm font-medium"
                >
                  Комментарий
                </label>
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
                <button type="submit" className="btn bg-red-600 text-white">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navigation;
