'use client';
import Protocol from '../../components/Protocol';
import { motion } from 'framer-motion';

export default function ProtocolPage() {
  return (
    <div className="pt-40 bg-transparent">
      <section className="px-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.5em] font-bold mb-6 block">
            System Documentation // v4.0.2
          </span>
          <h1 className="font-display text-7xl md:text-9xl uppercase leading-none tracking-tighter mb-10">
            The <span className="text-infinite-magenta italic">Rules</span> <br /> of Flow.
          </h1>
          <p className="font-body text-xl md:text-2xl text-ink-black/60 max-w-2xl leading-relaxed">
            Infinitswap operates on a strictly defined orchestration protocol. 
            Every swap is a multi-layered handshake between user intent, 
            liquidity aggregation, and sovereign regulatory rails.
          </p>
        </motion.div>
      </section>

      {/* Reuse the Protocol component we built earlier */}
      <Protocol />
      
      {/* Additional Technical Specs Block */}
      <section className="py-32 px-10 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h4 className="font-display text-xl uppercase">Atomic Finality</h4>
            <p className="text-sm opacity-50 font-body">
              Transactions are only marked as complete once the local RTGS 
              confirms credit. Zero-risk settlement.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-display text-xl uppercase">Spread Optimization</h4>
            <p className="text-sm opacity-50 font-body">
              Our engine sweeps multiple providers to capture the mid-market rate, 
              reducing slippage by up to 2.4%.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-display text-xl uppercase">Compliance Stack</h4>
            <p className="text-sm opacity-50 font-body">
              Built-in AML/KYC triggers that respond to jurisdictional 
              requirements in real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}