'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import AccessBotButton from './AccessBotButton';
import { COUNTRIES, CURRENCIES } from '../lib/countries';

// One list, rendered by both the desktop rail and the mobile sheet.
const NAV_LINKS = [
  { href: '/savings', label: 'Savings' },
  { href: '/pay', label: 'Pay Bills' },
  { href: '/protocol', label: 'Swap' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/network', label: 'Rates & Regions' },
  { href: '/compliance', label: 'Trust & Safety' },
];

/** Clock value per country id, e.g. { NG: '14:32:07' }. */
type Times = Record<string, string>;

const PLACEHOLDER_TIMES: Times = Object.fromEntries(
  COUNTRIES.map((c) => [c.id, '--:--:--']),
);

function TimeItem({ code, value }: { code: string; value: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-infinite-blue">
        {code}
      </span>
      <span
        suppressHydrationWarning
        className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-black/58"
      >
        {value}
      </span>
    </div>
  );
}

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative font-mono text-[10px] font-bold uppercase tracking-[0.30em] text-ink-black/58 transition-colors duration-300 hover:text-infinite-blue"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-infinite-blue transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Navbar() {
  const [times, setTimes] = useState<Times>(PLACEHOLDER_TIMES);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      setTimes(
        Object.fromEntries(
          COUNTRIES.map((country) => [
            country.id,
            new Intl.DateTimeFormat('en-GB', {
              ...options,
              timeZone: country.timeZone,
            }).format(now),
          ]),
        ),
      );
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    updateTime();
    handleScroll();

    const timer = window.setInterval(updateTime, 1000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col">
        {/* SYSTEM STATUS BAR */}
        <div className="pointer-events-auto relative">
          <div
            className={[
              'mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1580px] rounded-full border transition-all duration-500 md:w-[calc(100%-2.5rem)]',
              scrolled
                ? 'border-black/8 bg-[#f4efe7]/78 shadow-[0_12px_40px_rgba(17,17,17,0.08)] backdrop-blur-xl'
                : 'border-black/6 bg-[#f4efe7]/56 backdrop-blur-md',
            ].join(' ')}
          >
            <div className="flex items-center justify-between px-4 py-2 md:px-6 xl:px-8">
              <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
                <div className="flex shrink-0 items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.30em] text-ink-black/42">
                    System Online // Africa
                  </span>
                </div>

                {/* All seven market clocks. Rather than dropping nodes on
                    narrow screens, the rail scrolls horizontally. */}
                <div className="hide-scrollbar hidden min-w-0 flex-1 items-center gap-4 overflow-x-auto border-l border-black/10 pl-5 sm:flex lg:gap-5">
                  {COUNTRIES.map((country) => (
                    <TimeItem
                      key={country.id}
                      code={country.cityCode}
                      value={times[country.id] ?? '--:--:--'}
                    />
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 pl-4 md:gap-4">
                <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-black/6 xl:block">
                  <div className="h-full w-2/3 animate-[pulse_2s_infinite] rounded-full bg-infinite-blue" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-black/34">
                  Latency: 14ms
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FLOATING NAV */}
        <div className="pointer-events-auto relative">
          <div
            className={[
              'mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1580px] rounded-[1.75rem] border transition-all duration-500 md:w-[calc(100%-2.5rem)]',
              scrolled
                ? 'border-black/8 bg-white/50 shadow-[0_24px_80px_rgba(17,17,17,0.10)] backdrop-blur-2xl'
                : 'border-black/6 bg-white/32 backdrop-blur-xl',
            ].join(' ')}
          >
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08))]" />
              <div className="absolute inset-y-0 left-[34%] hidden w-px bg-black/6 xl:block" />
              <div className="absolute inset-y-0 right-[26%] hidden w-px bg-black/6 xl:block" />

              <div className="relative flex items-center justify-between gap-6 px-4 py-4 md:px-6 xl:px-8">
                {/* BRAND - EXACT DESKTOP FEEL */}
                <Link
                  href="/"
                  className="group flex shrink-0 items-center gap-3"
                  aria-label="Infinitswap home"
                  onClick={closeMobile}
                >
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_40px_rgba(8,39,220,0.16)]">
                    <Image
                      src="/logo-emblem.png"
                      alt="Infinitswap emblem"
                      width={24}
                      height={24}
                      priority
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="leading-none">
                    <span className="block text-[24px] font-semibold tracking-[-0.05em] text-infinite-blue">
                      infinitswap
                    </span>
                    <span className="mt-1 hidden font-mono text-[8px] uppercase tracking-[0.34em] text-ink-black/36 sm:block">
                      Your financial account, in WhatsApp
                    </span>
                  </div>
                </Link>

                {/* DESKTOP NAV LINKS — gap tightened for six items */}
                <div className="hidden items-center gap-6 xl:flex">
                  {NAV_LINKS.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} />
                  ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Seven chips only fit once the nav rail has room; below
                      2xl they live in the mobile sheet instead. */}
                  <div className="hidden items-center gap-2 2xl:flex">
                    {CURRENCIES.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/8 bg-white/62 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-ink-black/48 shadow-[0_8px_24px_rgba(17,17,17,0.04)] backdrop-blur-xl"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* keep exact desktop CTA visibility */}
                  <div className="hidden sm:block">
                    <AccessBotButton />
                  </div>

                  {/* MOBILE MENU BUTTON ONLY */}
                  <button
                    type="button"
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/72 text-ink-black shadow-[0_8px_24px_rgba(17,17,17,0.05)] backdrop-blur-xl transition-all duration-300 xl:hidden"
                  >
                    <div className="relative h-4 w-5">
                      <span
                        className={[
                          'absolute left-0 top-0 h-[2px] w-5 bg-current transition-all duration-300',
                          mobileOpen ? 'top-[7px] rotate-45' : '',
                        ].join(' ')}
                      />
                      <span
                        className={[
                          'absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-all duration-300',
                          mobileOpen ? 'opacity-0' : 'opacity-100',
                        ].join(' ')}
                      />
                      <span
                        className={[
                          'absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-all duration-300',
                          mobileOpen ? 'top-[7px] -rotate-45' : '',
                        ].join(' ')}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] xl:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-[7.8rem] z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 xl:hidden"
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-[#f7f3ec]/96 shadow-[0_24px_80px_rgba(17,17,17,0.14)] backdrop-blur-2xl">
                <div className="grid gap-1 px-3 py-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="rounded-[1.2rem] px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-ink-black/72 transition-colors duration-300 hover:bg-white/70 hover:text-[#0827dc]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-black/8 px-5 py-4 sm:hidden">
                  <AccessBotButton />
                </div>

                <div className="border-t border-black/8 px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {CURRENCIES.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/8 bg-white/70 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-ink-black/48"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}