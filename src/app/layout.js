// app/layout.js
import Navigation from "../app/components/Navigations/Header";
import Sidebar from "./components/SideBar/Sidebar";
import "./globals.css";

export const metadata = {
  title: "oiltradeuz ",
  description: "Это описание главной страницы вашего приложения.",
  keywords: "Next.js, SEO, оптимизация",
  robots: "index, follow",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com/',
    title: 'Пример веб-сайта',
    description: 'Описание страницы с SEO оптимизацией.',
    site_name: 'Пример сайта',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        {/* SEO-теги */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        {/* Open Graph для соцсетей */}
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />
      </head>
      <body className="antialiased">
        {/* Семантическая структура */}
        <header>
          <Navigation />
        </header>
        
        <div className="flex">
          <nav>
            {/* Sidebar будет отображаться на всех страницах */}
            <Sidebar />
          </nav>
          
          <main className="flex-grow">
            {/* Основной контент страницы */}
            {children}
          </main>
        </div>

        <footer>
          {/* Футер для всех страниц */}
        </footer>
      </body>
    </html>
  );
}
