export default function Footer() {
  return (
    <footer className="bg-[#f9f6ef] border-t border-black/5 px-6 py-12 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Brand & Mission */}
        <div className="space-y-4">
          <h3 className="font-display text-xl uppercase tracking-tighter text-ink-black">Infinitswap</h3>
          <p className="font-body text-sm text-ink-black/60 max-w-sm leading-relaxed">
            A compliant, AI-powered financial intelligence and payment enablement platform 
            designed to help users understand and manage money better through trusted partnerships.
          </p>
        </div>
        
        {/* Right Column: Legal & Address */}
        <div className="font-body text-xs text-ink-black/40 space-y-4 md:text-right">
          <p className="leading-relaxed">
            Infinitswap is a financial technology platform and does not provide banking or financial advisory services. 
            All payment services are provided by licensed third-party providers.
          </p>
          <p className="leading-relaxed">
            © 2026 Infinite 69Trading Services Limited. All rights reserved. <br />
            17, ONYENEKE CHUKWU STREET ACHARA LAYOUT ENUGU NIGERIA, Jurisdiction.
          </p>
        </div>
      </div>

      {/* DOMANI CREDIT LINE */}
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