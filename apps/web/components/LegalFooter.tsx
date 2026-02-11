'use client';
import Link from 'next/link';

export default function LegalFooter() {
  return (
    <div className="w-full bg-[#f4f1ea] border-t border-black/10 py-10 px-6 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        {/* TOP ROW: QUICK LINKS */}
        <div className="flex flex-wrap gap-8 mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-black/60">
          <Link href="/legal/terms" className="hover:text-infinite-blue transition-colors">Terms of Service</Link>
          <Link href="/legal/privacy" className="hover:text-infinite-blue transition-colors">Privacy Protocol</Link>
          <Link href="/legal/refund" className="hover:text-infinite-blue transition-colors">Refund Policy</Link>
          <Link href="/compliance" className="hover:text-infinite-blue transition-colors">Compliance Status</Link>
        </div>

        {/* MIDDLE ROW: THE "SHIELD" DISCLAIMER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-black/5">
          <div className="md:col-span-2">
            <p className="font-body text-[11px] leading-relaxed text-ink-black/40 text-justify">
              <strong>REGULATORY STATUS:</strong> Infinitswap is a financial technology infrastructure provider and does not hold a banking license. 
              We are not a Money Service Business (MSB) or a Virtual Asset Service Provider (VASP). Our technology acts as a 
              non-custodial instruction-routing interface. All monetary value, currency exchange, and cross-border settlements 
              are performed exclusively by licensed financial institutions and Payment Service Providers (PSPs) authorized 
              by the Central Bank of Nigeria (CBN), the South African Reserve Bank (SARB), the Bank of Ghana (BoG), 
              and the Bank of Tanzania (BoT).
            </p>
          </div>
          
          {/* UPDATED: Added real contact details for Compliance audit */}
          <div className="flex flex-col md:items-end justify-center font-mono text-[9px] text-ink-black/30 space-y-1">
            <p className="text-ink-black/50 font-bold">ENTITY: INFINITE 69TRADING SERVICES LTD</p>
            <p>REG: RC-INFINITE69-NG</p>
            <p className="text-infinite-blue/60">TEL: +234 907 960 7916</p>
            <p className="text-infinite-blue/60">MAIL: infinitswap@gmail.com</p>
            <p>SYSTEM UPTIME: 99.98%</p>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT & DOMANI */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-[10px] text-ink-black/40">
            © 2026 Infinite 69Trading Services Limited. All Rights Reserved. <br className="md:hidden" />
            17, Onyeneke Chukwu Street, Achara Layout, Enugu, Nigeria.
          </p>
          
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <span className="font-mono text-[9px] uppercase tracking-widest">Built by</span>
             <div className="flex flex-col items-start leading-none">
                <span className="font-bold text-xs tracking-tighter text-infinite-blue">DOMANI</span>
                <span className="text-[7px] uppercase tracking-tighter">Tech & Design Studio</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}