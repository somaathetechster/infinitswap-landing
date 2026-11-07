// apps/web/components/LegalShell.tsx
// Shared dark layout for legal + about + policy pages.
// Matches the homepage aesthetic (#0A0A0A background, #6C3FE8 accent).
import Link from "next/link";
import type { ReactNode } from "react";

export type TocItem = { id: string; label: string };

export function LegalShell({
  eyebrow,
  title,
  updated,
  updatedLabel = "Last updated",
  intro,
  toc,
  children,
}: {
  eyebrow?: string;
  title: string;
  updated?: string;
  updatedLabel?: string;
  intro?: ReactNode;
  toc?: TocItem[];
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#EDEDED]">
      {/* ambient glow, same language as the hero */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#6C3FE8]/15 blur-[120px]" />

      <div className="section-wrap relative z-10 pb-24 pt-28 md:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#9A9A9A] transition hover:text-white"
        >
          <span aria-hidden>←</span> Back to home
        </Link>

        {/* Header */}
        <header className="mt-10 border-b border-white/10 pb-10">
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/[.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6C3FE8]">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="display mt-6 text-[clamp(34px,6vw,56px)] font-extrabold leading-[1.02] tracking-[-.04em] text-white">
            {title}
          </h1>
          {updated ? (
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.18em] text-[#8A8A8A]">
              {updatedLabel}: <span className="text-[#B4B4B4]">{updated}</span>
            </p>
          ) : null}
          {intro ? (
            <div className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-[#B4B4B4]">{intro}</div>
          ) : null}
        </header>

        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* Table of contents — desktop only, sticky */}
          {toc && toc.length > 0 ? (
            <aside className="hidden lg:block">
              <nav className="sticky top-28" aria-label="On this page">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6B6B6B]">
                  On this page
                </p>
                <ul className="space-y-2.5 border-l border-white/10">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="-ml-px block border-l border-transparent py-0.5 pl-4 text-[14px] leading-snug text-[#9A9A9A] transition hover:border-[#6C3FE8] hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : (
            <div className="hidden lg:block" aria-hidden />
          )}

          {/* Body */}
          <div className="min-w-0 max-w-3xl">{children}</div>
        </div>
      </div>
    </main>
  );
}

const BODY_CLS =
  "space-y-4 text-[17px] md:text-[18px] leading-[1.7] text-[#B4B4B4] " +
  "[&_strong]:font-semibold [&_strong]:text-white " +
  "[&_a]:text-[#6C3FE8] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#8A63F0] " +
  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 " +
  "[&_li]:marker:text-[#6C3FE8] [&_h4]:mt-2 [&_h4]:font-semibold [&_h4]:text-white";

export function LegalSection({
  id,
  index,
  title,
  tone = "default",
  children,
}: {
  id: string;
  index?: string;
  title: string;
  tone?: "default" | "highlight" | "warn";
  children: ReactNode;
}) {
  const toneCls =
    tone === "highlight"
      ? "rounded-2xl border border-[#6C3FE8]/25 bg-[#6C3FE8]/[.06] p-6 md:p-8"
      : tone === "warn"
        ? "rounded-2xl border border-[#E0564A]/30 bg-[#E0564A]/[.07] p-6 md:p-8"
        : "";

  return (
    <section id={id} className={`scroll-mt-28 ${tone === "default" ? "mb-11" : "mb-11"} ${toneCls}`}>
      <h2 className="display mb-4 flex items-baseline gap-3 text-[22px] font-bold tracking-[-.02em] text-white md:text-[26px]">
        {index ? <span className="font-mono text-[14px] text-[#6C3FE8]">{index}</span> : null}
        <span>{title}</span>
      </h2>
      <div className={BODY_CLS}>{children}</div>
    </section>
  );
}

export function ContactCard({
  id = "contact",
  heading = "Contact",
  blurb,
  email = "support@infinitswap.ai",
  phone = "+234 907 960 7916",
  address = "17, Onyeneke Chukwu Street, Achara Layout, Enugu, Nigeria",
  hours = "Available 24 hours",
  note,
}: {
  id?: string;
  heading?: string;
  blurb?: ReactNode;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  note?: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 mt-14 rounded-2xl border border-white/10 bg-white/[.03] p-7 md:p-9"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#6C3FE8]">{heading}</p>
      {blurb ? <p className="mt-3 text-[16px] leading-[1.6] text-[#B4B4B4]">{blurb}</p> : null}
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        {email ? (
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">Email</dt>
            <dd className="mt-1.5 text-[16px]">
              <a href={`mailto:${email}`} className="text-white underline underline-offset-2 hover:text-[#8A63F0]">
                {email}
              </a>
            </dd>
          </div>
        ) : null}
        {phone ? (
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">Phone</dt>
            <dd className="mt-1.5 text-[16px]">
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-white hover:text-[#8A63F0]">
                {phone}
              </a>
            </dd>
          </div>
        ) : null}
        {address ? (
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">Address</dt>
            <dd className="mt-1.5 text-[16px] leading-[1.5] text-[#D4D4D4]">{address}</dd>
          </div>
        ) : null}
        {hours ? (
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">Support hours</dt>
            <dd className="mt-1.5 text-[16px] text-[#D4D4D4]">{hours}</dd>
          </div>
        ) : null}
      </dl>
      {note ? <p className="mt-6 text-[13px] leading-[1.6] text-[#8A8A8A]">{note}</p> : null}
    </section>
  );
}
