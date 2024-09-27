import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import Sidebar from "./components/Sidebar";
import HomeContent from "./components/HomeContent/HomeContent";

export default function Home() {
  return (
    <>
  
        <Navigation />


      <main>
        <Sidebar />
        <HomeContent/>
      </main>

      <footer>

      </footer>
    </>
  );
}
