'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export type ChatMessage = {
  id: number;
  type: 'bot' | 'user';
  text: string;
};

/**
 * The dark chat UI that lives inside the phone screen.
 * Swap `messages`, `header` and the status strip to retell a different flow
 * (savings goal confirmation, bill payment, referral payout) without rebuilding the frame.
 */
export function ChatScreen({
  messages,
  animate = true,
  highlightLabel,
  highlightValue,
  highlightBadge = 'Locked',
  statusLabel = 'Exchange status',
  statusBadge = 'Active',
  statusText,
  assistantName = 'Infinitswap Bot',
  assistantKicker = 'Verified assistant',
}: {
  messages: ChatMessage[];
  animate?: boolean;
  /** The glass card above the thread, e.g. "Live payout estimate" / "₦ 760,000" */
  highlightLabel?: string;
  highlightValue?: string;
  highlightBadge?: string;
  statusLabel?: string;
  statusBadge?: string;
  statusText?: string;
  assistantName?: string;
  assistantKicker?: string;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-14">
      {/* Header */}
      <div className="rounded-[1.55rem] border border-white/10 bg-white/8 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0827dc] shadow-[0_12px_28px_rgba(8,39,220,0.25)]">
            <Image
              src="/logo-emblem.png"
              alt="Infinitswap emblem"
              width={21}
              height={21}
              className="object-contain"
            />
          </div>

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/42">
              {assistantKicker}
            </p>
            <p className="mt-1 text-sm font-semibold text-white/90">{assistantName}</p>
          </div>
        </div>
      </div>

      {/* Highlight / amount card */}
      {highlightValue && (
        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/8 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-white/42">
                {highlightLabel}
              </p>
              <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.05em] text-white">
                {highlightValue}
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/18 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.20em] text-emerald-300">
              {highlightBadge}
            </span>
          </div>
        </div>
      )}

      {/* Thread */}
      <div className="mt-4 flex-1 space-y-3">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{
              opacity: 0,
              y: 14,
              x: msg.type === 'user' ? 10 : -10,
            }}
            animate={animate ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{
              duration: 0.42,
              delay: 0.15 + index * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`max-w-[86%] rounded-[1.25rem] px-4 py-3 text-[12px] leading-relaxed shadow-[0_12px_30px_rgba(0,0,0,0.16)] ${
              msg.type === 'user'
                ? 'ml-auto bg-[#fe009c] text-white'
                : 'bg-white/10 text-white/88'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Status strip */}
      {statusText && (
        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/8 p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/44">
              {statusLabel}
            </p>
            <span className="rounded-full bg-emerald-500/18 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.20em] text-emerald-300">
              {statusBadge}
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-white/84">{statusText}</p>
        </div>
      )}
    </div>
  );
}

const SIZES = {
  /** AssistantVisual / "Built For Chat" geometry */
  md: {
    frame: 'h-[590px] w-[300px] rounded-[3.9rem] p-[8px]',
    rim: 'inset-[1.5px] rounded-[3.8rem]',
    screen: 'rounded-[3.15rem]',
    island: 'h-7 w-28',
  },
  /** Hero geometry */
  lg: {
    frame: 'h-[680px] w-[340px] rounded-[4.2rem] p-[10px]',
    rim: 'inset-[2px] rounded-[4rem]',
    screen: 'rounded-[3.4rem]',
    island: 'h-8 w-32',
  },
} as const;

/**
 * The realistic phone frame: body gradient, rim light, side shines, dynamic
 * island, screen container and the diagonal gloss reflection.
 *
 * Extracted from AssistantVisual and Hero, which each carried their own copy.
 * Content goes in `children` — the frame never changes.
 */
export default function PhoneMockup({
  size = 'md',
  children,
  screenBackground = 'bg-[radial-gradient(circle_at_25%_16%,rgba(8,39,220,0.26),transparent_28%),radial-gradient(circle_at_84%_78%,rgba(254,0,156,0.18),transparent_24%),linear-gradient(180deg,#0e1530_0%,#0b1022_100%)]',
  frameClassName = 'bg-[linear-gradient(160deg,#090909_0%,#1a1b20_38%,#2b2e37_100%)] shadow-[0_70px_140px_rgba(0,0,0,0.28),0_12px_34px_rgba(0,0,0,0.18)]',
  screenClassName = 'border border-white/10 bg-[#0d1020]',
  ringClassName = 'ring-1 ring-white/12',
  rimClassName = 'bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_18%,transparent_82%,rgba(255,255,255,0.06))]',
  sideShineClassName = 'inset-y-8 left-[5px] w-px bg-white/20 blur-[1px]',
  sideShineRightClassName = 'inset-y-14 right-[5px] w-px bg-white/12 blur-[1px]',
  islandClassName = '',
  glossClassName = 'bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_18%,transparent_32%,transparent_72%,rgba(255,255,255,0.08)_100%)]',
  overlay,
}: {
  size?: keyof typeof SIZES;
  children: ReactNode;
  screenBackground?: string;
  frameClassName?: string;
  screenClassName?: string;
  ringClassName?: string;
  rimClassName?: string;
  sideShineClassName?: string;
  sideShineRightClassName?: string;
  islandClassName?: string;
  glossClassName?: string;
  /** Rendered above the gloss, e.g. Hero's glass dock and reflection streak. */
  overlay?: ReactNode;
}) {
  const s = SIZES[size];

  return (
    <div className={`relative ${ringClassName} ${s.frame} ${frameClassName}`}>
      <div className={`absolute ${s.rim} ${rimClassName}`} />
      <div className={`absolute ${sideShineClassName}`} />
      <div className={`absolute ${sideShineRightClassName}`} />

      <div className={`relative h-full w-full overflow-hidden ${s.screen} ${screenClassName}`}>
        {/* Dynamic island */}
        <div
          className={`absolute left-1/2 top-3 z-30 ${s.island} -translate-x-1/2 rounded-full bg-black ${islandClassName}`}
        />

        {/* Screen background */}
        <div className={`absolute inset-0 z-0 ${screenBackground}`} />

        {children}

        {/* Screen reflection */}
        <div className={`pointer-events-none absolute inset-0 z-20 ${glossClassName}`} />

        {overlay}
      </div>
    </div>
  );
}
