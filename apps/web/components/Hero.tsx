'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import LiveTicker, { type TickerEvent } from './shared/LiveTicker';
import PhoneMockup from './shared/PhoneMockup';
import { waLink, WA_PREFILL } from '../lib/whatsapp';

// The feed spans all four modules — save, pay, swap, earn — so the activity
// itself communicates that this is an account, not a single-purpose off-ramp.
const FLOATING_NOTIFICATIONS: TickerEvent[] = [
  {
    id: 1,
    title: 'Savings / Goal',
    body: 'Jordan K. saved ₦15,000 toward a goal',
    meta: 'Locked • 14s',
    side: 'left',
    top: '16%',
    delay: 0.2,
  },
  {
    id: 2,
    title: 'Bills / Cable TV',
    body: 'Chidi E. paid his DSTV bill',
    meta: 'Auto-pay • Live',
    side: 'right',
    top: '24%',
    delay: 0.6,
  },
  {
    id: 3,
    title: 'USDT → TZS',
    body: 'Aisha M. cashed out 200 USDT to TZS',
    meta: 'Confirmed • 9s',
    side: 'left',
    top: '60%',
    delay: 1.0,
  },
  {
    id: 4,
    title: 'Rewards / Points',
    body: 'Kwame A. earned 340 reward points',
    meta: 'Referral bonus • 22s',
    side: 'right',
    top: '72%',
    delay: 1.4,
  },
];

const STATS = [
  { label: 'Wallets', value: '7 currencies + USDT' },
  { label: 'Experience', value: 'No app. Just chat.' },
  { label: 'In one chat', value: 'Hold, save, pay, swap' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[115svh] overflow-hidden bg-[#f4f1ea] text-[#111111]"
    >
      {/* BACKGROUND SYSTEM */}
      <div className="absolute inset-0 -z-20">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(8,39,220,0.12),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(254,0,156,0.08),_transparent_22%),linear-gradient(180deg,_#f6f3ec_0%,_#f1eee7_48%,_#ece7df_100%)]" />

        {/* Editorial spotlight behind phone */}
        <motion.div
          style={{ scale: glowScale }}
          className="absolute left-1/2 top-[16%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(8,39,220,0.14)_0%,_rgba(8,39,220,0.06)_28%,_transparent_68%)] blur-3xl"
        />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

        {/* Soft architectural lines */}
        <div className="absolute inset-y-0 left-[8%] w-px bg-black/10" />
        <div className="absolute inset-y-0 right-[8%] w-px bg-black/10" />
        <div className="absolute left-0 right-0 top-[16%] h-px bg-black/8" />
        <div className="absolute left-0 right-0 bottom-[18%] h-px bg-black/8" />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply [background-image:url('/noise.png')]" />
      </div>

      {/* TOP BAR */}
      <div className="relative z-30 mx-auto flex w-full max-w-7xl items-start justify-between px-6 pt-24 md:px-10 xl:px-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#0827dc]">
              Infinitswap / Live
            </span>
          </div>

          <p className="max-w-sm font-mono text-[10px] uppercase tracking-[0.35em] text-black/45">
            Wallets, savings, bills, swaps and rewards across African rails,
            24/7.
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {['NGN', 'TZS', 'ZAR', 'GHS'].map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/10 bg-white/55 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/55 backdrop-blur-xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="relative z-20 mx-auto flex min-h-[calc(115svh-7rem)] w-full max-w-7xl items-center px-6 pb-20 pt-8 md:px-10 xl:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* LEFT */}
          <motion.div
            style={{ y: textY }}
            className="relative lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-14 bg-[#0827dc]/30" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.45em] text-black/45">
                  Your financial account, inside WhatsApp
                </p>
              </div>

              <div className="max-w-5xl">
                <h1 className="leading-[0.84] tracking-[-0.08em] text-black">
                  <span className="block text-[15vw] font-black uppercase md:text-[11vw] lg:text-[8.6vw]">
                    Your Money.
                  </span>

                  {/* "In Your WhatsApp." is ~2x the character count of the line
                      above, so it steps down a size to hold the same measure. */}
                  <span className="block text-[10.5vw] font-black uppercase md:text-[7.6vw] lg:text-[5.9vw]">
                    <span className="text-[#0827dc]">In Your WhatsApp</span>
                    <span className="text-black/30">.</span>
                  </span>

                  <span className="mt-3 block text-[7vw] font-semibold italic tracking-[-0.05em] text-black/65 md:text-[5vw] lg:text-[3.35vw]">
                    The financial account for people who live in WhatsApp
                    anyway.
                  </span>
                </h1>
              </div>

              <div className="mt-10 grid max-w-2xl gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                <div className="border-l-2 border-[#fe009c] pl-6">
                  <p className="text-lg leading-relaxed text-black/72 md:text-[1.35rem]">
                    One chat for your everyday money — hold it, save it, pay
                    bills, swap crypto to cash, and get rewarded. No app to
                    download, no dashboard to learn.
                  </p>
                </div>

                <div className="grid gap-3">
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
                    No downloads. No clutter. Just a direct, human-feeling flow.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                {STATS.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-black/8 bg-white/55 p-4 backdrop-blur-xl"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-black/40">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug text-black/75">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT / PHONE OBJECT */}
          <motion.div
            style={{ y: mockupY, rotate: mockupRotate }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:col-span-5 lg:justify-end"
          >
            <motion.div
              style={{ y: parallaxY }}
              className="relative"
            >
              {/* Shadow field */}
              <div className="absolute left-1/2 top-[86%] h-24 w-[82%] -translate-x-1/2 rounded-full bg-black/18 blur-3xl" />

              {/* Orbital ring behind device */}
              <div className="absolute left-1/2 top-1/2 h-[33rem] w-[33rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0827dc]/10" />
              <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/6" />

              {/* Device */}
              <PhoneMockup
                size="lg"
                frameClassName="bg-[#0c0c10] shadow-[0_60px_120px_rgba(0,0,0,0.28),0_8px_28px_rgba(0,0,0,0.12)]"
                ringClassName="ring-1 ring-white/10"
                rimClassName="border border-white/10"
                sideShineClassName="inset-y-10 left-[6px] w-px bg-white/20 blur-[1px]"
                sideShineRightClassName="inset-y-16 right-[6px] w-px bg-white/10 blur-[1px]"
                islandClassName="shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                screenClassName="bg-[#111319]"
                screenBackground="bg-[radial-gradient(circle_at_30%_20%,rgba(8,39,220,0.18),transparent_30%),radial-gradient(circle_at_70%_80%,rgba(254,0,156,0.10),transparent_28%),linear-gradient(180deg,#f8f8fb_0%,#eff2f8_18%,#d9e0ef_100%)]"
                glossClassName="bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_18%,transparent_32%,transparent_72%,rgba(255,255,255,0.12)_100%)]"
                overlay={
                  <>
                    {/* reflection streak */}
                    <div className="pointer-events-none absolute -left-[20%] top-0 z-20 h-full w-[45%] rotate-[12deg] bg-white/10 blur-2xl" />

                    {/* bottom dock glass */}
                    <div className="absolute bottom-4 left-1/2 z-30 w-[88%] -translate-x-1/2 rounded-[2rem] border border-white/30 bg-white/18 px-4 py-3 backdrop-blur-2xl shadow-[0_20px_60px_rgba(17,17,17,0.14)]">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/45">
                            Live swap
                          </p>
                          <p className="mt-1 text-sm font-semibold text-black/80">
                            Cashing out USDT to NGN
                          </p>
                        </div>
                        <div className="rounded-full bg-[#0827dc] px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white">
                          Active
                        </div>
                      </div>
                    </div>
                  </>
                }
              >
                {/* screen art frame */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src="/hero-mockup.png"
                    alt="Infinitswap chat interface"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </PhoneMockup>

              {/* MICRO BADGES ATTACHED TO DEVICE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -right-8 top-14 hidden rounded-[1.35rem] border border-white/60 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-2xl md:block"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/40">
                  Speed
                </p>
                <p className="mt-1 text-sm font-semibold text-black/80">
                  Fast local settlement
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute -left-10 bottom-24 hidden rounded-[1.35rem] border border-white/60 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-2xl md:block"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/40">
                  UX
                </p>
                <p className="mt-1 text-sm font-semibold text-black/80">
                  No app. Zero friction.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FLOATING NOTIFICATION PINS */}
      <LiveTicker events={FLOATING_NOTIFICATIONS} />

      {/* BOTTOM FADE */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 bg-gradient-to-b from-transparent to-[#ece7df]" />
    </section>
  );
}