import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jakarta = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-jakarta", display: "swap" });
const inter = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Infinitswap | Payments, done in a conversation",
  description: "Send money, pay bills and get paid by telling an AI what you want — in plain words, right inside WhatsApp. No app, no dashboard, no forms. Available across seven markets in Africa.",
  alternates: { canonical: "https://www.infinitswap.ai" },
  openGraph: { title: "Infinitswap | Payments, done in a conversation", description: "An AI payment agent that moves money when you say so — send, pay bills and get paid through a WhatsApp conversation, across seven African markets.", type: "website", url: "https://www.infinitswap.ai" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={jakarta.variable + " " + inter.variable}><body>{children}</body></html>;
}
