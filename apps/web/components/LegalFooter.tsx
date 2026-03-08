'use client';
import Link from 'next/link';

export default function LegalFooter() {
  return (
    <div className="w-full bg-[#f4f1ea] border-t border-black/10 py-10 px-6 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP ROW: QUICK LINKS */}
        <div className="flex flex-wrap gap-8 mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-black/60">
          <Link href="/legal/terms" className="hover:text-infinite-blue transition-colors">Terms of Service</Link>
          <Link href="/legal/privacy" className="hover:text-infinite-blue transition-colors">Privacy Policy</Link>
          <Link href="/legal/refund" className="hover:text-infinite-blue transition-colors">Refund Policy</Link>
          <Link href="/compliance" className="hover:text-infinite-blue transition-colors">Compliance Status</Link>
        </div>

        {/* MIDDLE ROW: THE "SHIELD" DISCLAIMER (Simplified for everyday users) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-black/5">
          <div className="md:col-span-2">
            <p className="font-body text-[11px] leading-relaxed text-ink-black/50 text-justify">
              <strong>How We Protect You:</strong> Infinitswap is a secure technology platform, not a bank or a crypto custodian. 
              We provide the smart software that connects you to the market. All actual money transfers, currency exchanges, 
              and local payouts are securely handled by our licensed Payment Service Providers (PSPs). These trusted partners 
              are fully regulated by the Central Bank of Nigeria (CBN), South African Reserve Bank (SARB), Bank of Ghana (BoG), 
              and Bank of Tanzania (BoT).
            </p>
          </div>
          
          {/* CONTACT DETAILS */}
          <div className="flex flex-col md:items-end justify-center font-mono text-[9px] text-ink-black/40 space-y-1.5">
            <p className="font-bold text-ink-black/60">INFINITE 69TRADING SERVICES LTD</p>
            <p>REG: RC-INFINITE69-NG</p>
            <p className="text-infinite-blue/80 hover:text-infinite-magenta transition-colors">
              <a href="tel:+2349079607916">TEL: +234 907 960 7916</a>
            </p>
            <p className="text-infinite-blue/80 hover:text-infinite-magenta transition-colors">
              <a href="mailto:support@infinitswap.ai">MAIL: support@infinitswap.ai</a>
            </p>
            <p>SYSTEM UPTIME: 99.98%</p>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT ONLY (Address & Domani Removed) */}
        <div className="pt-8 flex justify-center md:justify-start">
          <p className="font-body text-[10px] text-ink-black/40">
            &copy; {new Date().getFullYear()} Infinite 69Trading Services Limited. All Rights Reserved.
          </p>
        </div>
        
      </div>
    </div>
  );
}