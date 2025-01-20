import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { PiMedalBold, PiChatCenteredDotsBold } from "react-icons/pi";

const About = () => {
  return (
    <div className="bg-gray-200 py-10 text-gray-800 font-sans w-full">
      {/* Upper block */}
      <div className="container w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          {/* Text block on the left */}
          <div className="lg:max-w-[50%]">
            <h1 className="text-3xl font-bold">О бренде OilDrive</h1>
            <p className="mt-4 text-xl">
              OilDrive — один из ведущих производителей масел, смазок и иных
              технических жидкостей. Общество создано в 2005 году и является
              100% дочерней компанией ПАО OilDrive.
            </p>
            <p className="mt-2 text-xl">
              Производство охватывает 9 собственных производственных площадок, 2
              совместных предприятия и 25 привлеченных заводов, расположенных на
              5 континентах.
            </p>
          </div>

          {/* Image block on the right */}
          <div className="flex justify-center items-center my-auto lg:w-[50%]">
            <img
              src="https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2Frst.png&w=384&q=75"
              alt="Логотип ЛУКОЙЛ"
              className="w-full lg:w-[50%] h-auto"
            />
          </div>
        </div>

        {/* List of advantages */}
        <div className="mb-8">
          <h3 className="md:text-3xl text-3xl font-semibold text-red-600">
            Выбирая нас, вы получаете:
          </h3>
          <ul className="my-6 md:my-10 flex flex-wrap justify-between items-center gap-6 text-lg md:text-xl font-semibold">
            <li className="flex items-center gap-3 bg-white p-4 md:p-6 w-full sm:w-[48%] lg:w-[32%] rounded-md shadow-md">
              <PiMedalBold className="text-3xl md:text-4xl" />
              <span className="text-sm md:text-base lg:text-lg">
                100% гарантию оригинальной продукции
              </span>
            </li>
            <li className="flex items-center gap-3 bg-white p-4 md:p-6 w-full sm:w-[48%] lg:w-[32%] rounded-md shadow-md">
              <TbTruckDelivery className="text-3xl md:text-4xl" />
              <span className="text-sm md:text-base lg:text-lg">
                Оперативную доставку по всей России
              </span>
            </li>
            <li className="flex items-center gap-3 bg-white p-4 md:p-6 w-full sm:w-[48%] lg:w-[32%] rounded-md shadow-md">
              <PiChatCenteredDotsBold className="text-3xl md:text-4xl" />
              <span className="text-sm md:text-base lg:text-lg">
                Качественную клиентскую поддержку
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
