"use client";

import { BiMessageSquareDetail } from "react-icons/bi";
import { FaBars } from "react-icons/fa";

const DesktopNavigation = ({ toggleModal }) => {
  return (
    <nav className="hidden lg:block w-full bg-white">
      <div className="z mx-auto flex items-center justify-between py-3">
        <div className="space-x-10">
          <a href="/" className="hover:text-gray-400">Главная</a>
          <a href="/news" className="hover:text-gray-400">Новости</a>
          <a href="/about" className="hover:text-gray-400">О магазине</a>
          <a href="/payment" className="hover:text-gray-400">Оплата и заказ</a>
          <a href="/delivery" className="hover:text-gray-400">Доставка</a>
          <a href="/contact" className="hover:text-gray-400">Контакты</a>
        </div>
        <div>
          <span className="text-adaptive-xs">+998 99 999-99-99</span>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="hidden lg:flex space-x-4 items-center">
          <button
            onClick={toggleModal}
            className="btn bg-red-600 border-none hover:bg-red-700 px-8 text-white"
          >
            <FaBars />
            Каталог
          </button>
          <input
            type="text"
            placeholder="Поиск..."
            className="input bg-white input-bordered w-[500px]"
          />
        </div>
        <div className="hidden lg:flex">
          <button
            onClick={toggleModal}
            className="btn bg-red-600 border-none px-8 hover:bg-red-700 text-white"
          >
            <BiMessageSquareDetail size={18} />
            Оставить заявку
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
