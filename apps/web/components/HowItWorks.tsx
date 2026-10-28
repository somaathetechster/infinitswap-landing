const steps: [string, string, string, "right" | "left"][] = [
  ["01", "You say what you want", "Send ₦5,000 to Amaka for lunch", "right"],
  ["02", "It confirms the details", "Sending ₦5,000 to Amaka Obi — Access Bank, 0123. Go ahead?", "left"],
  ["03", "It's done", "Sent. Amaka has the money. Receipt saved to this chat.", "left"],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="section-wrap">
        <h2 className="display max-w-[760px] text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-.05em] text-white">
          Three messages. Done.
        </h2>
        <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-[#9A9A9A]">
          No forms, no menus. You type like you&apos;re texting a friend, and the AI handles intent, validation and execution.
        </p>
        <ol className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map(([number, title, line, side]) => (
            <li key={number} className="rounded-3xl border border-white/[.07] bg-white/[.02] p-7">
              <div className="flex items-center gap-3">
                <span className="display text-sm font-bold tracking-[.15em] text-[#6C3FE8]">{number}</span>
                <h3 className="display text-lg font-semibold text-white">{title}</h3>
              </div>
              <div className={"mt-6 flex " + (side === "right" ? "justify-end" : "justify-start")}>
                <p
                  className={
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] leading-[1.45] " +
                    (side === "right"
                      ? "rounded-tr-sm bg-[#005C4B] text-[#E9EDEF]"
                      : "rounded-tl-sm bg-[#202C33] text-[#E9EDEF]")
                  }
                >
                  {line}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
