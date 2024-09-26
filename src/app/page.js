import Image from "next/image";
import Navigation from "./components/Navigations/Header";
import Sidebar from "./components/Sidebar";

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

      </footer>
    </>
  );
}
