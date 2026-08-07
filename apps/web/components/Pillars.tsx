'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import StepCard, { type StepItem } from './shared/StepCard';
import GrainTexture from './shared/GrainTexture';
import { waLink, WA_PREFILL } from '../lib/whatsapp';

const PILLARS: StepItem[] = [
  {
    id: '01',
    tag: 'Pillar 1',
    micro: 'HoldItAll',
    title: 'Wallet',
    detail:
      'Multi-currency wallets for Naira, Cedis, Rand, Shillings, and more — plus USDT. One balance, always visible, always yours.',
  },
  {
    id: '02',
    tag: 'Pillar 2',
    micro: 'GrowWhileYouWait',
    title: 'Save',
    detail:
      'Round up spare change, lock savings for a goal, or grow a balance with interest. Set it once; the chat handles the rest.',
  },
  {
    id: '03',
    tag: 'Pillar 3',
    micro: 'HandleLife',
    title: 'Pay',
    detail:
      'Airtime, data, electricity, cable, betting — pay it now or put it on autopay and never miss a due date again.',
  },
  {
    id: '04',
    tag: 'Pillar 4',
    micro: 'CryptoToCash',
    title: 'Swap',
    detail:
      'Turn USDT into local currency — or local currency into USDT — with a live rate and a payout that lands in minutes.',
  },
  {
    id: '05',
    tag: 'Pillar 5',
    micro: 'GetRewarded',
    title: 'Earn',
    detail:
      'Earn points and cashback through campaigns, challenges, and eligible activity — deposits, savings, and swaps can all qualify. Redeem for fee discounts, cashback, or bonus USDT.',
  },
];

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const inView = useInView(sectionRef, { amount: 0.15, once: false });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleGlowMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlowMove}
      className="relative isolate overflow-hidden bg-[#f3efe8] px-6 py-24 md:px-10 xl:px-12"
    >
      {/* Background — mirrors the Protocol section's light treatment so the
          light/dark section rhythm reads hero → light → dark. */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%),radial-gradient(circle_at_56%_60%,rgba(8,39,220,0.05),transparent_28%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-200"
        style={{
          background: `radial-gradient(520px circle at ${glow.x}% ${glow.y}%, rgba(8,39,220,0.10), transparent 34%)`,
        }}
      />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
      <GrainTexture />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#0827dc]">
              The account / five modules
            </span>
          </div>

          <h2 className="leading-[0.84] tracking-[-0.08em] text-black">
            <span className="block text-[14vw] font-black uppercase md:text-[10vw] lg:text-[6.8vw]">
              Five Things.
            </span>
            <span className="block text-[14vw] font-black uppercase text-[#0827dc] md:text-[10vw] lg:text-[6.8vw]">
              One Chat.
            </span>
          </h2>

          <div className="mt-8 max-w-md border-l-2 border-[#fe009c] pl-6">
            <p className="text-base leading-relaxed text-black/62 md:text-[1.08rem]">
              Wallet, savings, bills, swap and rewards — five modules of one
              account, all reachable from the same conversation.
            </p>
          </div>
        </motion.div>

        {/* PILLAR GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.id}
              onMouseEnter={() => setActiveIndex(index)}
              /* Fifth card spans the full row so the grid closes cleanly. */
              className={index === PILLARS.length - 1 ? 'md:col-span-2' : ''}
            >
              <StepCard
                item={pillar}
                index={index}
                active={activeIndex === index || (inView && index === 0)}
                footerLabel="One account"
                statusLabel="Module active"
                stackTitle={false}
                microCase="as-is"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <motion.a
            href={waLink(WA_PREFILL.start)}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.985 }}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0827dc] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-white shadow-[0_24px_80px_rgba(8,39,220,0.28)] transition-all"
          >
            <span>Start on WhatsApp</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>

          <p className="text-sm text-black/42">
            One number. Every module. No app to install.
          </p>
        </div>
      </div>
    </section>
  );
}
