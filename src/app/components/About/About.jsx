import React from 'react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { PiMedalBold } from "react-icons/pi";


const About = () => {
  return (
    <div className="bg-gray-200 py-10 text-gray-800 font-sans w-full">
      {/* Верхний блок */}
      <div className='container w-full'>
        <div className="flex justify-between items-center mb-8">
          {/* Текстовый блок в левом углу */}
          <div className='max-w-[50%]'>
            <h1 className="text-3xl font-bold">О бренде WTC</h1>
            <p className="mt-4 text-xl">
              ООО «ЛЛК-Интернешнл» — один из ведущих производителей масел, смазок и иных технических жидкостей. Общество
              создано в 2005 году и является 100% дочерней компанией ПАО «ЛУКОЙЛ».
            </p>
            <p className="mt-2 text-xl ">
              Производство охватывает 9 собственных производственных площадок, 2 совместных предприятия и 25 привлеченных
              заводов, расположенных на 5 континентах.
            </p>
          </div>

          {/* Изображение в правом углу */}
          <div className='w-full flex justify-center items-center my-auto'>
            <img
              src="https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2Frst.png&w=384&q=75"
              alt="Логотип ЛУКОЙЛ"
              className="w-[50%] h-auto"
            />
          </div>
        </div>

        {/* Список преимуществ */}
        <div className="mb-8">
          <h3 className="text-4xl font-semibold text-red-600">Выбирая нас, вы получаете:</h3>
          <ul className=" my-10 flex items-center gap-[4%] text-2xl font-semibold">
            <li className="flex items-center gap-2 bg-white p-10 w-[32%] rounded-md  ">
            <PiMedalBold /> <span>100% гарантию оригинальной продукции</span> 
            </li>
            <li className="flex items-center gap-2 bg-white p-10 w-[32%] rounded-md">
            <TbTruckDelivery /> <span>Оперативную доставку по всей России</span>
            </li>
            <li className="flex items-center gap-2 bg-white p-10 w-[32%] rounded-md">
            <IoChatbubbleEllipsesOutline /> <span>Качественную клиентскую поддержку</span>
            </li>
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default About;
