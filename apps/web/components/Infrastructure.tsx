'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Infrastructure() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

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

      // 2. WhatsApp Chat Bubbles Animation
      const bubbles = chatRef.current?.children;
      if (bubbles) {
        gsap.fromTo(bubbles,
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.8, // Delays each bubble to look like a real conversation
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: chatRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // 3. Stats Hover/Glow effect
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
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div ref={containerRef} className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: The Human Story */}
        <div className="lg:col-span-6">
          <div className="reveal">
            <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] mb-12 block font-bold border-l-2 border-infinite-blue pl-4">
              How It Works // Simple & Fast
            </span>
          </div>
          
          <h2 className="reveal font-display text-6xl md:text-[7.5rem] leading-[0.85] uppercase mb-10 text-ink-black tracking-tighter">
            Chat. Send.<br />
            <span className="text-ink-black/20 italic">Get Paid.</span>
          </h2>
          
          <p className="reveal font-body text-xl md:text-2xl text-ink-black/60 leading-tight max-w-xl">
            No confusing charts, no wallet connect buttons, no waiting for withdrawals. Just text our smart assistant, send your USDT, and the cash hits your local bank account instantly.
          </p>
        </div>

        {/* Right Column: WhatsApp Mockup + Stats */}
        <div className="lg:col-span-6 relative">
          
          <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-sm shadow-2xl shadow-infinite-blue/5">
            
            {/* 🟢 NEW: WHATSAPP CHAT MOCKUP */}
            <div ref={chatRef} className="flex flex-col gap-4 mb-12 font-body text-sm">
              {/* User Bubble */}
              <div className="self-end bg-[#E7FFDB] text-ink-black px-4 py-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                Hi, I want to sell 100 USDT.
              </div>
              {/* Bot Bubble 1 */}
              <div className="self-start bg-white text-ink-black px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-black/5">
                <span className="text-infinite-blue font-bold block mb-1">Infinitswap</span>
                Current rate is 1,520 NGN. You will receive <strong>152,000 NGN</strong>. Send USDT to this address:
                <br/><span className="font-mono text-[10px] bg-black/5 px-1 py-0.5 rounded mt-2 block break-all">TXYZ123...890</span>
              </div>
              {/* Bot Bubble 2 (Success) */}
              <div className="self-start bg-white text-ink-black px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-black/5">
                <span className="text-infinite-blue font-bold block mb-1">Infinitswap</span>
                ✅ <strong>Payment Sent!</strong> 152,000 NGN has been deposited into your Access Bank account.
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black/5 mb-8" />

            {/* Existing Stats (Slightly simplified to fit below the chat) */}
            <div ref={statsRef} className="flex justify-between items-end">
              <div className="group">
                <span className="font-mono text-[10px] uppercase opacity-40 block mb-2 group-hover:text-infinite-blue transition-colors">
                  Average Time
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl uppercase italic leading-none">60 SEC</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              <div className="group text-right">
                <span className="font-mono text-[10px] uppercase opacity-40 block mb-2 group-hover:text-infinite-magenta transition-colors">
                  Hidden Fees
                </span>
                <div className="flex items-baseline justify-end gap-2">
                  <span className="font-display text-4xl uppercase italic leading-none text-infinite-magenta">ZERO</span>
                </div>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-infinite-blue/20" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-infinite-magenta/20" />
          </div>
        </div>

      </div>
    </section>
  );
}