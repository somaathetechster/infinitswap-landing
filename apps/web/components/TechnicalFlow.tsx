'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

const STEPS = [
  { 
    label: "Live Pricing", 
    tag: "01_RATES", 
    desc: "Our bot scans the market by the millisecond, ensuring you are quoted the absolute highest exchange rate available." 
  },
  { 
    label: "Unique Wallets", 
    tag: "02_SECURITY", 
    desc: "Every time you trade, we generate a brand new, one-time TRC20 address. Your funds are never mixed or delayed." 
  },
  { 
    label: "Zero Gas Fees", 
    tag: "03_NETWORK", 
    desc: "We absorb the complex blockchain network fees in the background. The rate you see is exactly what hits your bank." 
  },
  { 
    label: "Local Payouts", 
    tag: "04_DELIVERY", 
    desc: "We connect directly to local payment providers (like Paystack and Flutterwave) to release your cash instantly." 
  }
];

export default function TechnicalFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // 1. Draw the Line
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        }
      });
    }

    // 2. Animate the "Data Packet" moving along the line
    if (packetRef.current && pathRef.current) {
        gsap.to(packetRef.current, {
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
            },
            duration: 4,
            repeat: -1,
            ease: "power1.inOut",
        });
    }

  }, []);

  return (
    <section ref={containerRef} className="min-h-[80vh] py-32 px-6 md:px-10 relative overflow-hidden bg-transparent">
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="mb-24 md:mb-32 max-w-2xl">
          <span className="font-mono text-[10px] text-infinite-blue uppercase tracking-[0.6em] font-bold mb-6 block border-l-2 border-infinite-blue pl-4">
            Behind The Scenes // The Engine
          </span>
          <h3 className="font-display text-5xl md:text-7xl uppercase tracking-tighter text-ink-black leading-[0.9]">
            Built For <br/>
            <span className="text-infinite-magenta italic">Speed.</span>
          </h3>
          <p className="font-body text-lg text-ink-black/60 mt-6 leading-relaxed">
            Here is exactly what happens in the background during the 60 seconds it takes to turn your crypto into cash.
          </p>
        </div>
        
        {/* The Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* THE SVG CONNECTOR SYSTEM */}
          <div className="hidden md:block absolute top-[4rem] left-0 w-full h-20 -z-10 pointer-events-none">
            <svg width="100%" height="100%" className="overflow-visible">
              {/* The Line Path */}
              <path 
                ref={pathRef}
                d="M 50 10 L 1200 10" 
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Gradient Definition for the Line */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0827dc" />
                  <stop offset="100%" stopColor="#fe009c" />
                </linearGradient>
              </defs>
              
              {/* The Moving Data Packet */}
              <circle ref={packetRef} r="4" fill="#fe009c" className="filter drop-shadow-[0_0_8px_rgba(254,0,156,0.8)]" />
            </svg>
          </div>
          
          {/* CARDS */}
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-sm hover:bg-white/60 transition-all duration-500 group"
            >
              {/* Step Indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-mono text-[10px] font-bold group-hover:bg-infinite-blue group-hover:text-white transition-colors">
                    {i + 1}
                </div>
                <span className="font-mono text-[9px] text-infinite-blue font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    {step.tag}
                </span>
              </div>

              <h4 className="font-display text-2xl uppercase mb-4 text-ink-black group-hover:text-infinite-blue transition-colors">
                {step.label}
              </h4>
              
              <p className="font-body text-sm text-ink-black/60 leading-relaxed min-h-[60px]">
                {step.desc}
              </p>

              {/* Progress Bar Bottom */}
              <div className="w-full h-[2px] bg-black/5 mt-8 relative overflow-hidden">
                 <div className="absolute left-0 top-0 h-full w-full bg-infinite-blue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}