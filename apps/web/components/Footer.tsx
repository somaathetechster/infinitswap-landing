'use client';

export default function Footer() {
  return (
    <footer className="bg-[#f9f6ef] border-t border-black/5 px-6 py-12 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        {/* Left Column: Brand & Simple Value Prop */}
        <div className="space-y-4">
          <h3 className="font-display text-xl uppercase tracking-tighter text-ink-black underline decoration-infinite-blue/20 underline-offset-8">
            Infinitswap
          </h3>
          <p className="font-body text-sm text-ink-black/60 max-w-sm leading-relaxed">
            The fastest, easiest way to turn your crypto into cash. We connect your digital assets directly to local bank accounts across Africa without the hassle.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-black/40 pt-4">
            Contact: support@infinitswap.ai
          </p>
        </div>
        
        {/* Right Column: THE COMPLIANCE SHIELD */}
        <div className="font-body text-xs text-ink-black/40 space-y-4 md:text-right">
          <div className="p-4 bg-black/[0.02] border border-black/5 rounded-sm text-left md:text-right">
            <p className="font-bold text-ink-black/60 mb-2 uppercase tracking-wider text-[10px]">
              Platform Status & Legal
            </p>
            <p className="leading-relaxed mb-2">
              Infinitswap is a <strong>technology platform only</strong>. We do not hold, custody, 
              transmit, or settle funds directly. 
            </p>
            <p className="leading-relaxed">
              Services are executed by licensed Third-Party Payment Service Providers (PSPs) 
              operating within their respective regulated jurisdictions.
            </p>
          </div>
          
          <p className="leading-relaxed pt-2">
            © {new Date().getFullYear()} Infinite 69Trading Services Limited. All rights reserved.
          </p>
        </div>
      </div>

      {/* Domani Credit - Single Standardized Block */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-black/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity duration-300">
        <p className="font-mono text-[9px] uppercase tracking-widest text-ink-black">
          Engineered by <span className="font-bold text-infinite-blue">Domani</span>
        </p>
        <p className="font-display text-[10px] italic text-ink-black/60 mt-1">
          Building Tomorrow, Today.
        </p>
      </div>
    </footer>
  );
}