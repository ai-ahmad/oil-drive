"use client"

import React, { Suspense, useEffect } from "react";  // Добавляем импорт React
import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import News from "./components/News/News";
import Sidebar from "./components/SideBar/Sidebar";
import Baner from "./components/Banner/Baner";
import Loading from "./components/Loading/Loading";
import dynamic from "next/dynamic";
import HomeContent from "./components/HomeContent/HomeContent";
import Footer from "./components/Footer/Footer";
import ProductsOnSale from "./components/ProductSale/ProductSale";

export default function Home() {
 
  const Baner = dynamic(() => import("./components/Banner/Baner"),
    {
      ssr: false,
      loading: () => <Loading />,
    });
  const HomeContent = dynamic(() => import("./components/HomeContent/HomeContent"),
    {
      ssr: false,
      loading: () => <Loading />,
    });
 

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="flex container mx-auto">
        <aside>
          <Sidebar />
        </aside>
        <div className="flex-1">
          <Baner />
          <HomeContent />
          
          <News />
          <ProductsOnSale />
        </div>
      </main>

      <footer>
      <Footer/>
      </footer>
    </>
  );
}
