'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductsOnSale = () => {
    const backgroundUrl =
        'https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainOilBg.png&w=1920&q=95';
    const productImageUrl =
        'https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainOilOils2.png&w=640&q=75';

    return (
        <div
            className="relative container w-full flex flex-col-reverse md:flex-row items-center bg-cover bg-center mx-auto py-10 px-4 md:px-8 lg:px-16 rounded-lg"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg" />

            {/* Text content */}
            <div className="relative z-10 text-white text-center md:text-left md:w-1/2 lg:w-2/3 px-4 md:px-6 lg:px-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Нужна помощь в подборе?
                </h1>
                <p className="text-sm sm:text-base lg:text-lg mb-6">
                    Если вы сомневаетесь, какое именно масло необходимо вашему автомобилю,
                    воспользуйтесь нашим подборщиком.
                </p>
                <Link href="/help-picker" passHref>
                    <button className="bg-red-600 border-none hover:bg-red-700 text-white text-sm sm:text-base lg:text-lg font-semibold px-6 py-3 rounded-md transition duration-300">
                        Подобрать масло
                    </button>
                </Link>
            </div>

            {/* Product image */}
            <div className="relative z-10 w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-end mb-6 md:mb-0 pr-0 md:pr-6 lg:pr-10">
                <Image
                    src={productImageUrl}
                    alt="Oil products"
                    width={300}
                    height={300}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default ProductsOnSale;
