"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import News from "./components/News/News";
import HomeContent from "./components/HomeContent/HomeContent";
import Sidebar from "./components/SideBar/Sidebar";
import Baner from "./components/Banner/Baner";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1220) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="flex container mx-auto">
        {isVisible && (
          <aside>
            <Sidebar />
          </aside>
        )}
        <div className="flex-1">
          {isVisible && <Baner />}
          <HomeContent />
          <News />
        </div>
      </main>
    </>
  );
}