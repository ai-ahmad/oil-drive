import React from "react";
import { FaVk, FaOdnoklassniki, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-white text-gray-600 py-8 border-t border-gray-300 container">
      <div className=" mx-auto">
        {/* Social Media and Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold md:text-3xl text-xl mb-4">Следите за нами в социальных сетях</h4>
            <p className="md:text-xl text-lg mb-4">Конкурсы, подарки и интересные посты ждут вас</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-red-600 text-2xl">
                <FaVk />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 text-2xl">
                <FaOdnoklassniki />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 text-2xl">
                <FaTelegramPlane />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold md:text-3xl text-xl mb-4">Подпишитесь на рассылку и будьте в курсе новостей</h4>
            <div className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-400 rounded-l-md bg-white px-4 py-2 w-full focus:outline-none"
              />
              <button className="bg-red-600 border-none text-white px-6 py-2 rounded-r-md hover:bg-red-700">
                ➔
              </button>
            </div>
            <p className="md:text-md text-sm  mt-2 text-gray-500">
              Подписываясь на рассылку, я даю согласие на получение рекламных сообщений
              и обработку персональных данных.
            </p>
          </div>
        </div>

        {/* Footer Links Section */}
        
      </div>
    </div>
  );
};

export default Footer;
