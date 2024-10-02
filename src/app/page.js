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

      <main className="flex">
        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>
        <div className="flex-1">
          <HomeContent />
          <News />
        </div>
      </main>
    </>
  );
}
