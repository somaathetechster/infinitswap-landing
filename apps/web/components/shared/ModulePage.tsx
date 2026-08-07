'use client';

import { motion } from 'framer-motion';
import StepCard, { type StepItem } from './StepCard';
import GrainTexture from './GrainTexture';

export type ModulePageProps = {
  /** Monospace eyebrow, e.g. "Savings / module 02" */
  eyebrow: string;
  /** Two-tone h1: line one in ink, line two in blue. */
  titleTop: string;
  titleBottom: string;
  /** Standfirst in the right-hand column, against the magenta rule. */
  intro: string;
  /** The numbered cards — same visual contract as the /protocol flow. */
  items: StepItem[];
  /** Card footer copy, e.g. "Savings module" / "Plan active". */
  cardFooterLabel: string;
  cardStatusLabel: string;
  /** Fact rail below the cards. */
  facts: { label: string; value: string }[];
  /** wa.me deep link with the module's own prefill. */
  ctaHref: string;
  ctaLabel: string;
  ctaNote: string;
  /** System-status strip at the very bottom. */
  statusLeft: string;
  statusRight: string;
};

/**
 * Page shell shared by /savings, /pay and /rewards.
 *
 * Mirrors the /protocol page chrome exactly — parchment gradient, technical
 * grid, margin rules, stacked display h1 — so the new module pages read as the
 * same system rather than as bolted-on subpages.
 */
export default function ModulePage({
  eyebrow,
  titleTop,
  titleBottom,
  intro,
  items,
  cardFooterLabel,
  cardStatusLabel,
  facts,
  ctaHref,
  ctaLabel,
  ctaNote,
  statusLeft,
  statusRight,
}: ModulePageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3efe8] pt-40 text-[#111111]">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%),radial-gradient(circle_at_56%_60%,rgba(8,39,220,0.05),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
      <GrainTexture />

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
                  {eyebrow}
                </span>
              </div>

              <h1 className="leading-[0.82] tracking-[-0.08em] text-black">
                <span className="block text-[13vw] font-black uppercase md:text-[9vw] lg:text-[6.4vw]">
                  {titleTop}
                </span>
                <span className="block text-[13vw] font-black uppercase text-[#0827dc] md:text-[9vw] lg:text-[6.4vw]">
                  {titleBottom}
                </span>
              </h1>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <div className="max-w-md border-l-2 border-[#fe009c] pl-6">
              <p className="text-base leading-relaxed text-black/62 md:text-[1.08rem]">
                {intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbered cards */}
      <section className="relative z-10 mx-auto mt-16 max-w-7xl px-6 md:px-10 xl:px-12">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              /* An odd card count leaves a hole; the last one spans instead. */
              className={
                items.length % 2 === 1 && index === items.length - 1
                  ? 'md:col-span-2'
                  : ''
              }
            >
              <StepCard
                item={item}
                index={index}
                active={index === 0}
                footerLabel={cardFooterLabel}
                statusLabel={cardStatusLabel}
                stackTitle={false}
                microCase="as-is"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Fact rail */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-10 xl:px-12">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-14 bg-[#0827dc]/30" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-black/42">
            At a glance
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {facts.map((fact) => (
            <article
              key={fact.label}
              className="rounded-[1.9rem] border border-black/8 bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/34">
                {fact.label}
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug tracking-[-0.03em] text-black/80">
                {fact.value}
              </p>
            </article>
          ))}
        </div>

        {/* CTA — the wa.me pattern, prefilled for this module */}
        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <motion.a
            href={ctaHref}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.985 }}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0827dc] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-white shadow-[0_24px_80px_rgba(8,39,220,0.28)] transition-all"
          >
            <span>{ctaLabel}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>

          <p className="text-sm text-black/42">{ctaNote}</p>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-black/8 pt-8 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/38">
            {statusLeft}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/38">
            {statusRight}
          </span>
        </div>
      </section>
    </main>
  );
}
