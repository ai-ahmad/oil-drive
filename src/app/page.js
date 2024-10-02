"use client"

import { useEffect } from "react";
import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import News from "./components/News/News";
import HomeContent from "./components/HomeContent/HomeContent";
import Sidebar from "./components/SideBar/Sidebar";

export default function Home() {

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
          <HomeContent />
          <News />
        </div>
      </main>
    </>
  );
}
