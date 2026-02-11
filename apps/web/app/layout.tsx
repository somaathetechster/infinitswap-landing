import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "../components/SmoothScroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalFooter from "../components/LegalFooter"; // 1. Import the LegalFooter

export const metadata: Metadata = {
  title: "Infinitswap | Institutional Liquidity Orchestration",
  description: "The world-standard conversational engine for Pan-African crypto-to-fiat settlement. Regulated rails. Institutional spreads.",
  keywords: ["Fintech", "Liquidity", "Crypto-to-fiat", "WhatsApp Bot", "Pan-African Finance"],
  authors: [{ name: "Infinitswap Technology Group" }],
  openGraph: {
    title: "Infinitswap | Financial Intelligence",
    description: "Architecting the last mile of Pan-African commerce.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e2dac7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-infinite-magenta selection:text-white scroll-smooth">
      <body className="antialiased bg-parchment text-ink-black min-h-screen">
        {/* THE DRAFTING FOUNDATION */}
        <div className="technical-grid fixed inset-0 pointer-events-none z-0" />

        <SmoothScroll>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              {children}
            </main>

            <Footer />
            {/* 2. Place LegalFooter here to ensure it's part of the scroll flow */}
            <LegalFooter /> 
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}