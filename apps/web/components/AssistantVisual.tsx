'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import PhoneMockup, { ChatScreen, type ChatMessage } from './shared/PhoneMockup';
import GrainTexture from './shared/GrainTexture';

const chatSequence: ChatMessage[] = [
  {
    id: 1,
    type: 'bot',
    text: 'Hello. What would you like to convert today?',
  },
  {
    id: 2,
    type: 'user',
    text: 'I want to cash out 500 USDT to naira.',
  },
  {
    id: 3,
    type: 'bot',
    text: 'Your live quote is ready. Estimated payout has been calculated.',
  },
  {
    id: 4,
    type: 'user',
    text: 'Proceed with the transaction.',
  },
  {
    id: 5,
    type: 'bot',
    text: 'Confirmed. Your payout is now being processed to your bank account.',
  },
];

const microCards = [
  {
    id: 1,
    label: 'Conversation-first',
    title: 'No app friction',
    text: 'The entire exchange flow happens in a guided chat experience.',
  },
  {
    id: 2,
    label: 'Realtime clarity',
    title: 'Status-led UX',
    text: 'Users can see quote, confirmation, and payout progress without confusion.',
  },
];

export default function AssistantVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [2.5, -2.5]);
  const stageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const handleGlowMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  };

  return (
    <section className="relative overflow-hidden bg-[#fe009c] px-6 py-24 md:px-10 xl:px-12">
      {/* BASE BLEND */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffd7ee_0%,#ff87ca_16%,#fe009c_42%,#c40073_76%,#7d004f_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.26),transparent_22%),radial-gradient(circle_at_82%_30%,rgba(8,39,220,0.14),transparent_24%),radial-gradient(circle_at_55%_70%,rgba(255,255,255,0.10),transparent_20%)]" />
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:74px_74px]" />
      <div className="absolute inset-y-0 left-[7.5%] w-px bg-white/12" />
      <div className="absolute inset-y-0 right-[7.5%] w-px bg-white/12" />
      <div className="absolute left-0 right-0 top-[14%] h-px bg-white/10" />
      <div className="absolute left-0 right-0 bottom-[12%] h-px bg-white/10" />

      {/* GRAIN */}
      <GrainTexture count={95} tone="light" />

      <div
        ref={containerRef}
        onMouseMove={handleGlowMove}
        className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12"
      >
        {/* MAGENTA/BLUE MOUSE GLOW */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[3rem] transition-opacity duration-200"
          style={{
            background: `radial-gradient(460px circle at ${glow.x}% ${glow.y}%, rgba(8,39,220,0.20), transparent 34%)`,
          }}
        />

        {/* LEFT CONTENT */}
        <motion.div
          style={{ y: stageY }}
          className="relative z-10 lg:col-span-5"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/10 px-4 py-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-white/84">
              Conversational interface
            </span>
          </div>

          <h2 className="leading-[0.84] tracking-[-0.08em] text-white">
            <span className="block text-[13vw] font-black uppercase md:text-[8vw] lg:text-[5.8vw]">
              Built
            </span>
            <span className="block text-[13vw] font-black uppercase text-[#dfe6ff] md:text-[8vw] lg:text-[5.8vw]">
              For Chat.
            </span>
          </h2>

          <div className="mt-8 max-w-md border-l-2 border-white/40 pl-6">
            <p className="text-base leading-relaxed text-white/78 md:text-lg">
              A premium chat-native transaction layer that makes crypto-to-cash
              feel direct, guided, and easy to trust.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {microCards.map((card) => (
              <div
                key={card.id}
                className="rounded-[1.7rem] border border-white/14 bg-[#fff7fb] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#fe009c]/70">
                  {card.label}
                </p>
                <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.04em] text-[#111111]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/62">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <div className="relative z-10 flex justify-center lg:col-span-7 lg:justify-end">
          <motion.div
            style={{ y: phoneY, rotate: phoneRotate }}
            className="relative"
          >
            {/* STAGE AURA */}
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_28%,transparent_70%)] blur-3xl" />

            {/* BACK CARDS */}
            <div className="absolute -left-12 top-10 hidden w-[230px] rounded-[1.9rem] border border-white/14 bg-[#fff7fb] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.12)] xl:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#fe009c]/70">
                Simplicity
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-[#111111]">
                One conversation,
                <span className="block text-[#0827dc]">full transaction flow</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                Users don’t need to jump across interfaces to understand what
                happens next.
              </p>
            </div>

            <div className="absolute -right-10 bottom-10 hidden w-[220px] rounded-[1.9rem] border border-white/14 bg-[#fff7fb] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.12)] xl:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#fe009c]/70">
                Confidence
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-[#111111]">
                Clear status logic
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                Quote, confirmation, and payout feedback are surfaced in a way
                that feels immediate and reassuring.
              </p>
            </div>

            {/* PHONE BODY */}
            <PhoneMockup size="md">
              <ChatScreen
                messages={chatSequence}
                animate={isInView}
                highlightLabel="Live payout estimate"
                highlightValue="₦ 760,000"
                highlightBadge="Locked"
                statusLabel="Exchange status"
                statusBadge="Active"
                statusText="Quote confirmed. Waiting for transfer settlement."
              />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}