"use client";
import { useState } from "react";
const links = [["How it works", "how-it-works"], ["Features", "features"], ["Supported countries", "countries"], ["Trust & safety", "trust"]];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-[#e6def2] bg-[#F5F0FF]/95 backdrop-blur"><nav className="section-wrap flex h-[72px] items-center justify-between" aria-label="Main navigation">
    <a href="#top" className="display text-[21px] font-bold tracking-[-.04em] text-[#6C3FE8]">infinitswap<span className="text-[#FF6B6B]">.</span></a>
    <button className="rounded-lg p-2 text-[#0F0A1E] md:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span className="text-xl">☰</span></button>
    <div className={(open ? "flex " : "hidden ") + "absolute left-0 top-[72px] w-full flex-col gap-5 border-b border-[#e6def2] bg-[#F5F0FF] p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0"}>
      {links.map(([label, id]) => <a key={id} href={"#" + id} onClick={() => setOpen(false)} className="text-sm font-medium text-[#5A4E6E] transition hover:text-[#6C3FE8]">{label}</a>)}
      <a href="https://wa.me/" className="rounded-full bg-[#6C3FE8] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#5630c3] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2">Start using Infinitswap</a>
    </div>
  </nav></header>;
}
