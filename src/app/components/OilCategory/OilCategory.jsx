
import React from "react";


const cards = [
  { label: "Моторные масла", route: "/" },
  { label: "Трансмиссионные масла", route: "/" },
  { label: "Охлаждающие жидкости", route: "/" },
  { label: "Тормозные жидкости", route: "/" },
];

const CardComponent = () => {
  return (
    <div className="flex gap-4 container justify-between text-md pt-5">
      {cards.map((card, index) => (
          <a href={card.route} key={index}
            className="p-6 rounded-md shadow-md cursor-pointer bg-white hover:bg-red-600 hover:text-white transition duration-300 block"
          >
            <div className="flex items-center gap-2">
              <span className="icon-placeholder" /> {/* Replace with your actual icon */}
              <span>{card.label}</span>
            </div>
          </a>
      ))}
    </div>
  );
};

export default CardComponent;
