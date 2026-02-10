'use client';
import { motion } from 'framer-motion';
import AdvancedGlobe from '../../components/NetworkGlobe';

export default function NetworkPage() {
  return (
    <div className="min-h-screen pt-32 bg-transparent overflow-hidden relative">
      
      {/* HEADER: Institutional Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8 relative z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] font-bold mb-6 block">
            Global Infrastructure // Live Map
          </span>
          <h1 className="font-display text-6xl md:text-[8rem] uppercase leading-[0.8] tracking-tighter text-ink-black">
            The <br />
            <span className="text-infinite-magenta italic">Liquidity</span> <br /> 
            <span className="text-infinite-magenta italic">Grid.</span>
          </h1>
        </motion.div>
      </div>

      {/* 3D GLOBE CONTAINER */}
      <div className="relative w-full border-y border-black/5 min-h-[80vh]">
        {/* Dark Gradient Backdrop - Essential for the Shaders to Pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-transparent z-0 opacity-90" />
        
        {/* THE NEW ADVANCED GLOBE */}
        <AdvancedGlobe />
        
        {/* Overlay Stats */}
        <div className="absolute bottom-10 left-6 md:left-10 hidden md:block pointer-events-none z-20">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-3 opacity-70 bg-black/80 text-white p-4 border border-infinite-magenta backdrop-blur-md shadow-lg rounded-sm">
             <div className="flex items-center gap-3 mb-2">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="font-bold text-infinite-blue">System Status: Nominal</span>
             </div>
             <p>Active Routes: LOS-JNB-NBO</p>
             <p>Latency Avg: 24ms</p>
             <p className="text-infinite-magenta">Syncing with Mainnet...</p>
          </div>
        </div>
      </div>

      {/* FOOTER LOGS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <p className="font-body text-sm md:text-base leading-relaxed text-ink-black/70">
          The Infinitswap grid ensures that no matter where the transaction originates, 
          it is settled through the closest, most liquid local rail.
        </p>
        <div className="font-mono text-[10px] uppercase text-right opacity-50 space-y-1">
           <p> Tracking Vector: LOS_JNB_ACC</p>
           <p> Protocol: V4.0.2 Secure</p>
           <p> Render Engine: WebGL 2.0</p>
        </div>
      </div>
    </div>
  );
}