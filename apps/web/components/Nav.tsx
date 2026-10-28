"use client";
import { useEffect, useState } from "react";
import { waLink, WA_PREFILL } from "../lib/whatsapp";

const links: [string, string][] = [
  ["How it works", "how-it-works"],
  ["What you can do", "features"],
  ["Why conversation", "why"],
  ["Available in", "countries"],
  ["Trust", "trust"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"sticky top-0 z-50 bg-[#0A0A0A] text-white transition " + (scrolled ? "border-b border-white/[.08]" : "border-b border-transparent")}>
      <nav className="section-wrap flex h-[72px] items-center justify-between" aria-label="Main navigation">
        <a href="#top" className="font-display text-[21px] font-bold tracking-[-.04em]">infinitswap<span className="text-[#6C3FE8]">.</span></a>
        <button className="rounded-lg p-2 md:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span className="text-xl">☰</span></button>
        <div className={(open ? "flex " : "hidden ") + "fixed inset-x-0 top-[72px] min-h-[calc(100vh-72px)] w-full flex-col gap-6 bg-[#0A0A0A] p-8 md:static md:flex md:min-h-0 md:w-auto md:flex-row md:items-center md:gap-8 md:p-0"}>
          {links.map(([label, id]) => (
            <a key={id} href={"#" + id} onClick={() => setOpen(false)} className="text-sm font-medium text-[#9A9A9A] transition hover:text-white">{label}</a>
          ))}
          <a href={waLink(WA_PREFILL.start)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#6C3FE8] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#5A2FD6] focus:outline-none focus:ring-2 focus:ring-[#6C3FE8] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]">Start on WhatsApp</a>
        </div>
      </nav>
    </header>
  );
}
