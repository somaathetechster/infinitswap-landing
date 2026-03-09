'use client';

import Protocol from '../../components/Protocol';
import { motion } from 'framer-motion';

const pillars = [
  {
    id: '01',
    title: 'Instant Verification',
    text: 'Transactions move through a confirmation-aware flow so payout only proceeds when the system has the right level of settlement confidence.',
    accent: 'bg-[#0827dc]',
  },
  {
    id: '02',
    title: 'Best-Rate Logic',
    text: 'The routing layer is designed to surface clear pricing and reduce unnecessary slippage, helping users move from quote to payout with better visibility.',
    accent: 'bg-[#fe009c]',
  },
  {
    id: '03',
    title: 'Regulated Rails',
    text: 'Risk checks, partner-led payment infrastructure, and jurisdiction-aware transaction logic help support a safer operational environment.',
    accent: 'bg-emerald-500',
  },
];

export default function ProtocolPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3efe8] pt-40 text-[#111111]">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%),radial-gradient(circle_at_56%_60%,rgba(8,39,220,0.05),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
      <div className="absolute left-0 right-0 top-[13%] h-px bg-black/8" />
      <div className="absolute left-0 right-0 bottom-[8%] h-px bg-black/8" />

      {/* Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#0827dc]">
                  Execution / the protocol
                </span>
              </div>

              <h1 className="leading-[0.82] tracking-[-0.08em] text-black">
                <span className="block text-[14vw] font-black uppercase md:text-[10vw] lg:text-[7.2vw]">
                  The Rules
                </span>
                <span className="block text-[14vw] font-black uppercase text-[#0827dc] md:text-[10vw] lg:text-[7.2vw]">
                  of Flow.
                </span>
              </h1>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <div className="max-w-md border-l-2 border-[#fe009c] pl-6">
              <p className="text-base leading-relaxed text-black/62 md:text-[1.08rem]">
                Infinitswap is designed around a structured orchestration model
                that translates user intent into a guided sequence of quoting,
                routing, confirmation, and payout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol component */}
      <div className="relative z-10 mt-14">
        <Protocol />
      </div>

      {/* Pillars / technical specs */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 xl:px-12">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-14 bg-[#0827dc]/30" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-black/42">
            Execution pillars
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-[1.9rem] border border-black/8 bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${pillar.accent}`} />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-black/34">
                  {pillar.id}
                </span>
              </div>

              <h2 className="mt-5 text-[1.7rem] font-semibold leading-[1] tracking-[-0.05em] text-black md:text-[2rem]">
                {pillar.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-black/60 md:text-base">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-black/8 pt-8 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/38">
            Protocol version / 4.0.2 secure
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/38">
            All nodes operational
          </span>
        </div>
      </section>
    </main>
  );
}