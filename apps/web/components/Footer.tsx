export default function Footer() {
  return (
    <footer className="bg-[#f9f6ef] border-t border-black/5 px-6 py-12 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Column */}
        <div className="space-y-4">
          <h3 className="font-display text-xl uppercase tracking-tighter text-ink-black">Infinitswap</h3>
          <p className="font-body text-sm text-ink-black/60 max-w-sm leading-relaxed">
            The intelligent interface for modern settlement. We provide the technology layer 
            that connects authorized liquidity partners with local payment networks.
          </p>
        </div>
        
        {/* Right Column: THE COMPLIANCE SHIELD */}
        <div className="font-body text-xs text-ink-black/40 space-y-4 md:text-right">
          <div className="p-4 bg-black/[0.02] border border-black/5 rounded-sm text-left md:text-right">
            <p className="font-bold text-ink-black/60 mb-2 uppercase tracking-wider text-[10px]">
              Regulatory Disclosure
            </p>
            <p className="leading-relaxed mb-2">
              Infinitswap is a <strong>technology platform only</strong>. We do not hold, custody, 
              transmit, or settle funds. 
            </p>
            <p className="leading-relaxed">
              All monetary value is processed and settled directly by licensed 
              Third-Party Payment Service Providers (PSPs) regulated within their 
              respective jurisdictions.
            </p>
          </div>
          
          <p className="leading-relaxed pt-2">
            © 2026 Infinite 69Trading Services Limited. All rights reserved. <br />
            17, ONYENEKE CHUKWU STREET ACHARA LAYOUT ENUGU NIGERIA.
          </p>
        </div>
      </div>

      {/* Domani Credit */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-black/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity duration-300">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-black">
          Powered by <span className="font-bold text-infinite-blue">Domani</span>
        </p>
        <p className="font-display text-xs italic text-ink-black/60 mt-1">
          Building Tomorrow, Today.
        </p>
      </div>
    </footer>
  );
}