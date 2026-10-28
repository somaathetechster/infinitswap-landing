const links: [string, string][] = [
  ["How it works", "/#how-it-works"],
  ["Privacy", "/legal/privacy"],
  ["Terms", "/legal/terms"],
  ["Contact", "mailto:support@infinitswap.ai"],
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-14 text-white">
      <div className="section-wrap">
        <div className="flex flex-col gap-8 border-t border-white/[.08] pt-10 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="font-display text-[21px] font-bold tracking-[-.04em]">infinitswap<span className="text-[#6C3FE8]">.</span></a>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#9A9A9A]" aria-label="Footer navigation">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-white">{label}</a>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 text-xs text-[#6B6B6B] md:flex-row md:items-center md:justify-between">
          <span>© 2026 Infinitswap. Powered by Domani.</span>
          <span>Infinitswap is not a bank. Payments are settled by licensed partners.</span>
        </div>
      </div>
    </footer>
  );
}
