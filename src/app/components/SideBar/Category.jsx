"use client";

import { useEffect, useState } from 'react';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/category/');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const handleCategoryClick = (categoryName) => {
        localStorage.setItem('category', categoryName);  // Update category in localStorage
        window.dispatchEvent(new Event("storage"));  // Force dispatch of the storage event in the same tab
    }; 
    
    if (loading) {
        return <div className="text-center">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-1/5 lg:min-w-[200px] bg-white lg:bg-transparent h-screen min-w-[70%]">
            <div className="w-full bg-[#E0111A] text-white flex items-center p-2">
                <p className="font-bold py-5 lg:py-0">Категории</p>
            </div>

            <ul className="w-full border border-gray-300">
                {categories.map((category) => (
                    <li
                        onClick={() => handleCategoryClick(category.category_name)}
                        key={category._id}
                        className="border-b border-gray-300 px-2 lg:p-2 py-4  hover:bg-gray-200 cursor-pointer"
                    >
                        {category.category_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
