'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AccessBotButton from './AccessBotButton';

type Times = {
  lagos: string;
  joburg: string;
  accra: string;
  daressalam: string;
};

function TimeItem({ code, value }: { code: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative font-mono text-[10px] font-bold uppercase tracking-[0.30em] text-ink-black/58 transition-colors duration-300 hover:text-infinite-blue"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-infinite-blue transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Navbar() {
  const [times, setTimes] = useState<Times>({
    lagos: '--:--:--',
    joburg: '--:--:--',
    accra: '--:--:--',
    daressalam: '--:--:--',
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      setTimes({
        lagos: new Intl.DateTimeFormat('en-GB', {
          ...options,
          timeZone: 'Africa/Lagos',
        }).format(now),
        joburg: new Intl.DateTimeFormat('en-GB', {
          ...options,
          timeZone: 'Africa/Johannesburg',
        }).format(now),
        accra: new Intl.DateTimeFormat('en-GB', {
          ...options,
          timeZone: 'Africa/Accra',
        }).format(now),
        daressalam: new Intl.DateTimeFormat('en-GB', {
          ...options,
          timeZone: 'Africa/Dar_es_Salaam',
        }).format(now),
      });
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

  return (
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
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.30em] text-ink-black/42">
                  System Online // Africa
                </span>
              </div>

              <div className="hidden items-center gap-5 border-l border-black/10 pl-5 lg:flex">
                <TimeItem code="LOS" value={times.lagos} />
                <TimeItem code="JNB" value={times.joburg} />
                <TimeItem code="ACC" value={times.accra} />
                <TimeItem code="DAR" value={times.daressalam} />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-black/6 sm:block">
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
              {/* BRAND */}
              <Link
                href="/"
                className="group flex shrink-0 items-center gap-3"
                aria-label="Infinitswap home"
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
                    Premium chat-native exchange
                  </span>
                </div>
              </Link>

              {/* NAV LINKS */}
              <div className="hidden items-center gap-8 xl:flex">
                <NavLink href="/protocol" label="How It Works" />
                <NavLink href="/network" label="Rates & Regions" />
                <NavLink href="/compliance" label="Trust & Safety" />
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="hidden items-center gap-2 lg:flex">
                  {['NGN', 'TZS', 'ZAR', 'GHS'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/8 bg-white/62 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-ink-black/48 shadow-[0_8px_24px_rgba(17,17,17,0.04)] backdrop-blur-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <AccessBotButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}