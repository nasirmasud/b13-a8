import { Inter, Montserrat } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SkillSphere | Home",
    template: "SkillSphere | %s",
  },
  description: "Modern Online Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      data-theme='light'
      className='h-full antialiased'
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} ${montserrat.variable} min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
