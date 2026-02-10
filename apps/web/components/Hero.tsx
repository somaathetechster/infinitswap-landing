'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scene from './Scene';
import AccessBotButton from './AccessBotButton';

export default function Hero() {
  const orchestrateRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (orchestrateRef.current) {
      // Create the horizontal reveal effect
      gsap.to(orchestrateRef.current, {
        x: '-100%', // Adjust this percentage based on how much text is cut off
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5, // Ties animation smoothly to scroll speed
        },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex flex-col bg-transparent overflow-hidden">
      {/* 3D Scene - Depth Layer */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* TOP DECK: SYSTEM STATUS HEADER */}
      <div className="z-20 w-full pt-32 px-10 flex justify-between items-start pointer-events-none">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-infinite-blue font-bold">
            System // Liquidity Node 04
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">Network: Mainnet-V4</span>
          </div>
        </div>
        
        <div className="text-right hidden md:block">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Latency: 14ms</span>
          <p className="font-mono text-[9px] uppercase tracking-tighter mt-1">
            Settling: NGN / KES / ZAR / GHS
          </p>
        </div>
      </div>

      {/* MAIN DECK: ARCHITECTURAL CONTENT */}
      <div className="flex-1 flex flex-col justify-center px-10 z-10 pointer-events-none">
        <div className="max-w-full">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[15vw] md:text-[13rem] tracking-tighter leading-[0.75] uppercase text-ink-black flex flex-col"
          >
            <span className="block">Liquidity</span>
            <span 
              ref={orchestrateRef}
              className="text-infinite-magenta italic whitespace-nowrap will-change-transform inline-block"
            >
              Orchestration.
            </span>
          </motion.h1>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="md:col-span-6"
            >
              <p className="font-body text-xl md:text-2xl text-ink-black/80 leading-tight">
                Beyond simple swaps, Infinitswap is a world-standard conversational engine 
                bridging digital assets with institutional fiat architecture 
                across Pan-African markets.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="md:col-span-6 flex md:justify-end pointer-events-auto pb-2"
            >
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM DECK: TICKER RAIL (Simplified for brevity) */}
      <div className="z-20 w-full py-6 border-t border-black/5 px-10 flex justify-between items-center pointer-events-none overflow-hidden bg-parchment/50 backdrop-blur-sm">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
           {/* Your existing ticker items here */}
        </div>
      </div>
    </section>
  );
}