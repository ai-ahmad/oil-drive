import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiOilLine } from "react-icons/ri";
import OilCategorySkeleton from "./OilCategorySkeleton";

const CardComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://oildrive-wtc-backend-1.onrender.com/api/v1/category/");
      setCategories(response.data); 
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch categories.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <OilCategorySkeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex gap-4 container justify-between flex-col md:flex-row text-md pt-5">
      {categories.map((category, index) => (
        <a
          href={category.route || "/"}
          key={index}
          className="p-6 rounded-md shadow-md cursor-pointer bg-white hover:bg-red-600 text-red-600 group transition duration-300 block"
        >
          <div className="flex items-center gap-2 group-hover:text-white">
            <RiOilLine className="text-red-600 group-hover:text-white transition duration-300" />
            <span className="text-black group-hover:text-white transition duration-300">
              {category.category_name || "Unnamed Category"}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CardComponent;
