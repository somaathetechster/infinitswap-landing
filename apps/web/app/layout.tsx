import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jakarta = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-jakarta", display: "swap" });
const inter = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Infinitswap | Spend USDT & Stablecoins in Local Currencies Across Africa",
  description: "Spend USDT and stablecoins in local currencies on WhatsApp with Infinitswap. Convert crypto, make payments and move money across supported African markets without juggling multiple apps.",
  alternates: { canonical: "https://www.infinitswap.ai" },
  openGraph: { title: "Infinitswap | Spend USDT & Stablecoins Across Africa", description: "Spend USDT and stablecoins in local currencies on WhatsApp. Make payments and move money across supported African markets.", type: "website", url: "https://www.infinitswap.ai" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={jakarta.variable + " " + inter.variable}><body>{children}</body></html>;
}
