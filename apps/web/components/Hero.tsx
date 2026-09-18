import WhatsAppMockup from "./WhatsAppMockup";

export default function Hero() {
  return <section className="relative overflow-hidden bg-[#0F0A1E] text-white">
    <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#6C3FE8]/20 blur-3xl" />
    <div className="section-wrap relative grid min-h-[calc(100vh-72px)] items-center gap-12 py-16 md:grid-cols-[55%_45%] md:py-20">
      <div className="hero-copy"><span className="inline-flex rounded-full border border-[#6C3FE8]/40 bg-[#6C3FE8]/15 px-4 py-1.5 text-[13px] text-[#E8E0F7]">WhatsApp · AI · Africa</span><h1 className="display mt-7 max-w-[620px] text-[clamp(40px,6vw,80px)] font-extrabold leading-[1.04] tracking-[-.065em]">Spend your stablecoins like everyday money</h1><p className="mt-7 max-w-[480px] text-[18px] leading-[1.6] text-[#B8AACC]">Pay in your local currency, buy airtime and data, pay bills and utilities — all through WhatsApp. No complicated apps. No unnecessary middlemen.</p><p className="mt-5 text-sm text-[#B8AACC]/60">Powered by AI, designed for everyday payments.</p><div className="mt-8 flex flex-wrap items-center gap-5"><a href="https://wa.me/" className="rounded-full bg-[#6C3FE8] px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4A2DB0] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#0F0A1E]">Start using Infinitswap</a><a href="#how-it-works" className="text-[15px] text-[#B8AACC] transition hover:text-white">See how it works ↓</a></div></div>
      <div className="hero-phone flex justify-center md:justify-end"><WhatsAppMockup /></div>
    </div>
  </section>;
}
