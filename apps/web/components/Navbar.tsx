'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AccessBotButton from './AccessBotButton';

export default function Navbar() {
  const [times, setTimes] = useState({ lagos: '--:--:--', joburg: '--:--:--', accra: '--:--:--', daressalam: '--:--:--' });

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      setTimes({
        lagos: new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Africa/Lagos' }).format(new Date()),
        joburg: new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Africa/Johannesburg' }).format(new Date()),
        accra: new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Africa/Accra' }).format(new Date()),
        daressalam: new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Africa/Dar_es_Salaam' }).format(new Date()),
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 flex flex-col pointer-events-none">
      {/* LAYER 01: SYSTEM MONITOR */}
      <div className="w-full bg-parchment/80 backdrop-blur-md border-b border-black/5 px-10 py-2 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-ink-black/40">
              System Online // Africa
            </span>
          </div>
          
          <div className="hidden lg:flex gap-6 border-l border-black/10 pl-6">
            <div className="flex gap-2">
              <span className="font-mono text-[9px] text-infinite-blue uppercase font-bold">LOS</span>
              <span suppressHydrationWarning className="font-mono text-[9px] text-ink-black/60">{times.lagos}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono text-[9px] text-infinite-blue uppercase font-bold">JNB</span>
              <span suppressHydrationWarning className="font-mono text-[9px] text-ink-black/60">{times.joburg}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono text-[9px] text-infinite-blue uppercase font-bold">ACC</span>
              <span suppressHydrationWarning className="font-mono text-[9px] text-ink-black/60">{times.accra}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono text-[9px] text-infinite-blue uppercase font-bold">DAR</span>
              <span suppressHydrationWarning className="font-mono text-[9px] text-ink-black/60">{times.daressalam}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-1 w-24 bg-black/5 rounded-full overflow-hidden">
            <div className="h-full bg-infinite-blue w-2/3 animate-[pulse_2s_infinite]" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-ink-black/30">
            Latency: 14ms
          </span>
        </div>
      </div>

      {/* LAYER 02: PRIMARY NAVIGATION */}
      <div className="w-full px-10 py-6 flex justify-between items-center pointer-events-auto">
        <Link href="/" className="block -mt-20 group">
          <img 
            src="/logob.png" 
            alt="Infinitswap" 
            className="h-40 w-auto object-contain 
                       transition-all duration-300 ease-out
                       hover:drop-shadow-[0_0_8px_rgba(8,39,220,0.3)]
                       hover:scale-105
                       active:scale-95 active:duration-100" 
          />
        </Link>
        
        <div className="flex items-center gap-12">
          {/* MAPPING: UI Name -> Physical Page Path */}
          <div className="hidden md:flex gap-10 font-body text-[10px] uppercase tracking-[0.3em] font-bold text-ink-black/60">
            <Link href="/protocol" className="hover:text-infinite-blue transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-infinite-blue after:transition-all hover:after:w-full">
              How It Works
            </Link>
            <Link href="/network" className="hover:text-infinite-blue transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-infinite-blue after:transition-all hover:after:w-full">
              Rates & Regions
            </Link>
            <Link href="/compliance" className="hover:text-infinite-blue transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-infinite-blue after:transition-all hover:after:w-full">
              Trust & Safety
            </Link>
          </div>
          
          <AccessBotButton />
        </div>
      </div>
    </nav>
  );
}