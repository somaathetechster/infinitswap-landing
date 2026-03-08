// apps/web/components/hero.tsx

'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scene from './Scene';

export default function Hero() {
  const orchestrateRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Replace this with your actual WhatsApp Bot Number (no plus sign, e.g., 234...)
  const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER"; 
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (orchestrateRef.current) {
      gsap.to(orchestrateRef.current, {
        x: '-20%', // Adjusted for the new, shorter text
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5, 
        },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex flex-col bg-transparent overflow-hidden">
      {/* 3D Scene - Depth Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* TOP DECK: SYSTEM STATUS HEADER */}
      <div className="z-20 w-full pt-32 px-10 flex justify-between items-start pointer-events-none">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-infinite-blue font-bold">
            Live // WhatsApp Bot
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">System Online</span>
          </div>
        </div>
        
        <div className="text-right hidden md:block">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Instant Settlement</span>
          <p className="font-mono text-[9px] uppercase tracking-tighter mt-1">
            Supported: NGN / KES / ZAR / GHS
          </p>
        </div>
      </div>

      {/* MAIN DECK: ARCHITECTURAL CONTENT */}
      <div className="flex-1 flex flex-col justify-center px-10 z-10">
        <div className="max-w-full">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[15vw] md:text-[13rem] tracking-tighter leading-[0.75] uppercase text-ink-black flex flex-col pointer-events-none"
          >
            <span className="block">Crypto</span>
            <span 
              ref={orchestrateRef}
              className="text-infinite-magenta italic whitespace-nowrap will-change-transform inline-block"
            >
              To Cash.
            </span>
          </motion.h1>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="md:col-span-6 pointer-events-none"
            >
              <p className="font-body text-xl md:text-2xl text-ink-black/80 leading-tight">
                Turn your USDT into Naira, Cedis, or Rand instantly. No apps, no complex exchanges—just send a WhatsApp message and get paid directly to your bank account.
              </p>
            </motion.div>

            {/* CALL TO ACTION BUTTON */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="md:col-span-6 flex md:justify-end pb-2"
            >
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-ink-black text-white font-mono text-sm uppercase tracking-widest overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Chatting Now
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-infinite-magenta transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 z-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM DECK: TICKER RAIL */}
      <div className="z-20 w-full py-6 border-t border-black/5 px-10 flex justify-between items-center pointer-events-none overflow-hidden bg-parchment/50 backdrop-blur-sm">
        <div className="flex gap-12 animate-marquee whitespace-nowrap opacity-60">
           <span className="font-mono text-xs uppercase tracking-widest">⚡ Instant Payouts</span>
           <span className="font-mono text-xs uppercase tracking-widest">• Zero Hidden Fees</span>
           <span className="font-mono text-xs uppercase tracking-widest">• 24/7 Automated Swaps</span>
           <span className="font-mono text-xs uppercase tracking-widest">• Best FX Rates</span>
        </div>
      </div>
    </section>
  );
}