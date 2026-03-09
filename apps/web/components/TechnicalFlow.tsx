'use client';

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Step = {
  id: number;
  title: string;
  eyebrow: string;
  desc: string;
  node: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    eyebrow: 'STEP_01',
    title: 'See Your Rate',
    desc: 'Check the live exchange rate directly in chat. Clear pricing, visible payout, and no unnecessary friction.',
    node: 'QUOTE_ENGINE',
  },
  {
    id: 2,
    eyebrow: 'STEP_02',
    title: 'Get Your Address',
    desc: 'A dedicated wallet destination is generated for the transaction flow, keeping the process structured and secure.',
    node: 'ADDRESS_ROUTER',
  },
  {
    id: 3,
    eyebrow: 'STEP_03',
    title: 'Send The Asset',
    desc: 'Once funds are sent, the system watches the chain and updates the status flow in real time.',
    node: 'CHAIN_MONITOR',
  },
  {
    id: 4,
    eyebrow: 'STEP_04',
    title: 'Receive Local Cash',
    desc: 'After confirmation, payout is triggered across local rails and delivered with clear status visibility.',
    node: 'PAYOUT_NODE',
  },
];

function GrainTexture() {
  const dots = useMemo(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${(index * 23) % 100}%`,
        opacity: ((index % 6) + 2) / 26,
        size: index % 3 === 0 ? 1 : 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="absolute rounded-full bg-black"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function TechnicalFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleGlowMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const children = Array.from(el.children) as HTMLElement[];
    const containerCenter = el.scrollLeft + el.clientWidth / 2;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeIndex) {
      setActiveIndex(nearestIndex);
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlowMove}
      className="relative isolate overflow-hidden bg-[#f3efe8] px-6 py-24 md:px-10 xl:px-12"
    >
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#f7f3ec_0%,#f0ebe2_44%,#e9e2d7_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_14%,rgba(8,39,220,0.08),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(254,0,156,0.06),transparent_20%),radial-gradient(circle_at_56%_60%,rgba(8,39,220,0.05),transparent_28%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-200"
        style={{
          background: `radial-gradient(480px circle at ${glow.x}% ${glow.y}%, rgba(8,39,220,0.10), transparent 34%)`,
        }}
      />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-black/10" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-black/10" />
      <div className="absolute left-0 right-0 top-[14%] h-px bg-black/8" />
      <div className="absolute left-0 right-0 bottom-[12%] h-px bg-black/8" />
      <GrainTexture />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2 backdrop-blur-xl">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#0827dc]">
                Transaction architecture
              </span>
            </div>

            <h2 className="leading-[0.82] tracking-[-0.08em] text-black">
              <span className="block text-[14vw] font-black uppercase md:text-[10vw] lg:text-[7.2vw]">
                Technical
              </span>
              <span className="block text-[14vw] font-black uppercase text-[#0827dc] md:text-[10vw] lg:text-[7.2vw]">
                Flow.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <div className="max-w-md border-l-2 border-[#fe009c] pl-6">
              <p className="text-lg leading-relaxed text-black/62 md:text-[1.15rem]">
                A compact process rail showing how request, routing, monitoring,
                and payout connect into one clean exchange experience.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.30em] text-black/36">
              Swipe / scroll horizontally
            </span>
            <div className="relative h-px w-24 bg-black/10 md:w-32">
              <div
                className="absolute inset-y-0 left-0 bg-[#0827dc] transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={[
                  'h-2.5 w-2.5 rounded-full transition-all duration-300',
                  activeIndex === index
                    ? 'bg-[#0827dc] scale-125'
                    : 'bg-black/16 hover:bg-black/28',
                ].join(' ')}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          ref={railRef}
          onScroll={handleScroll}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((step, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={step.id} className="snap-center">
                <article
                  className={[
                    'relative min-w-[290px] max-w-[290px] overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 md:min-w-[340px] md:max-w-[340px] md:p-7',
                    isActive
                      ? 'border-white/70 bg-white/68 shadow-[0_28px_90px_rgba(17,17,17,0.09)] backdrop-blur-2xl'
                      : 'border-black/8 bg-white/34 hover:border-black/12 hover:bg-white/48',
                  ].join(' ')}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.34),transparent_42%)]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-black/8 bg-white/70 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#0827dc]">
                        {step.eyebrow}
                      </span>

                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/26">
                        {String(step.id).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[1.8rem] font-semibold leading-[0.95] tracking-[-0.06em] text-black/86 md:text-[2.15rem]">
                      {step.title.split(' ').map((word, idx, arr) => (
                        <span
                          key={`${word}-${idx}`}
                          className={idx === arr.length - 1 ? 'block text-[#0827dc]' : 'block'}
                        >
                          {word}
                        </span>
                      ))}
                    </h3>

                    <p className="mt-5 text-sm leading-relaxed text-black/58 md:text-[15px]">
                      {step.desc}
                    </p>

                    <div className="mt-8">
                      <div className="relative overflow-hidden rounded-[1.5rem] border border-black/6 bg-[#0d1320] p-4 shadow-[0_18px_40px_rgba(8,39,220,0.14)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(8,39,220,0.16),transparent_26%),radial-gradient(circle_at_80%_75%,rgba(254,0,156,0.10),transparent_22%)]" />

                        <div className="relative flex items-center justify-between">
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/42">
                              Active node
                            </p>
                            <p className="mt-2 text-sm font-semibold tracking-[-0.03em] text-white/88">
                              {step.node}
                            </p>
                          </div>

                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                            className="relative flex h-14 w-14 items-center justify-center"
                          >
                            <div className="absolute inset-0 rounded-full border border-white/12" />
                            <div className="absolute inset-[10px] rounded-full border border-[#0827dc]/40" />
                            <div className="h-2.5 w-2.5 rounded-full bg-[#0827dc] shadow-[0_0_24px_rgba(8,39,220,0.8)]" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 flex items-center gap-4">
                      <div className="relative h-px flex-1 overflow-hidden rounded-full bg-black/8">
                        <div
                          className="absolute inset-y-0 left-0 bg-[#0827dc] transition-all duration-300"
                          style={{
                            width: `${((index + 1) / STEPS.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/34">
                        {String(index + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-[-4%] select-none opacity-[0.018]">
        <span className="text-[24vw] font-black uppercase tracking-[-0.08em] text-black">
          Flow
        </span>
      </div>
    </section>
  );
}