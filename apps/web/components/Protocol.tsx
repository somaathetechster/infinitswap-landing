'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import StepCard, { type StepItem } from './shared/StepCard';
import GrainTexture from './shared/GrainTexture';

type Direction = 'sell' | 'buy';

const SELL_LAYERS: StepItem[] = [
  {
    id: '01',
    title: 'Start a Chat',
    tag: 'STEP 1',
    detail:
      'Message our WhatsApp line and tell us how much USDT you want to sell. No signup forms, no app installation, and no dashboard friction.',
    micro: 'Initiate request',
  },
  {
    id: '02',
    title: 'Lock in the Rate',
    tag: 'STEP 2',
    detail:
      'You immediately receive a live quote. The rate is clear, transparent, and visible before you commit to the transaction.',
    micro: 'Confirm pricing',
  },
  {
    id: '03',
    title: 'Send Your Crypto',
    tag: 'STEP 3',
    detail:
      'A dedicated wallet address is generated for your transaction. Send from Trust Wallet, Binance, or any compatible wallet or exchange.',
    micro: 'Transfer asset',
  },
  {
    id: '04',
    title: 'Get Paid Instantly',
    tag: 'STEP 4',
    detail:
      'Once the transfer is confirmed, local currency is sent directly to your bank account with status visibility throughout the process.',
    micro: 'Payout executed',
  },
];

// The buy side mirrors the sell flow beat for beat, so the toggle swaps content
// without the layout or the timeline rail changing shape.
const BUY_LAYERS: StepItem[] = [
  {
    id: '01',
    title: 'Start a Chat',
    tag: 'STEP 1',
    detail:
      'Message the same WhatsApp line and say how much USDT you want to buy, and which local currency you are paying with.',
    micro: 'Initiate request',
  },
  {
    id: '02',
    title: 'Lock in the Rate',
    tag: 'STEP 2',
    detail:
      'You get a live quote showing exactly how much local currency buys how much USDT, with the fee stated up front before you commit.',
    micro: 'Confirm pricing',
  },
  {
    id: '03',
    title: 'Pay in Local Currency',
    tag: 'STEP 3',
    detail:
      'Pay from your Infinitswap wallet balance or transfer to the account details generated for your order. Both settle against the same quote.',
    micro: 'Fund the order',
  },
  {
    id: '04',
    title: 'Receive Your USDT',
    tag: 'STEP 4',
    detail:
      'The USDT lands in your Infinitswap wallet, or goes straight out to an external address you nominate — your choice, stated when you order.',
    micro: 'Delivery executed',
  },
];

const COPY: Record<
  Direction,
  { label: string; headline: [string, string, string]; intro: string; watermark: string }
> = {
  sell: {
    label: 'Sell USDT',
    headline: ['From', 'Crypto', 'To Cash.'],
    intro:
      'We’ve removed the traditional friction of crypto off-ramping. The experience is direct on the surface, while the system coordinates quoting, routing, confirmation, and payout in the background.',
    watermark: 'Cash',
  },
  buy: {
    label: 'Buy USDT',
    headline: ['From', 'Cash', 'To Crypto.'],
    intro:
      'The same flow, run in reverse. Pay in your local currency from a wallet balance you already hold, and take delivery in USDT — with the rate and the fee visible before you commit.',
    watermark: 'USDT',
  },
};

export default function Protocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('sell');

  const layers = direction === 'sell' ? SELL_LAYERS : BUY_LAYERS;
  const copy = COPY[direction];

  const inView = useInView(sectionRef, { amount: 0.2, once: false });

  const { scrollYProgress } = useScroll({
    target: rightRef,
    offset: ['start 75%', 'end 35%'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleGlowMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlowMove}
      className="relative isolate overflow-hidden bg-[#f3efe8] px-6 py-24 md:px-10 xl:px-12"
    >
      {/* Background */}
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
      <div className="absolute left-0 right-0 top-[14%] h-px bg-black/8" />
      <div className="absolute left-0 right-0 bottom-[12%] h-px bg-black/8" />
      <GrainTexture />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left side */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#0827dc]">
                  Swap / crypto to cash and back
                </span>
              </div>

              <h2 className="leading-[0.84] tracking-[-0.08em] text-black">
                {copy.headline.map((line, index) => (
                  <span
                    key={line}
                    className={`block text-[14vw] font-black uppercase md:text-[10vw] lg:text-[6.8vw] ${
                      index === 2 ? 'text-[#0827dc]' : ''
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              {/* DIRECTION TOGGLE — swap runs both ways, so the section shows both */}
              <div
                role="tablist"
                aria-label="Swap direction"
                className="mt-8 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/60 p-1"
              >
                {(['sell', 'buy'] as Direction[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={direction === option}
                    onClick={() => {
                      setDirection(option);
                      setActiveIndex(0);
                    }}
                    className={`rounded-full px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.26em] transition-all duration-300 ${
                      direction === option
                        ? 'bg-[#0827dc] text-white shadow-[0_10px_30px_rgba(8,39,220,0.26)]'
                        : 'text-black/48 hover:text-[#0827dc]'
                    }`}
                  >
                    {COPY[option].label}
                  </button>
                ))}
              </div>

              <div className="mt-8 max-w-md border-l-2 border-[#fe009c] pl-6">
                <p className="text-base leading-relaxed text-black/62 md:text-[1.08rem]">
                  {copy.intro}
                </p>
              </div>

              <div className="mt-10 grid max-w-sm gap-4">
                <div className="rounded-[1.7rem] border border-black/8 bg-[#fffdf8] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/34">
                    System status
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-black/52">
                      Active / ready
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-black/58">
                    Listening for incoming liquidity requests and monitoring
                    payout execution across supported rails.
                  </p>
                </div>

                <div className="rounded-[1.7rem] border border-black/8 bg-[#fffdf8] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/34">
                    Performance
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-semibold tracking-[-0.05em] text-[#0827dc]">
                        12ms
                      </p>
                      <p className="mt-1 text-sm text-black/50">response latency</p>
                    </div>
                    <div className="h-12 w-px bg-black/8" />
                    <div>
                      <p className="text-3xl font-semibold tracking-[-0.05em] text-black/86">
                        24/7
                      </p>
                      <p className="mt-1 text-sm text-black/50">availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div ref={rightRef} className="relative lg:col-span-7">
            {/* timeline rail */}
            <div className="absolute left-4 top-4 bottom-4 hidden w-px bg-black/8 md:block" />
            <motion.div
              style={{ height: progressHeight }}
              className="absolute left-4 top-4 hidden w-px bg-gradient-to-b from-[#0827dc] to-[#fe009c] md:block"
            />

            <div className="space-y-6 md:space-y-8">
              {layers.map((layer, index) => {
                const active = activeIndex === index || (inView && index === 0);

                return (
                  <div
                    key={`${direction}-${layer.id}`}
                    className="relative md:pl-12"
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="absolute left-[10px] top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#f3efe8] bg-[#0827dc] shadow-[0_0_20px_rgba(8,39,220,0.4)] md:block" />

                    <StepCard item={layer} index={index} active={active} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-[-4%] select-none opacity-[0.018]">
        <span className="text-[24vw] font-black uppercase tracking-[-0.08em] text-black">
          {copy.watermark}
        </span>
      </div>
    </section>
  );
}