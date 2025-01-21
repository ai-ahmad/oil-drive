"use client"

import React, { useEffect, useState } from "react";  
import dynamic from "next/dynamic";
import News from "./components/News/News";
import ProductsOnSale from "./components/ProductSale/ProductSale";
import BannerSkeleton from "./components/Banner/BannerSkeleton";
import HomeContent from "./components/HomeContent/HomeContent";
import About from "./components/About/About";
import AbouUs from "./components/AboutUs/AbouUs";
import OilCategory from "./components/OilCategory/OilCategory";
import Statya from "./components/Statya/Statya";

const Banner = dynamic(() => import("./components/Banner/Baner"), {
  ssr: false,
  loading: () => <BannerSkeleton/>
});

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col w-full">
          <Banner />
          <OilCategory/>
          <HomeContent />
          <Statya />
          <ProductsOnSale />
          <News />
          <About />
          <AbouUs />
      </main>

    </>
  );
}