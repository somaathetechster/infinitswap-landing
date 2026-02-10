'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const LAYERS = [
  { 
    id: "01", 
    title: "Intelligent Routing", 
    tag: "INPUT LAYER",
    detail: "Simply tell the bot what you need. Our system instantly maps your request to the most efficient payout corridor." 
  },
  { 
    id: "02", 
    title: "Rate Optimization", 
    tag: "PRICING ENGINE",
    detail: "We scan multiple liquidity providers in real-time to guarantee you the best possible exchange rate, every single time." 
  },
  { 
    id: "03", 
    title: "Automated Security", 
    tag: "COMPLIANCE",
    detail: "Safety without the slowdown. Identity and fraud checks happen automatically in the background, ensuring every trade is secure." 
  },
  { 
    id: "04", 
    title: "Instant Settlement", 
    tag: "OUTPUT LAYER",
    detail: "The moment the trade is confirmed, funds are released directly to the local bank account. No waiting periods." 
  }
];

export default function Protocol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. Progress Line Animation
    if (lineRef.current) {
        gsap.fromTo(lineRef.current,
            { height: "0%" },
            { 
                height: "100%", 
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 0.5
                }
            }
        );
    }

    // 2. Item Activation Animation
    const items = gsap.utils.toArray('.protocol-item');
    items.forEach((item: any, index) => {
      // Fade in and slide up
      gsap.fromTo(item, 
        { opacity: 0.3, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 px-6 md:px-10 border-t border-black/5 bg-transparent overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Sticky Header & Narrative */}
        <div className="lg:sticky lg:top-32 h-fit">
           <div className="mb-12">
             <span className="font-mono text-[10px] text-infinite-blue font-bold uppercase tracking-[0.6em] block mb-4 border-l-2 border-infinite-blue pl-4">
               The Protocol // Workflow
             </span>
             <h2 className="font-display text-5xl md:text-[6rem] uppercase leading-[0.9] text-ink-black tracking-tighter mb-8">
               Seamless <br /> <span className="text-infinite-magenta italic">Execution.</span>
             </h2>
             <p className="font-body text-lg md:text-xl text-ink-black/60 max-w-md leading-relaxed">
               We’ve stripped away the complexity of cross-border finance. 
               Infinitswap handles the heavy lifting—compliance, pricing, and routing—so you just focus on the trade.
             </p>
           </div>
           
           {/* Decorative 'System Status' Box */}
           <div className="hidden lg:block p-6 bg-white/50 backdrop-blur-md border border-black/5 rounded-sm max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">System Active</span>
              </div>
              <p className="font-mono text-[10px] text-ink-black/40">
                  Listening for liquidity requests... <br/>
                  Latency: 12ms <br/>
                  Security: TLS 1.3 Enforced
              </p>
           </div>
        </div>

        {/* Right Side: The Protocol Steps (Circuit Board Layout) */}
        <div className="relative pl-8 md:pl-12">
          
          {/* The Vertical Circuit Line Background */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-black/5" />
          
          {/* The Active Progress Line (Fills on scroll) */}
          <div ref={lineRef} className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-infinite-blue to-infinite-magenta z-10" />

          <div className="space-y-20">
            {LAYERS.map((layer, index) => (
              <div 
                key={layer.id} 
                className="protocol-item relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[43px] md:-left-[59px] top-2 w-3 h-3 rounded-full border-2 border-white bg-black/10 group-hover:bg-infinite-magenta group-hover:scale-125 transition-all duration-300 z-20 shadow-sm" />
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-4">
                     <span className="font-mono text-xs font-bold text-infinite-blue">0{index + 1}</span>
                     <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 border border-black/10 px-2 py-1 rounded-sm">{layer.tag}</span>
                  </div>
                  
                  <h4 className="font-display text-3xl md:text-5xl uppercase text-ink-black group-hover:text-infinite-blue transition-colors duration-300">
                    {layer.title}
                  </h4>
                  
                  <p className="font-body text-ink-black/50 text-base md:text-lg max-w-lg leading-relaxed group-hover:text-ink-black/80 transition-colors duration-300">
                    {layer.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}