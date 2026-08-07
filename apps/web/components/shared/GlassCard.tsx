'use client';

import type { ReactNode } from 'react';

/**
 * The soft light panel used for micro-copy cards across the site
 * (Hero stat tiles, AssistantVisual's "No app friction" cards,
 * Protocol's System status / Performance boxes).
 *
 * `tone` picks the surface: 'glass' floats over photography/gradients,
 * 'solid' sits on the parchment sections.
 */
export default function GlassCard({
  kicker,
  title,
  children,
  tone = 'solid',
  accent = 'blue',
  className = '',
}: {
  kicker?: string;
  title?: ReactNode;
  children?: ReactNode;
  tone?: 'glass' | 'solid';
  accent?: 'blue' | 'magenta';
  className?: string;
}) {
  const surface =
    tone === 'glass'
      ? 'border-white/60 bg-white/70 shadow-xl backdrop-blur-2xl'
      : 'border-black/8 bg-[#fffdf8] shadow-[0_18px_40px_rgba(0,0,0,0.05)]';

  const kickerColor =
    accent === 'magenta' ? 'text-[#fe009c]/70' : 'text-black/34';

  return (
    <div className={`rounded-[1.7rem] border p-5 ${surface} ${className}`}>
      {kicker && (
        <p
          className={`font-mono text-[9px] uppercase tracking-[0.28em] ${kickerColor}`}
        >
          {kicker}
        </p>
      )}

      {title && (
        <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.04em] text-[#111111]">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}
