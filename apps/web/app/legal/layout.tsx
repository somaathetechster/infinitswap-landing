// apps/web/app/legal/layout.tsx
import Link from 'next/link';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-ink-black pt-32 pb-20 px-6 font-body relative overflow-hidden">
      {/* Background Watermark for Institutional feel */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.03] font-display text-[15vw] whitespace-nowrap pointer-events-none select-none">
        INFINITSWAP COMPLIANCE
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-12 text-[10px] uppercase tracking-widest font-bold text-infinite-blue hover:brightness-125 transition-all"
        >
          <span>←</span> Back to Terminal
        </Link>

        {/* The Document Container */}
        <div className="bg-white p-8 md:p-16 border border-black/5 shadow-2xl rounded-sm ring-1 ring-black/5">
          {children}
        </div>

        {/* Document Footer */}
        <div className="mt-8 text-center font-mono text-[9px] text-ink-black/30 uppercase tracking-tighter">
          Infinitswap Internal Regulatory Document // Ref: 2026-COMP-V1
        </div>
      </div>
    </div>
  );
}