'use client';

export default function CompliancePage() {
  const pillars = [
    {
      title: 'Identity & Safety',
      text: 'Identity verification and transaction screening are handled through licensed partners and internal risk checks designed to support compliance requirements without creating unnecessary user friction.',
    },
    {
      title: 'Non-Custodial Design',
      text: 'Infinitswap is designed as an instruction-routing and orchestration layer. Users are guided through the flow while settlement and regulated payment handling sit with approved infrastructure partners.',
    },
    {
      title: 'Data Privacy',
      text: 'User communication and transaction data are treated with strict privacy controls. Encrypted messaging, secure internal transport layers, and controlled system access all support operational safety.',
    },
  ];

  const regulators = [
    { name: 'Central Bank of Nigeria', code: 'CBN' },
    { name: 'South African Reserve Bank', code: 'SARB' },
    { name: 'Bank of Ghana', code: 'BOG' },
    { name: 'Bank of Tanzania', code: 'BOT' },
  ];

  return (
    <main className="relative overflow-hidden bg-[#f3efe8] px-6 pb-24 pt-40 text-[#111111] md:px-10 xl:px-12">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%),radial-gradient(circle_at_56%_60%,rgba(8,39,220,0.05),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
      <div className="absolute left-0 right-0 top-[14%] h-px bg-black/8" />
      <div className="absolute left-0 right-0 bottom-[10%] h-px bg-black/8" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <section className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#0827dc]">
                Security / protocol
              </span>
            </div>

            <h1 className="leading-[0.84] tracking-[-0.08em] text-black">
              <span className="block text-[14vw] font-black uppercase md:text-[10vw] lg:text-[7vw]">
                Trust &
              </span>
              <span className="block text-[14vw] font-black uppercase text-[#0827dc] md:text-[10vw] lg:text-[7vw]">
                Compliance.
              </span>
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <div className="max-w-md border-l-2 border-[#fe009c] pl-6">
              <p className="text-base leading-relaxed text-black/62 md:text-[1.08rem]">
                A clearer view of how Infinitswap approaches regulatory structure,
                payment orchestration, user protection, and operational trust.
              </p>
            </div>
          </div>
        </section>

        {/* Main Framework */}
        <section className="mt-16 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-[2rem] border border-black/8 bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.30em] text-[#0827dc]">
              Regulatory framework
            </p>

            <div className="mt-6 space-y-6">
              <p className="max-w-2xl text-xl leading-snug tracking-[-0.03em] text-black/74 md:text-[1.8rem]">
                Infinitswap is positioned as a financial technology infrastructure
                and orchestration layer connecting digital asset flows to local
                payout rails.
              </p>

              <p className="max-w-2xl text-base leading-relaxed text-black/60">
                The product experience is designed to be direct for the user,
                while regulated monetary handling, settlement functions, and
                licensed payment operations are carried out through appropriate
                partner infrastructure rather than direct custody by the interface
                layer itself.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-black/8 bg-white p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-black/36">
                  Operating model
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/62">
                  Non-custodial interface design focused on routing, visibility,
                  and user-guided execution.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-black/8 bg-white p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-black/36">
                  Compliance posture
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/62">
                  Structured around partner-led regulated operations, monitoring,
                  and transaction governance.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[2rem] border border-black/8 bg-[#0827dc] p-7 text-white shadow-[0_26px_70px_rgba(8,39,220,0.22)] md:p-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.30em] text-white/64">
              Referenced regulators
            </p>

            <div className="mt-6 divide-y divide-white/10">
              {regulators.map((regulator) => (
                <div
                  key={regulator.code}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-lg font-medium tracking-[-0.03em] text-white/92">
                    {regulator.name}
                  </span>
                  <span className="rounded-full border border-white/12 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white/62">
                    {regulator.code}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/72">
              Regional financial and banking compliance expectations inform how
              partner rails and transaction pathways are structured across
              supported markets.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="mt-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-[#0827dc]/30" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-black/42">
              Safety pillars
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.8rem] border border-black/8 bg-[#fffdf8] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#0827dc]">
                  {pillar.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-black/62">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Inquiry CTA */}
        <section className="mt-16 rounded-[2rem] border border-black/8 bg-[#fffdf8] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.30em] text-black/38">
                Inquiries
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-black md:text-4xl">
                Regulatory and partnership contact
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black/62 md:text-base">
                For compliance-related communication, ecosystem partnerships, or
                formal due diligence requests, contact the compliance desk.
              </p>
            </div>

            <a
              href="mailto:compliance@infinitswap.ai"
              className="inline-flex items-center gap-3 rounded-full bg-[#0827dc] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <span>compliance@infinitswap.ai</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}