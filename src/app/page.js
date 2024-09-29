import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import Sidebar from "./components/Sidebar";
import News from "./components/News/News";

export default function Home() {
  return (
    <>
      <header>
        <Navigation />
      </header>


      <main>
        <Sidebar />
      </main>

      <footer>
        <News />
      </footer>
    </>
  );
}
