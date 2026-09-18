"use client";
import { useState } from "react";
import WhatsAppMockup from "./WhatsAppMockup";

const demos: [string, string, string][] = [
  ["Bill payment", "Set my DSTV to autopay in Naira every month", "Done. DSTV autopay activated. ₦22,500 on the 1st of each month. ✓"],
  ["Cash out", "Cash out 200 USDT to my bank", "₦152,000 sent to your GTBank account. ✓"],
  ["Send money", "Pay Chidi ₦15,000 for the design work", "Chidi has been paid. Receipt sent. ✓"],
  ["Airtime & data", "Buy ₦2,000 airtime for 08012345678", "Airtime sent to 08012345678. ✓"],
];

export default function ChatDemo() {
  const [active, setActive] = useState(0);
  const selected = demos[active] ?? demos[0]!;
  return <section className="bg-[#1A1033] py-24 text-white md:py-28"><div className="section-wrap"><div className="mx-auto max-w-[700px] text-center"><h2 className="display text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-[-.05em]">Money should fit into your everyday life.</h2><p className="mt-5 text-lg text-[#B8AACC]">See what you can do in one chat.</p></div><div className="mt-16 grid items-center gap-14 lg:grid-cols-[55%_45%]"><div className="flex justify-center lg:justify-start"><WhatsAppMockup messages={[{ side: "right", text: selected[1], time: "10:41" }, { side: "left", text: selected[2], time: "10:42" }]} /></div><div className="space-y-2">{demos.map(([label, request, response], index) => <button key={label} onClick={() => setActive(index)} className={("block w-full border-l-[3px] p-5 text-left transition " + (index === active ? "rounded-r-lg border-[#6C3FE8] bg-[#6C3FE8]/10" : "border-transparent"))}><span className={("font-display text-lg font-semibold " + (index === active ? "text-white" : "text-[#B8AACC]"))}>{label}</span><span className={("mt-2 block text-sm leading-6 " + (index === active ? "text-[#B8AACC]" : "text-[#B8AACC]/50"))}>{request}</span>{index === active && <span className="mt-2 block text-sm leading-6 text-[#22C55E]">{response}</span>}</button>)}</div></div></div></section>;
}
