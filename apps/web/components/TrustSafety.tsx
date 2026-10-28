const points: [string, string][] = [
  ["Conversations are encrypted end to end", "Your messages with the AI stay between you and Infinitswap. Nothing in the chat is readable in transit."],
  ["Every transaction is confirmed before it runs", "The AI always restates the recipient, the amount and the details, and waits for your yes. Nothing moves until you approve it."],
  ["Regulated payment infrastructure underneath", "Money is settled through licensed payment providers in each market. The conversation is the interface; the plumbing is regulated."],
];

export default function TrustSafety() {
  return (
    <section id="trust" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="section-wrap">
        <h2 className="display max-w-[640px] text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-.05em] text-white">
          Built to be trusted.
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {points.map(([title, text], i) => (
            <article key={title} className="border-t border-white/[.1] pt-6">
              <span className="display text-sm font-bold tracking-[.15em] text-[#6C3FE8]">0{i + 1}</span>
              <h3 className="display mt-4 text-xl font-semibold leading-snug text-white">{title}</h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#9A9A9A]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
