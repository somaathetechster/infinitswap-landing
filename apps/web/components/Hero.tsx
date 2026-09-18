"use client";
import { useEffect, useState } from "react";
import WhatsAppMockup from "./WhatsAppMockup";

function Bubble({ side, children, time, action = false }: { side: "left" | "right"; children: React.ReactNode; time: string; action?: boolean }) {
  return <div className={(side === "right" ? "wa-row justify-end" : "wa-row justify-start")}><div className={("wa-bubble " + (side === "right" ? "wa-user" : "wa-bot") + (action ? " wa-action" : ""))}>{children}<div className="wa-time">{time}{side === "right" && <span className="ml-1 text-[#53BDEB]">✓✓</span>}</div></div></div>;
}

function Typing() { return <div className="typing-indicator" aria-label="Infinitswap is typing"><span /><span /><span /></div>; }

function AnimatedCashOut() {
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(120);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setStep(6); setSeconds(120); return; }
    let cancelled = false;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      if (cancelled) return;
      setStep(0); setSeconds(120);
      timers = [
        setTimeout(() => setStep(1), 2000),
        setTimeout(() => setStep(2), 3200),
        setTimeout(() => setStep(3), 4200),
        setTimeout(() => setStep(4), 6500),
        setTimeout(() => setStep(5), 7700),
        setTimeout(() => setStep(6), 9000),
        setTimeout(() => setStep(7), 13000),
        setTimeout(() => { setStep(0); run(); }, 13600),
      ];
    };
    run();
    const countdown = window.setInterval(() => setSeconds((current) => current <= 0 ? 120 : current - 1), 1000);
    return () => { cancelled = true; timers.forEach(clearTimeout); window.clearInterval(countdown); };
  }, []);
  const countdown = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const fading = step === 7;
  return <WhatsAppMockup tilt glowIntensity="high"><div className={("demo-chat-content " + (fading ? "demo-chat-fade" : ""))}><div className="rate-card"><div className="flex items-center justify-between text-[9px] font-medium tracking-[.18em] text-[#8696A0]"><span>Live payout estimate</span><b className="rounded bg-[#22C55E] px-2 py-0.5 text-[9px] tracking-normal text-white">Locked</b></div><div className="mt-1 font-display text-[30px] font-extrabold text-white">₦760,000</div><div className="text-[11px] text-[#8696A0]">Rate: ₦1,520 per USDT · Valid for {countdown}</div></div><Bubble side="left" time="10:41">Hello. What would you like to do today?</Bubble>{step >= 1 && <Bubble side="right" time="10:41">I want to cash out 500 USDT to naira</Bubble>}{step === 2 || step === 5 ? <Typing /> : null}{step >= 3 && <Bubble side="left" time="10:41">Your live quote is ready.<br /><strong className="text-[15px]">₦760,000 locked for 2 minutes.</strong></Bubble>}{step >= 4 && <Bubble side="right" action time="10:42">Proceed with the transaction.</Bubble>}{step >= 6 && <><Bubble side="left" time="10:42">Confirmed. Your payout is on the way. 🎉</Bubble><span className="wa-confirm"><span className="h-2 w-2 rounded-full bg-[#22C55E]" />Transaction confirmed</span></>}</div></WhatsAppMockup>;
}

export default function Hero() {
  return <section className="relative overflow-hidden bg-[#0F0A1E] text-white"><div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#6C3FE8]/20 blur-3xl" /><div className="section-wrap relative grid min-h-[calc(100vh-72px)] items-center gap-12 py-16 md:grid-cols-[40%_60%] md:py-20"><div className="hero-copy"><span className="inline-flex rounded-full border border-[#6C3FE8]/40 bg-[#6C3FE8]/15 px-4 py-1.5 text-[13px] text-[#E8E0F7]">WhatsApp · AI · Africa</span><h1 className="display mt-7 max-w-[620px] text-[clamp(40px,6vw,80px)] font-extrabold leading-[1.04] tracking-[-.065em]">Spend your stablecoins like everyday money</h1><p className="mt-7 max-w-[480px] text-[18px] leading-[1.6] text-[#B8AACC]">Pay in your local currency, buy airtime and data, pay bills and utilities — all through WhatsApp. No complicated apps. No unnecessary middlemen.</p><div className="mt-12 border-t border-white/10 pt-8"><h2 className="display text-[clamp(36px,4vw,56px)] font-extrabold leading-tight tracking-[-.05em]">Watch it happen.</h2><p className="mt-4 text-lg text-[#B8AACC]">500 USDT. Converted. Sent to your bank. Done in one chat.</p><div className="mt-8 flex items-start"><div><strong className="display text-[28px] font-bold">₦760,000</strong><span className="block text-[13px] text-[#B8AACC]">Locked rate</span></div><div className="mx-5 h-14 w-px bg-white/10" /><div><strong className="display text-[28px] font-bold">2 min</strong><span className="block text-[13px] text-[#B8AACC]">To confirm</span></div><div className="mx-5 h-14 w-px bg-white/10" /><div><strong className="display text-[28px] font-bold">0 apps</strong><span className="block text-[13px] text-[#B8AACC]">To download</span></div></div></div></div><div className="hero-phone flex justify-center md:justify-end"><AnimatedCashOut /></div></div></section>;
}
