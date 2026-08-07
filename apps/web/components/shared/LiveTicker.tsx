'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export type TickerEvent = {
  id: number;
  /** Monospace route label, e.g. "USDT → NGN" or "Savings / Goal" */
  title: string;
  /** The human sentence, e.g. "Jordan K. saved ₦15,000 toward a goal" */
  body: string;
  /** Status line, e.g. "Locked • 14s" */
  meta: string;
  side: 'left' | 'right';
  top: string;
  delay: number;
};

/** One floating glassmorphic activity card. */
export function TickerCard({ event }: { event: TickerEvent }) {
  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/68 p-4 shadow-[0_30px_90px_rgba(17,17,17,0.10)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.45),transparent_40%)]" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0827dc] shadow-[0_14px_30px_rgba(8,39,220,0.24)]">
          <Image src="/logo-emblem.png" alt="Infinitswap emblem" width={22} height={22} />
        </div>

        <div className="min-w-[220px]">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-black/40">
              {event.title}
            </p>
            <span className="rounded-full bg-emerald-500/12 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Live
            </span>
          </div>

          <p className="mt-2 text-[15px] font-semibold leading-tight text-black/82">
            {event.body}
          </p>

          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-black/38">
            {event.meta}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * The drifting activity feed pinned to the edges of a section.
 * Desktop only — matches the original Hero behaviour (`hidden lg:block`).
 */
export default function LiveTicker({ events }: { events: TickerEvent[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 mx-auto hidden max-w-7xl px-10 lg:block xl:px-12">
      {events.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: event.side === 'left' ? -30 : 30, y: 12 }}
          animate={{
            opacity: [0, 1, 1, 0.92, 1],
            y: [0, -10, 6, -6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: event.delay,
          }}
          style={{ top: event.top }}
          className={`absolute ${
            event.side === 'left' ? 'left-0 xl:left-6' : 'right-0 xl:right-6'
          }`}
        >
          <TickerCard event={event} />
        </motion.div>
      ))}
    </div>
  );
}
