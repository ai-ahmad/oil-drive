import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../Loading/Loading';

const ProductsOnSale = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/card');
                const data = await response.json();
                const productsOnSale = data.filter(product => product.discount_price);
                setProducts(productsOnSale);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="relative border border-gray-300 bg-white shadow-lg w-full max-w-screen-xl p-6">
                <h2 className="text-black text-2xl font-semibold mb-4">Товары на акции:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <Link href={`/productSale/${product._id}`} key={product._id} passHref>
                            <div className="border border-gray-300 bg-white shadow-lg transition-transform duration-200 flex flex-col p-4 mb-4 hover:scale-105 hover:shadow-2xl">
                                <h1 className="ml-2 s-discount bg-[#FF8E0D] text-white text-center text-sm py-1 mb-2 w-20">Скидка</h1>
                                <img
                                    src={`http://localhost:5000/${product.image[0]}`}
                                    alt={product.name}
                                    className="gap-2 w-full h-[120px] object-cover mb-2"
                                />
                                <div className="p-2 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
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
