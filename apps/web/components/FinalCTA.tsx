import { waLink, WA_PREFILL } from "../lib/whatsapp";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C3FE8]/15 blur-[120px]" />
      <div className="section-wrap relative text-center">
        <h2 className="display mx-auto max-w-[760px] text-[clamp(36px,6vw,72px)] font-extrabold leading-[1] tracking-[-.055em] text-white">
          Ready when you are.
        </h2>
        <p className="mx-auto mt-6 max-w-[460px] text-[18px] leading-[1.55] text-[#9A9A9A]">
          Open a chat and tell it what you need. That&apos;s the whole thing.
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
    </section>
  );
}
