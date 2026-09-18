import type { ReactNode } from "react";

export type ChatMessage = { side: "left" | "right"; text: ReactNode; time?: string; action?: boolean };

interface WhatsAppMockupProps {
  tilt?: boolean;
  glowIntensity?: "high" | "medium";
  children: ReactNode;
}

export default function WhatsAppMockup({ tilt = false, glowIntensity = "medium", children }: WhatsAppMockupProps) {
  return <div className={("phone-frame " + (tilt ? "phone-tilted " : "phone-straight ") + (glowIntensity === "high" ? "phone-glow-high" : "phone-glow-medium"))} aria-label="Authentic WhatsApp conversation with Infinitswap">
    <div className="phone-notch" />
    <div className="phone-status"><span>10:41</span><span className="flex items-center gap-2" aria-hidden="true"><span>▮▮▮</span><span>⌁</span><span>▰</span></span></div>
    <div className="wa-header"><span className="text-2xl leading-none">‹</span><div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6C3FE8] to-[#4A2DB0] text-[15px] font-bold">i</div><div className="min-w-0"><div className="flex items-center gap-1 text-[15px] font-semibold text-[#E9EDEF]">Infinitswap <span className="text-[#53BDEB]">●</span></div><div className="flex items-center gap-1 text-xs text-[#53BDEB]"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />Verified assistant</div></div><div className="ml-auto flex gap-3 text-lg text-white" aria-hidden="true">⌕ ♡ ⋮</div></div>
    <div className="wa-chat">{children}</div>
    <div className="wa-input"><span className="text-lg text-[#8696A0]" aria-hidden="true">☺</span><div className="flex-1 rounded-full bg-[#2A3942] px-4 py-2 text-[13px] text-[#8696A0]">Message</div><span className="text-lg text-[#8696A0]" aria-hidden="true">⌁</span></div>
  </div>;
}
