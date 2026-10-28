const capabilities: [string, string][] = [
  ["Send money", "To anyone, instantly. Name a person and an amount — the AI finds the account, confirms it, and moves the money."],
  ["Pay bills", "Airtime, electricity, subscriptions and more. Tell it what to settle and it takes care of the rest."],
  ["Receive money", "Get paid straight to your account. Share a simple request and the money lands where it should."],
];

export default function Features() {
  return (
    <section id="features" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="section-wrap">
        <h2 className="display max-w-[720px] text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-.05em] text-white">
          What you can do.
        </h2>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {capabilities.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-white/[.07] bg-white/[.02] p-8 transition hover:border-white/15">
              <h3 className="display text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-[#9A9A9A]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
