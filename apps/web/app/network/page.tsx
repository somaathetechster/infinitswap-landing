'use client';
import { motion } from 'framer-motion';
import AdvancedGlobe from '../../components/NetworkGlobe';

export default function NetworkPage() {
  return (
    <div className="min-h-screen pt-48 bg-transparent overflow-hidden relative">
      
      {/* HEADER: Massive, Staggered Typography */}
      <div className="w-full px-6 md:px-10 mb-12 relative z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] font-bold mb-6 block border-l-2 border-infinite-blue pl-4">
            Infrastructure // Live Map
          </span>
          <h1 className="font-display text-[15vw] md:text-[11vw] uppercase leading-[0.8] tracking-tighter text-ink-black flex flex-col">
            <span>Our Global</span>
            <span className="text-infinite-magenta italic md:self-end">Network.</span>
          </h1>
        </motion.div>
      </div>

      {/* 3D GLOBE CONTAINER */}
      <div className="relative w-full border-y border-black/5 min-h-[70vh] md:min-h-[85vh] flex items-center justify-center">
        
        {/* Clean, Light Backdrop - Allows the WhatsApp-green globe to shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-white to-parchment z-0" />
        
        {/* THE ADVANCED GLOBE */}
        <div className="w-full h-full relative z-10">
            <AdvancedGlobe />
        </div>
        
        {/* Overlay Stats: Modern Glassmorphism Style */}
        <div className="absolute bottom-12 right-6 md:right-10 pointer-events-none z-20">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-3 bg-white/40 backdrop-blur-xl p-6 border border-white/60 shadow-2xl shadow-infinite-blue/5 rounded-sm max-w-xs">
             <div className="flex items-center gap-3 mb-4">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="font-bold text-infinite-blue">System: Nominal</span>
             </div>
             
             <div className="space-y-2 opacity-60">
                <p className="flex justify-between font-bold">Routes: <span className="text-ink-black italic">NG • GH • SA • KE</span></p>
                <p className="flex justify-between">Latency: <span className="text-ink-black italic">14ms</span></p>
                <p className="flex justify-between">Nodes: <span className="text-ink-black italic">Active (V4)</span></p>
             </div>
             
             <div className="mt-4 pt-4 border-t border-black/5">
                <p className="text-infinite-magenta animate-pulse font-bold">Syncing Mainnet Liquidity...</p>
             </div>
          </div>
        </div>
      </div>

      {/* FOOTER LOGS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-3xl uppercase mb-6">Local Precision. <br/>Global Scale.</h2>
          <p className="font-body text-lg leading-relaxed text-ink-black/60 max-w-md">
            The Infinitswap grid ensures that no matter where the transaction originates, 
            it is settled through the closest, most liquid local rail. We bridge the gap 
            between digital assets and traditional bank accounts in seconds.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end justify-end">
            <div className="font-mono text-[10px] uppercase text-left md:text-right opacity-30 space-y-1 border-l md:border-l-0 md:border-r border-black/20 pl-4 md:pl-0 md:pr-4">
               <p> Tracking Vector: LOS_JNB_ACC_NBO</p>
               <p> Protocol: V4.0.2 Secure // TLS 1.3</p>
               <p> Engine: WebGL 2.0 // Render_04</p>
               <p> Status: 99.99% Uptime Verified</p>
            </div>
        </div>
      </div>
    </div>
  );
}