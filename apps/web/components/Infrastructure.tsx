'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const USE_CASES = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop',
    action: 'Paid a designer',
    recipient: 'for a logo project in naira',
    bankColor: 'bg-[#fe009c]',
    bankInitial: '₦',
    alt: 'Creative freelancer being paid for a design service',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop',
    action: 'Received money',
    recipient: 'from family in another African country',
    bankColor: 'bg-[#0827dc]',
    bankInitial: 'AF',
    alt: 'Woman receiving money support from a relative abroad',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    action: 'Bought airtime',
    recipient: 'and topped up mobile data instantly',
    bankColor: 'bg-[#4bba2e]',
    bankInitial: 'AIR',
    alt: 'Person using a phone to buy airtime and data',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    action: 'Sent an invoice',
    recipient: 'and got paid through chat',
    bankColor: 'bg-[#00b578]',
    bankInitial: 'INV',
    alt: 'Small business owner sending an invoice and getting paid',
  },
];

export default function EverydayUseCases() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-t border-white/5 bg-[#010208] py-32"
    >
      {/* HEADER */}
      <div className="mx-auto mb-16 max-w-7xl px-6 md:mb-24 md:px-10">
        <motion.h2
          style={{ y }}
          className="font-display text-5xl uppercase leading-[0.85] tracking-tighter text-white md:text-7xl"
        >
          Where Crypto Meets <br />
          <span className="text-infinite-magenta italic">Everyday Life.</span>
        </motion.h2>
      </div>

      {/* HORIZONTAL GALLERY */}
      <div className="hide-scrollbar w-full snap-x snap-mandatory overflow-x-auto pl-6 pb-10 md:pl-10">
        <div className="flex w-max gap-6 pr-10">
          {USE_CASES.map((useCase) => (
            <motion.div
              key={useCase.id}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative h-[450px] w-[300px] shrink-0 snap-center overflow-hidden rounded-[2rem] shadow-2xl md:h-[550px] md:w-[380px]"
            >
              {/* IMAGE */}
              <img
                src={useCase.image}
                alt={useCase.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65" />

              {/* TOP USE CASE PILL */}
              <div className="absolute left-6 right-6 top-6">
                <div className="flex items-center gap-3 rounded-full bg-white/95 px-2 py-2 shadow-xl backdrop-blur-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-infinite-magenta/10">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fe009c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display text-sm font-bold leading-tight text-ink-black">
                      {useCase.action}
                    </span>
                    <span className="font-body text-[11px] text-ink-black/60">
                      {useCase.recipient}
                    </span>
                  </div>
                </div>
              </div>

              {/* OPTIONAL BOTTOM CONTEXT TEXT */}
              <div className="absolute bottom-24 left-6 right-6">
                <p className="max-w-[85%] font-body text-sm leading-relaxed text-white/88 md:text-base">
                  {useCase.id === 1 &&
                    'Use crypto to settle real creative work quickly, without payment friction.'}
                  {useCase.id === 2 &&
                    'Receive support from loved ones across borders and access it locally with ease.'}
                  {useCase.id === 3 &&
                    'Turn digital value into something immediately useful for daily communication.'}
                  {useCase.id === 4 &&
                    'Help freelancers and small businesses move from invoice to payment faster.'}
                </p>
              </div>

              {/* BOTTOM BADGE */}
              <div className="absolute bottom-6 left-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <div
                    className={`${useCase.bankColor} flex h-full w-full items-center justify-center rounded-xl`}
                  >
                    <span className="font-display text-lg font-bold text-white">
                      {useCase.bankInitial}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </section>
  );
}