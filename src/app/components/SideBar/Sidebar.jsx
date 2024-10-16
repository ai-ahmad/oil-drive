"use client";
import React, { useState, useEffect } from 'react';
import Category from './Category';
import PopularProducts from './PopularProduct';
import Anons from './Anons';
import NewsList from './NewsList';
import Feedback from './Feedback';
import SidebarSkeleton from './SidebarSkeleton'; // Import the skeleton component

const Sidebar = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };
        
        fetchData();
    }, []);

    if (loading) {
        return <SidebarSkeleton />;
    }

    return (
        <aside className="flex flex-col gap-7 xl:max-w-[250px] md:max-w-[40%] w-full">
            <Category />
            <PopularProducts />
            <Anons />
            <NewsList />
            <Feedback />
        </aside>
    );
};

export default Sidebar;
