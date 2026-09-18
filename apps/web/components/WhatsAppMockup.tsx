type Message = { side: "left" | "right"; text: string; time?: string; action?: boolean };

const cashOut: Message[] = [
  { side: "left", text: "Hello. What would you like to convert today?", time: "10:41" },
  { side: "right", text: "I want to cash out 500 USDT to naira", time: "10:41" },
  { side: "left", text: "Your live quote is ready. Estimated payout calculated.", time: "10:41" },
  { side: "right", text: "Proceed with the transaction.", time: "10:42", action: true },
  { side: "left", text: "Confirmed. Your payout is on the way. 🎉", time: "10:42" },
];

export default function WhatsAppMockup({ messages = cashOut }: { messages?: Message[] }) {
  return <div className="phone-frame" aria-label="Authentic WhatsApp conversation with Infinitswap">
    <div className="phone-notch" />
    <div className="wa-header"><span className="text-xl leading-none">‹</span><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6C3FE8] text-sm font-bold">i</div><div className="min-w-0"><div className="flex items-center gap-1 text-[15px] font-semibold">Infinitswap <span className="text-[#53BDEB]">●</span></div><div className="text-xs text-[#53BDEB]">Verified assistant <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#22C55E]" /></div></div><div className="ml-auto flex gap-3 text-lg">⌕ ⋮</div></div>
    <div className="wa-chat"><div className="rate-card"><div className="flex items-center justify-between text-[9px] tracking-[.12em] text-[#8696A0]"><span>Live payout estimate</span><b className="rounded bg-[#22C55E] px-2 py-0.5 text-[9px] tracking-normal text-white">Locked</b></div><div className="mt-1 font-display text-[26px] font-bold text-white">₦760,000</div><div className="text-[10px] text-[#8696A0]">Rate locked for 2 minutes</div></div>{messages.map((message, index) => <div key={index} className={(message.side === "right" ? "wa-row justify-end" : "wa-row justify-start")}><div className={("wa-bubble " + (message.side === "right" ? "wa-user" : "wa-bot") + (message.action ? " wa-action" : ""))}>{message.text}<div className="wa-time">{message.time}{message.side === "right" && <span className="ml-1 text-[#53BDEB]">✓✓</span>}</div></div></div>)}<span className="wa-confirm">✓ Transaction confirmed</span></div>
    <div className="wa-input"><div className="flex-1 rounded-full bg-[#2A3942] px-4 py-2 text-[13px] text-[#8696A0]">Message</div><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00A884] text-white">➤</div></div>
  </div>;
}
