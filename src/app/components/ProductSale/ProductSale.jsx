'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductsOnSale = () => {
    const backgroundUrl = 'https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainOilBg.png&w=1920&q=95';
    const productImageUrl = 'https://ru.lukoil-shop.com/_next/image/?url=%2Fimages%2Fpng%2FmainOilOils2.png&w=640&q=75';

    return (
        <div
            className="relative w-full max-w-6xl h-[250px] md:h-[400px] flex items-center bg-cover bg-center mx-auto rounded-lg"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg" />

            {/* Text content (aligned to the left) */}
            <div className="relative z-10 text-left text-white px-6 sm:px-10 w-2/3">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">Нужна помощь в подборе?</h1>
                <p className="text-base sm:text-lg mb-6">
                    Если вы сомневаетесь, какое именно масло необходимо вашему автомобилю,
                    воспользуйтесь нашим подборщиком.
                </p>
                <Link href="/help-picker" passHref>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-semibold px-6 py-3 rounded-md transition duration-300">
                        Подобрать масло
                    </button>
                </Link>
            </div>

            {/* Product image (aligned to the right) */}
            <div className="relative z-10 w-1/3 flex justify-end pr-6 sm:pr-10">
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
