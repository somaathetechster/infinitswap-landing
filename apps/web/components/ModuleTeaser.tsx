'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GrainTexture from './shared/GrainTexture';

export type TeaserProps = {
  /** Monospace eyebrow, e.g. "Savings / module 02" */
  eyebrow: string;
  /** Two-tone headline: line one in ink, line two in the accent colour. */
  titleTop: string;
  titleBottom: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Alternates the section rhythm against its neighbours. */
  tone: 'light' | 'dark';
  accent?: 'blue' | 'magenta' | 'cyan';
  /** Small system-status facts rendered as a stat rail. */
  stats: { label: string; value: string }[];
};

const ACCENTS = {
  blue: { hex: '#0827dc', text: 'text-[#0827dc]' },
  magenta: { hex: '#fe009c', text: 'text-[#fe009c]' },
  cyan: { hex: '#00f0ff', text: 'text-[#00f0ff]' },
};

export default function ModuleTeaser({
  eyebrow,
  titleTop,
  titleBottom,
  body,
  ctaLabel,
  ctaHref,
  tone,
  accent = 'blue',
  stats,
}: TeaserProps) {
  const dark = tone === 'dark';
  const a = ACCENTS[accent];

  return (
    <section
      className={`relative isolate overflow-hidden px-6 py-28 md:px-10 xl:px-12 ${
        dark ? 'bg-[#02030a]' : 'bg-[#f3efe8]'
      }`}
    >
      {/* Background */}
      {dark ? (
        <>
          <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#03040a_0%,#05070f_55%,#02030a_100%)]" />
          <div
            className="absolute inset-0 -z-20"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${a.hex}2e, transparent 24%), radial-gradient(circle at 80% 40%, rgba(254,0,156,0.12), transparent 22%)`,
            }}
          />
          <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute inset-y-0 left-[7.5%] w-px bg-white/8" />
          <div className="absolute inset-y-0 right-[7.5%] w-px bg-white/8" />
          <GrainTexture count={90} tone="light" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
          <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
          <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
          <GrainTexture />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-end lg:gap-10"
      >
        <div className="lg:col-span-7">
          <div
            className={`mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 ${
              dark ? 'border-white/12 bg-white/6' : 'border-black/10 bg-white/60'
            }`}
          >
            <span
              className={`font-mono text-[10px] font-bold uppercase tracking-[0.34em] ${
                dark ? 'text-white/80' : a.text
              }`}
            >
              {eyebrow}
            </span>
          </div>

          <h2
            className={`leading-[0.84] tracking-[-0.08em] ${
              dark ? 'text-white' : 'text-black'
            }`}
          >
            <span className="block text-[12vw] font-black uppercase md:text-[8vw] lg:text-[5.4vw]">
              {titleTop}
            </span>
            <span
              className={`block text-[12vw] font-black uppercase md:text-[8vw] lg:text-[5.4vw] ${a.text}`}
            >
              {titleBottom}
            </span>
          </h2>

          <div
            className={`mt-8 max-w-2xl border-l-2 pl-6 ${
              dark ? 'border-white/30' : 'border-[#fe009c]'
            }`}
          >
            <p
              className={`text-base leading-relaxed md:text-[1.08rem] ${
                dark ? 'text-white/70' : 'text-black/62'
              }`}
            >
              {body}
            </p>
          </div>

          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.985 }} className="mt-10 inline-block">
            <Link
              href={ctaHref}
              className={`group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.32em] transition-all ${
                dark
                  ? 'border border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/16'
                  : 'bg-[#0827dc] text-white shadow-[0_24px_80px_rgba(8,39,220,0.28)]'
              }`}
            >
              <span>{ctaLabel}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* STAT RAIL — keeps the "system status" register on the new sections */}
        <div className="grid gap-4 lg:col-span-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-[1.7rem] border p-5 ${
                dark
                  ? 'border-white/10 bg-white/6 backdrop-blur-xl'
                  : 'border-black/8 bg-[#fffdf8] shadow-[0_18px_40px_rgba(0,0,0,0.05)]'
              }`}
            >
              <p
                className={`font-mono text-[9px] uppercase tracking-[0.28em] ${
                  dark ? 'text-white/40' : 'text-black/34'
                }`}
              >
                {stat.label}
              </p>
              <p
                className={`mt-2 text-lg font-semibold tracking-[-0.03em] ${
                  dark ? 'text-white/88' : 'text-black/80'
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
