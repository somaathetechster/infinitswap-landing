'use client';
import Protocol from '../../components/Protocol';
import { motion } from 'framer-motion';

export default function ProtocolPage() {
  return (
    <div className="pt-48 bg-transparent min-h-screen">
      
      {/* HEADER: Massive, Staggered Typography */}
      <section className="px-6 md:px-10 mb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] font-bold mb-6 block border-l-2 border-infinite-blue pl-4">
            Execution // The Protocol
          </span>
          <h1 className="font-display text-[15vw] md:text-[11vw] uppercase leading-[0.8] tracking-tighter text-ink-black flex flex-col">
            <span>The Rules</span>
            <span className="text-infinite-magenta italic md:self-end">of Flow.</span>
          </h1>
          <div className="mt-12 md:mt-0 md:max-w-2xl">
            <p className="font-body text-xl md:text-2xl text-ink-black/60 leading-relaxed">
              Infinitswap operates on a strictly defined orchestration protocol. 
              We bridge user intent with bank-grade liquidity rails to ensure 
              your crypto arrives as cash, every single time.
            </p>
          </div>
        </motion.div>
      </section>

      {/* The Animated Timeline Component */}
      <Protocol />
      
      {/* Additional Technical Specs: The Trust Pillars */}
      <section className="py-40 px-6 md:px-10 border-t border-black/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-infinite-blue" />
                    <h4 className="font-display text-2xl uppercase tracking-tight">Instant Verification</h4>
                </div>
                <p className="text-base text-ink-black/50 font-body leading-relaxed">
                  Transactions are only finalized once the local bank confirms credit. 
                  This removes settlement risk and ensures you see your money instantly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-infinite-magenta" />
                    <h4 className="font-display text-2xl uppercase tracking-tight">Best-Rate Guarantee</h4>
                </div>
                <p className="text-base text-ink-black/50 font-body leading-relaxed">
                  Our engine sweeps multiple liquidity providers in real-time to capture the mid-market rate, 
                  eliminating hidden fees and slippage.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <h4 className="font-display text-2xl uppercase tracking-tight">Regulated Rails</h4>
                </div>
                <p className="text-base text-ink-black/50 font-body leading-relaxed">
                  Built-in AML triggers respond to jurisdictional requirements in real-time. 
                  Safety without the slowdown, powered by bank-grade security.
                </p>
              </div>

            </div>
            
            {/* Live Status Accent */}
            <div className="mt-24 pt-12 border-t border-black/5 flex justify-between items-center opacity-30">
                <span className="font-mono text-[9px] uppercase tracking-widest">Protocol Version: 4.0.2 Secure</span>
                <span className="font-mono text-[9px] uppercase tracking-widest">All Nodes Operational</span>
            </div>
        </div>
      </section>
    </div>
  );
}