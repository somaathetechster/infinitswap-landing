import { Suspense } from "react";

/**
 * apps/web/src/app/payment-complete/layout.tsx
 * -----------------------------------------------
 * Required wrapper: useSearchParams() in page.tsx needs a Suspense boundary
 * in Next.js 13+ App Router, otherwise the build throws:
 * "useSearchParams() should be wrapped in a suspense boundary"
 */
export const metadata = {
  title:       "Payment Complete — Infinitswap",
  description: "Redirecting you back to Infinitswap on WhatsApp.",
  robots:      "noindex, nofollow",   // don't index this utility page
};

export default function PaymentCompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div style={{
          minHeight: "100dvh",
          background: "#080706",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "#5a5754",
        }}>
          LOADING
        </div>
      }
    >
      {children}
    </Suspense>
  );
}