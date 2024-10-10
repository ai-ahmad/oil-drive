"use client"

import React, { useEffect, useState } from "react";  
import dynamic from "next/dynamic";
import News from "./components/News/News";
import ProductsOnSale from "./components/ProductSale/ProductSale";
import Loading from "./components/Loading/Loading";

const Sidebar = dynamic(() => import("./components/SideBar/Sidebar"), {
  ssr: true,
  loading: () => <div>
    <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
      </div>
      <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-[170px] w-[100%] flex gap-[20px] p-3">
          <div className="skeleton w-[49%] h-full"></div>
          <div className="sceleton w-[49%] h-full"></div>
        </div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
      </div>
      <div>
      {/* Popular Products */}
      <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="flex gap-2">
          <div className="skeleton w-[49%] h-[130px]"></div>
          <div className="skeleton w-[49%] h-[130px]"></div>
        </div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
      </div>

      {/* Advertisement */}
      <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-[170px] w-[100%]"></div>
      </div>

      {/* News */}
      <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
      </div>

      {/* Feedback */}
      <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-[50px] w-full"></div>
        <div className="skeleton h-[50px] w-full"></div>
      </div>

      {/* Statistics */}
      <div className="flex w-[250px] bg-base-200 rounded-xl p-4 flex-col gap-4">
        <div className="skeleton h-7 w-full"></div>
        <div className="skeleton h-7 w-full"></div>
      </div>
    </div>
    {/* <div className="max-w-[100%] flex justify-end"><div className="skeleton px-7 min-w-[100%] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] max-w-7xl overflow-hidden"></div></div>, */}
  </div>
});

const Baner = dynamic(() => import("./components/Banner/Baner"), {
  ssr: false,
  loading: () => <Loading/>
});

const HomeContent = dynamic(() => import("./components/HomeContent/HomeContent"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set that the component has mounted (client-side)

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth); // Set initial window width
      window.addEventListener("resize", handleResize);
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <main className="flex container mx-auto w-full">
        
        <div className="flex-1">
          <Baner />
          <HomeContent />
          <News />
          <ProductsOnSale />
        </div>
      </main>

    </>
  );
}