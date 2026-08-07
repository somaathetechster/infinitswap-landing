'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'What exactly is Infinitswap?',
    answer:
      'Infinitswap is a full financial account built inside WhatsApp — wallets in Naira, Cedis, Rand, and more, plus savings, bill payments, and crypto-to-cash conversion, all in one chat. No app to download.',
  },
  {
    id: 2,
    question: 'Can I save money with Infinitswap?',
    answer:
      'Yes — round-up, goal, locked, and interest-bearing savings, all set up in chat.',
  },
  {
    id: 3,
    question: 'What bills can I pay?',
    answer:
      'Airtime, data, electricity, water, cable TV, betting wallets, and more, across all seven supported countries — one-time or on autopay.',
  },
  {
    id: 4,
    question: 'How fast is the settlement?',
    answer:
      'Most transactions are settled within 3–5 minutes after on-chain confirmation, depending on network conditions and payout rail timing.',
  },
  {
    id: 5,
    question: 'Is there an app I need to download?',
    answer:
      'No. Infinitswap works through chat, so there is no separate app to install or manage.',
  },
  {
    id: 6,
    question: 'Which currencies do you support?',
    answer:
      'We currently support NGN, GHS, ZAR, TZS, KES, UGX, and RWF — Nigeria, Ghana, South Africa, Tanzania, Kenya, Uganda, and Rwanda — plus USDT, with more local rails being added over time.',
  },
  {
    id: 7,
    question: 'Is my transaction secure?',
    answer:
      'Yes. Transactions are tracked through the flow and users receive status updates throughout the payout process.',
  },
];

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[1.5rem] bg-[#f8f5ef] px-5 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:px-7 md:py-6"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span className="mt-1 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#0827dc]/8 px-2 font-mono text-[10px] font-bold tracking-[0.16em] text-[#0827dc]">
            {String(item.id).padStart(2, '0')}
          </span>

          <span className="max-w-3xl text-lg font-semibold leading-[1.15] tracking-[-0.03em] text-[#111111] md:text-[1.7rem]">
            {item.question}
          </span>
        </div>

        <span
          className={[
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            isOpen
              ? 'rotate-45 border-[#0827dc] bg-[#0827dc] text-white'
              : 'border-black/10 bg-white text-black/70',
          ].join(' ')}
        >
          <span className="text-[1.75rem] leading-none">+</span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pl-12 pt-5 md:pl-14">
              <div className="mb-5 h-px w-full bg-black/8" />
              <p className="max-w-3xl text-[15px] leading-relaxed text-black/68 md:text-lg">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function FAQ() {
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section className="relative overflow-hidden bg-[#0827dc] px-6 py-20 text-white md:px-10 md:py-28">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-white/70">
            FAQ / Support
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
            Everything you need to know about holding, saving, spending and
            swapping money with Infinitswap.
          </p>
        </div>

        <div className="grid gap-4">
          {FAQS.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <FAQRow
                key={faq.id}
                item={faq}
                isOpen={isOpen}
                onToggle={() => setActiveId(isOpen ? null : faq.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}