import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, El_Messiri, Vazirmatn } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toast } from "@/components/layout/toast";
import { cn } from "@/lib/utils";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  variable: "--font-messiri",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AURA | آئورا",
    template: "%s | آئورا",
  },
  description:
    "آئورا؛ برندی معاصر برای زن امروز. لباس‌هایی با خط‌های پاک، پارچه‌های لطیف و رنگی آرام.",
  keywords: ["پوشاک زنانه", "آئورا", "فروشگاه لباس", "مدرن", "پیراهن", "کت و مانتو"],
};

export const viewport: Viewport = {
  themeColor: "#F8F6F2",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn(vazirmatn.variable, elMessiri.variable, cormorant.variable)}
    >
      <body className="min-h-dvh flex flex-col bg-cream font-sans text-ink antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
