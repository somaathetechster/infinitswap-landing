'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Infrastructure() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Text & Content Entrance
      const elements = containerRef.current?.querySelectorAll('.reveal');
      if (elements) {
        gsap.fromTo(elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            }
          }
        );
      }

      // 2. Stats Hover/Glow effect
      const stats = statsRef.current?.children;
      if (stats) {
        gsap.fromTo(stats, 
          { scale: 0.95, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            stagger: 0.2, 
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 px-6 md:px-10 bg-transparent overflow-hidden"
    >
      {/* Background Architectural Grid (Subtle Blueprint) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div ref={containerRef} className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: The Human Story */}
        <div className="lg:col-span-6">
          <div className="reveal">
            <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] mb-12 block font-bold border-l-2 border-infinite-blue pl-4">
              Infrastructure // Reliability Layer
            </span>
          </div>
          
          <h2 className="reveal font-display text-6xl md:text-[7.5rem] leading-[0.85] uppercase mb-10 text-ink-black tracking-tighter">
            Bridging <br />
            <span className="text-ink-black/20 italic">The Gaps.</span>
          </h2>
          
          <p className="reveal font-body text-xl md:text-2xl text-ink-black/60 leading-tight max-w-xl">
          We architect the digital pathways. Our engine routes settlement instructions 
          to authorized partners, enabling instant execution without friction.
          </p>
        </div>

        {/* Right Column: The Visual Architecture & Stats */}
        <div className="lg:col-span-6 relative">
          {/* Glass Card for Stats */}
          <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-10 md:p-16 rounded-sm shadow-2xl shadow-infinite-blue/5">
            <h3 className="font-mono text-[11px] uppercase tracking-widest mb-10 text-infinite-blue font-bold">
              Real-Time Performance
            </h3>
            
            <div ref={statsRef} className="space-y-12">
              <div className="group">
                <span className="font-mono text-[10px] uppercase opacity-40 block mb-3 group-hover:text-infinite-blue transition-colors">
                  Network Availability
                </span>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl md:text-7xl uppercase italic leading-none">99.99%</span>
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              <div className="group">
                <span className="font-mono text-[10px] uppercase opacity-40 block mb-3 group-hover:text-infinite-magenta transition-colors">
                  Settlement Velocity
                </span>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl md:text-7xl uppercase italic leading-none text-infinite-magenta">INSTANT</span>
                </div>
                <p className="font-mono text-[9px] mt-4 opacity-30 uppercase tracking-tighter italic">
                  *Verified sub-second handshake across multi-regional rails.
                </p>
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-infinite-blue/20" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-infinite-magenta/20" />
          </div>
        </div>

      </div>
    </section>
  );
}