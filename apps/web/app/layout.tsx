import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "../components/SmoothScroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalFooter from "../components/LegalFooter";

export const metadata: Metadata = {
  title: "Infinitswap | Crypto to Cash. In Your Chats.",
  description: "Turn your USDT into local currency instantly. No apps, no complex exchanges—just send a WhatsApp message and get paid directly to your bank account.",
  keywords: ["Sell USDT", "Crypto to Naira", "WhatsApp Bot", "Infinitswap", "Crypto to Fiat", "Africa Crypto"],
  authors: [{ name: "Infinitswap" }],
  openGraph: {
    title: "Infinitswap | Seamless Crypto-to-Cash",
    description: "Send crypto, get cash. The fastest way to turn your digital assets into local fiat across Africa.",
    type: "website",
    siteName: "Infinitswap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinitswap | Crypto to Cash",
    description: "Turn your USDT into local currency instantly via WhatsApp.",
  }
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
            <LegalFooter /> 
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}