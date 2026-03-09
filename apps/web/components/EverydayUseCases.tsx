'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const USE_CASES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    name: "Lagos, Nigeria",
    action: "+152,000.00 NGN",
    bank: "GTBank // Credit",
    accent: "#e25822",
    bankInitial: "GT"
  },
  {
    id: 2,
    // High-energy young woman in a modern setting - Verified Link
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop", 
    name: "Accra, Ghana",
    action: "+720.50 GHS",
    bank: "MTN MoMo // Received",
    accent: "#FFCB05",
    bankInitial: "M"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    name: "Joburg, SA",
    action: "+1,850.00 ZAR",
    bank: "Capitec // Instant",
    accent: "#0033aa",
    bankInitial: "C"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    name: "Dar Es Salam, Tanzania",
    action: "+12,400 TZS",
    bank: "M-Pesa // Success",
    accent: "#4bba2e",
    bankInitial: "MP"
  }
];

export default function EverydayUseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fix: Initialize useScroll without target first to avoid hydration error
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Superior Effect: Subtle parallax for the header based on scroll
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-40 bg-[#020410] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#0827dc]/5 blur-[150px] rounded-full -z-0" />

      {/* HEADER */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-[0.6em] mb-4 block">
            Real People // Real Settlement
          </span>
          <h2 className="font-display text-6xl md:text-[8vw] text-white uppercase tracking-tighter leading-[0.8] mb-6">
            Crypto <br />
            <span className="text-[#fe009c] italic">Homegrown.</span>
          </h2>
          <p className="font-body text-xl text-white/40 max-w-lg">
            We’ve removed the complexity. Swap USDT and watch the credit alert hit your phone in seconds.
          </p>
        </motion.div>
      </div>

      {/* THE CARDS - Attached the Ref here to fix the "Defined" error */}
      <div 
        ref={containerRef}
        className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-6 md:pl-10 relative z-10 pb-10"
      >
        <div className="flex gap-8 w-max pr-10">
          {USE_CASES.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative w-[320px] md:w-[450px] h-[550px] md:h-[650px] rounded-[3.5rem] overflow-hidden snap-center shrink-0 group border border-white/5 shadow-2xl"
            >
              {/* IMAGE BACKGROUND */}
              <img 
                src={item.image} 
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-[0.6] group-hover:brightness-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

              {/* THE BANK CREDIT NOTIFICATION - Cinematic Glassmorphism */}
              <div className="absolute top-10 left-6 right-6">
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="bg-white/95 backdrop-blur-2xl p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/20"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold shadow-lg" 
                    style={{ backgroundColor: item.accent }}
                  >
                    {item.bankInitial}
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[9px] uppercase text-black/40 tracking-[0.2em]">{item.bank}</p>
                    <p className="font-display text-2xl text-black font-black tracking-tight">{item.action}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </motion.div>
              </div>

              {/* BOTTOM LABEL */}
              <div className="absolute bottom-12 left-10">
                <p className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-[0.4em] mb-2 opacity-60">Location // Node</p>
                <h4 className="text-white text-4xl font-display uppercase tracking-tighter leading-none group-hover:text-[#fe009c] transition-colors duration-500">
                  {item.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CUSTOM SCROLLBAR HIDER */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}