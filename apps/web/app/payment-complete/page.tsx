import { Suspense } from "react";
import PaymentCompleteClient from "./client";

/**
 * apps/web/app/payment-complete/page.tsx
 * Server component wrapper — handles the Suspense boundary required by
 * useSearchParams() in Next.js App Router. No layout.tsx needed.
 *
 * force-dynamic: prevents Next.js from prerendering this page at build time.
 * useSearchParams() reads FLW redirect params at runtime — there are no
 * params at build time, which causes a prerender crash without this export.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title:  "Payment Complete — Infinitswap",
  robots: "noindex, nofollow",
};

export default function PaymentCompletePage() {
  return (
    <Suspense
      fallback={
        <div style={{
          minHeight: "100dvh",
          background: "#080706",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "#5a5754",
        }}>
          LOADING
        </div>
      }
    >
      <PaymentCompleteClient />
    </Suspense>
  );
}