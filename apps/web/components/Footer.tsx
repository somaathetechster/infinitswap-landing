'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SOCIALS = [
  { 
    name: 'X', 
    href: 'https://x.com/infinitswap_ai', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com/infinitswap.ai', 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ROW 1: BRANDING & MOTIVATION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          <div className="md:col-span-5 space-y-8">
            {/* CLICKABLE BRANDING - Opens www.infinitswap.ai */}
            <a href="https://www.infinitswap.ai" className="inline-block group">
              <h3 className="text-4xl font-sans font-black tracking-tighter text-infinite-blue transition-transform group-hover:scale-105 active:scale-95 duration-300">
                infinitswap
              </h3>
            </a>

            <p className="font-body text-xl text-ink-black/80 max-w-sm leading-snug">
              Stop waiting for withdrawals. <br />
              <span className="text-infinite-magenta font-bold">Swap USDT. Get Paid. Enjoy Life.</span> <br />
              The fastest way to spend your crypto in Africa.
            </p>

            {/* SOCIALS & MAIL */}
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {SOCIALS.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-ink-black/40 hover:bg-infinite-blue hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <a href="mailto:support@infinitswap.ai" className="font-mono text-[10px] uppercase tracking-widest text-ink-black/40 hover:text-infinite-blue transition-colors border-l border-black/10 pl-6 h-10 flex items-center">
                support@infinitswap.ai
              </a>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-black/40">The Product</h4>
              <ul className="space-y-2 font-body text-sm text-ink-black/70">
                <li><Link href="/#how-it-works" className="hover:text-infinite-blue transition-colors">Start Swapping</Link></li>
                <li><Link href="/#experience" className="hover:text-infinite-blue transition-colors">Success Stories</Link></li>
                <li><Link href="/#countries" className="hover:text-infinite-blue transition-colors">Network Status</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-black/40">Safety & Legal</h4>
              <ul className="space-y-2 font-body text-sm text-ink-black/70">
                <li><Link href="/legal/terms" className="hover:text-infinite-blue transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-infinite-blue transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-black/40">Direct Support</h4>
              <ul className="space-y-2 font-body text-sm text-ink-black/70">
                <li className="font-bold text-ink-black">+234 907 960 7916</li>
                <li className="text-infinite-blue text-[10px] font-mono animate-pulse">Available 24/7</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ROW 2: THE COMPLIANCE SHIELD */}
        <div className="mb-20">
          <div className="p-8 md:p-12 bg-black/[0.02] border border-black/5 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
            </div>
            
            <h4 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-black/40 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Regulated Safety // Secure Infrastructure
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="font-body text-xs leading-relaxed text-ink-black/50 text-justify">
                Infinitswap is your gateway to local liquidity. We aren't a bank—we’re the high-speed software engine that bridges your assets to reality. Every Naira, Rand, or Cedi move is powered by <strong>fully licensed payment providers</strong> regulated by the Central Banks of Nigeria, South Africa, Ghana, and Tanzania.
              </p>
              <p className="font-body text-xs leading-relaxed text-ink-black/50 text-justify">
                Your security is non-negotiable. By leveraging institutional-grade PSPs, we ensure your funds are handled with the same level of care and oversight as traditional banking systems. <strong>Infinite 69Trading Services LTD</strong> operates strictly as a Technical Service Provider (TSP).
              </p>
            </div>
          </div>
        </div>

        {/* ROW 3: FOOTER BOTTOM */}
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-body text-[10px] text-ink-black/30 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Infinite 69Trading Services LTD.
            </p>
            <p className="font-mono text-[8px] text-ink-black/20 mt-1 uppercase tracking-tighter">
              Registered RC-INFINITE69-NG // GLOBAL UPTIME: 99.98%
            </p>
          </div>

          <div className="flex items-center gap-12 opacity-30 hover:opacity-100 transition-opacity">
  <div className="text-center group">
    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-ink-black group-hover:text-infinite-blue transition-colors">Engineered By</p>
    
      <a href="https://domanimedia.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-sans font-black text-[12px] text-infinite-blue tracking-tighter hover:underline"
    >
      DOMANI
    </a>
    </p>
  </div>
</div>

      </div>
    </footer>
  );
}