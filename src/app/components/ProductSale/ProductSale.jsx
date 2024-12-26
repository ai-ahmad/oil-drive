'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NewsSkeleton from '../News/NewsSkeleton';

const ProductsOnSale = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const staticProducts = [
        {
            _id: '1',
            name: 'Product 1',
            price: '5000',
            discount_price: '4500',
            image: "https://oiltrade.uz/uploads/posts/2020-04/thumbs/1586776431_11111111.png"
        },
        {
            _id: '2',
            name: 'Product 2',
            price: '6000',
            discount_price: '5500',
            image: "https://oiltrade.uz/uploads/posts/2020-02/thumbs/1582977572_gnv-universal-key-wd-40.jpg"
        },
        {
            _id: '3',
            name: 'Product 3',
            price: '7000',
            discount_price: '6500',
            image: "https://oiltrade.uz/uploads/posts/2020-03/medium/1584173089_img_20200310_140130-removebg-kopija.png"
        },
        {
            _id: '4',
            name: 'Product 4',
            price: '8000',
            discount_price: '7500',
            image: "https://oiltrade.uz/uploads/posts/2020-04/thumbs/1586776431_11111111.png"
        },
        // Add more products as needed
    ];

    useEffect(() => {
        // Simulate loading and setting products
        setTimeout(() => {
            const productsOnSale = staticProducts.map(product => {
                // Ensure image is always in array form
                if (typeof product.image === 'string') {
                    product.image = { main_images: [product.image] };
                }
                return product;
            }).filter(product => product.discount_price);
            setProducts(productsOnSale);
            setLoading(false);
        }, 1000); // Simulate a delay for loading
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto py-4 w-full">
                <div className="border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6 rounded-lg">
                    <h2 className="text-black text-2xl font-montserrat mb-4">Новости:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <NewsSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-4">
            <div className="relative border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6 rounded-lg">
                <h2 className="text-black text-2xl font-semibold mb-4">Товары на акции:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {staticProducts.map((product) => (
                        <Link href={`/productSale/${product._id}`} key={product._id} passHref>
                            <div className="group border border-gray-300 bg-white shadow-md transition-transform duration-300 flex flex-col p-4 mb-6 hover:scale-105 hover:shadow-2xl rounded-md">
                                <h1 className="ml-2 s-discount bg-[#FF8E0D] text-white text-center text-sm py-1 mb-2 w-20">
                                    Скидка
                                </h1>
                                <div className="overflow-hidden rounded-md mb-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-2 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                                    <p className="text-gray-500">
                                        {product.discount_price ? (
                                            <span className="font-bold text-xl text-[#FF4C29]">{product.discount_price} сум</span>
                                        ) : (
                                            <span>{product.price} сум</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsOnSale;
