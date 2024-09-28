"use client";

import { useEffect, useState } from 'react';

const Cattegory = () => {
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
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    // UseEffect to call fetchCategories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);


    if (loading) {
        return <div className="text-center">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-1/5 min-w-[200px]">
            <div className="w-full bg-[#E0111A] text-white flex items-center p-2">
                <img src='' alt="Menu" className="mr-2" />
                <p className="font-bold">Категории</p>
            </div>

            {/* Sidebar Categories List */}
            <ul className="w-full border border-gray-300">
                {categories.map((category) => (
                    <li
                        key={category._id}
                        className="border-b border-gray-300 p-2 hover:bg-gray-200 cursor-pointer"
                    >
                        {category.category_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cattegory;