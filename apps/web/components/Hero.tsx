import { waLink, WA_PREFILL } from "../lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#6C3FE8]/15 blur-[120px]" />
      <div className="section-wrap relative flex min-h-[calc(100vh-72px)] flex-col justify-center py-24 md:py-32">
        <div className="hero-copy max-w-[900px]">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[.04] px-4 py-1.5 text-[13px] tracking-wide text-[#C9C9C9]">
            A conversational AI payment agent
          </span>
          <h1 className="display mt-8 text-[clamp(44px,8vw,96px)] font-extrabold leading-[0.98] tracking-[-.055em]">
            Money moves
            <br />
            when you say so.
          </h1>
          <p className="mt-8 max-w-[560px] text-[clamp(17px,2.2vw,21px)] leading-[1.55] text-[#9A9A9A]">
            Send money, pay a bill, or get paid — just by telling an AI what you want, in plain words, right inside WhatsApp.
          </p>
          <a
            href={waLink(WA_PREFILL.start)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#6C3FE8] px-9 py-4 font-display text-[17px] font-semibold text-white transition hover:bg-[#5A2FD6] focus:outline-none focus:ring-2 focus:ring-[#6C3FE8] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] sm:w-auto"
          >
            Start on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
