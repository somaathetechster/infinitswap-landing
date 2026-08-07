'use client';

import { motion } from 'framer-motion';

export type StepItem = {
  /** Two-digit ordinal shown in the pill, e.g. "01" */
  id: string;
  /** Small bordered pill, e.g. "STEP 1" or "PILLAR 1" */
  tag: string;
  /** Monospace kicker above the title, e.g. "Initiate request" */
  micro: string;
  /** Title. The last word is rendered in the accent colour, one word per line. */
  title: string;
  detail: string;
};

/**
 * The numbered card used by the /protocol flow, extracted so the 5-pillar
 * section and the new module pages share one implementation.
 *
 * Visual contract (do not diverge): light parchment card, blue ordinal pill,
 * per-word stacked title with accent-coloured last word, and the
 * "Orchestrated flow / Node active" system-status footer with its orbital spinner.
 */
export default function StepCard({
  item,
  index,
  active,
  footerLabel = 'Orchestrated flow',
  statusLabel = 'Node active',
  stackTitle = true,
  microCase = 'upper',
}: {
  item: StepItem;
  index: number;
  active: boolean;
  footerLabel?: string;
  statusLabel?: string;
  /** Protocol stacks one word per line. Wider grids (pillars) read better unstacked. */
  stackTitle?: boolean;
  /** 'as-is' preserves camelCase code tags like `HoldItAll`, which uppercasing would flatten. */
  microCase?: 'upper' | 'as-is';
}) {
  const words = item.title.split(' ');

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={[
        'group relative overflow-hidden rounded-[2rem] border p-6 md:p-8 transition-all duration-500',
        active
          ? 'border-[#0827dc]/14 bg-[#fffdf8] shadow-[0_28px_80px_rgba(0,0,0,0.10)]'
          : 'border-black/8 bg-[#fcfaf5] hover:border-black/12 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]',
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.46),transparent_42%)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#0827dc]/8 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0827dc]">
              {item.id}
            </span>
            <span className="rounded-full border border-black/8 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-black/42">
              {item.tag}
            </span>
          </div>

          <div
            className={[
              'h-3 w-3 rounded-full transition-all duration-500',
              active ? 'bg-[#0827dc] shadow-[0_0_24px_rgba(8,39,220,0.55)]' : 'bg-black/12',
            ].join(' ')}
          />
        </div>

        <div className="mt-6">
          <p
            className={`font-mono text-[9px] tracking-[0.28em] text-black/34 ${
              microCase === 'upper' ? 'uppercase' : ''
            }`}
          >
            {item.micro}
          </p>

          <h4 className="mt-3 text-[2rem] font-semibold leading-[0.94] tracking-[-0.06em] text-[#111111] md:text-[2.8rem]">
            {stackTitle ? (
              words.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className={idx === words.length - 1 ? 'block text-[#0827dc]' : 'block'}
                >
                  {word}
                </span>
              ))
            ) : (
              <>
                {words.slice(0, -1).join(' ')}
                {words.length > 1 ? ' ' : ''}
                <span className="text-[#0827dc]">{words[words.length - 1]}</span>
              </>
            )}
          </h4>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-black/60 md:text-[1.02rem]">
            {item.detail}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/8 pt-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/34">
            {footerLabel}
          </span>

          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-black/10" />
              <div className="absolute inset-[7px] rounded-full border border-[#0827dc]/30" />
              <div className="h-2 w-2 rounded-full bg-[#0827dc]" />
            </motion.div>

            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/34">
              {statusLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
