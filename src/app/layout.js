
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
  title: "OilTrade.Uz",
  description: `Oil" "Delkor "Башнефть", "Роснефть", "Q8oils", "ТАТНЕФТЬ". Работая с нами ... Моторное масло 10w40 Multigaz GNV OIL`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-nato`}
      >
        {children}
      </body>
    </html>
  );
}
