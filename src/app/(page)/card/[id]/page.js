"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar, FaDownload } from "react-icons/fa"; // Icons for rating and download
import { CiShoppingTag } from "react-icons/ci"; // Icon for shopping tag
import axios from 'axios';
import Loading from '@/app/components/Loading/Loading';

const ProductItem = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/card/${id}`);
      if (response.status === 200) {
        setProduct(response.data);
      } else {
        setError('Product not found.');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product available.</div>;
  }

  return (
    <>
    <div className="flex flex-col md:flex-row bg-white p-5 rounded-lg shadow-lg w-full md:max-w-4xl mx-auto">
    {/* Product Image */}
    <div className="md:w-1/3 flex justify-center">
    <Image
          src={`http://localhost:5000/${product.image}`} // dynamically use product image
          alt={product.name}
          width={200}
          height={300}
          className="object-contain"
          />
      </div>
      
      {/* Product Details */}
      <div className="md:w-2/3 p-4 space-y-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      {/* Product Specs */}
      <div className="space-y-2">
      <p><strong>Артикул:</strong> {product.article}</p>
          <p><strong>Объем:</strong> {product.volume[0]} л</p>
          <p><strong>Бренд:</strong> {product.brand}</p>
          <p><strong>Страна производитель:</strong> {product.country}</p>
          <p><strong>Категория:</strong> <CiShoppingTag className="inline-block mr-1" /> {product.category}</p>
          </div>
          
          <div className="mt-4">
          <span className="font-bold text-lg">
          {product.price ? `${product.price} сум` : "- сум."}
          </span>
          </div>
          </div>
          
          </div>
          <p className="text-gray-700 text-xs sm:text-sm">
          {product.description}
        </p>
          </>
    
    
  );
};

export default ProductItem;
