import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#262f38] text-gray-400 py-8">



        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-center items-center text-center text-[14px]">
          <p className="text-white ml-4 mb-2 md:mb-0 cursor-pointer hover:border-b hover:border-b-white">
            Главная
          </p>
          <p className="text-white ml-4 mb-2 md:mb-0 cursor-pointer hover:border-b hover:border-b-white">
            О магазине
          </p>
          <p className="text-white ml-4 mb-2 md:mb-0 cursor-pointer hover:border-b hover:border-b-white">
            Оплата и заказ
          </p>
          <p className="text-white ml-4 mb-2 md:mb-0 cursor-pointer hover:border-b hover:border-b-white">
            Доставка
          </p>
          <p className="text-white ml-4 mb-2 md:mb-0 cursor-pointer hover:border-b hover:border-b-white">
            Контакты
          </p>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 flex justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © 2020 - 2025. OilDrive.Uz - Всё идёт как по маслу.
            </p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
