"use client";

import React, { Suspense, useEffect, useState } from "react";  
import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import News from "./components/News/News";
import Sidebar from "./components/SideBar/Sidebar";
import Loading from "./components/Loading/Loading";
import dynamic from "next/dynamic";
import Footer from "./components/Footer/Footer";
import ProductsOnSale from "./components/ProductSale/ProductSale";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  const Baner = dynamic(() => import("./components/Banner/Baner"), {
    ssr: false,
    loading: () => <Loading />,
  });
  
  const HomeContent = dynamic(() => import("./components/HomeContent/HomeContent"), {
    ssr: false,
    loading: () => <Loading />,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="flex container mx-auto">
        {windowWidth >= 1220 && (
          <aside className="mt-6">
            <Sidebar />
          </aside>
        )}
        <div className="flex-1">
          {windowWidth >= 1220 && <Baner />}
          <HomeContent />
          <News />
          <ProductsOnSale />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
