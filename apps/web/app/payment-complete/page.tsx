"use client";

/**
 * apps/web/src/app/payment-complete/page.tsx
 * -------------------------------------------
 * FLW redirect landing page for 1Voucher (ZA) and any hosted payment.
 *
 * FLW appends these query params on redirect:
 *   ?status=successful&tx_ref=uuid_timestamp&transaction_id=123456
 *
 * Behaviour:
 *   - Reads status + tx_ref from URL
 *   - Shows branded Infinitswap loading state for 2.5s
 *   - Auto-opens WhatsApp deep link (wa.me)
 *   - Falls back to manual button if redirect blocked
 */

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447860028474";

export default function PaymentComplete() {
  const params      = useSearchParams();
  const status      = params.get("status")         || "";
  const txRef       = params.get("tx_ref")         || "";
  const transId     = params.get("transaction_id") || "";

  const isSuccess   = ["successful", "completed", "success"].includes(status.toLowerCase());
  const isFailed    = ["failed", "cancelled", "error"].includes(status.toLowerCase());

  const [phase, setPhase]             = useState<"loading" | "redirecting" | "done">("loading");
  const [countdown, setCountdown]     = useState(3);
  const [manualVisible, setManual]    = useState(false);
  const redirectedRef                 = useRef(false);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isSuccess
      ? `✅ Payment done! Ref: ${txRef}`
      : `Hi, I just completed a payment. Ref: ${txRef}`
  )}`;

  useEffect(() => {
    // Countdown 3→2→1→redirect
    const tick = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(tick);
          setPhase("redirecting");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (phase !== "redirecting" || redirectedRef.current) return;
    redirectedRef.current = true;

    // Small delay so "Redirecting..." text renders before browser navigates
    const t = setTimeout(() => {
      window.location.href = waLink;
      // Show manual button after 2s in case redirect was blocked
      setTimeout(() => { setPhase("done"); setManual(true); }, 2000);
    }, 400);

    return () => clearTimeout(t);
  }, [phase, waLink]);

  const icon        = isFailed ? "✗" : "✓";
  const headline    = isFailed
    ? "Payment Failed"
    : isSuccess
    ? "Payment Received"
    : "Payment Processing";
  const subtext     = isFailed
    ? "Something went wrong. Return to WhatsApp and try again."
    : isSuccess
    ? "Your wallet will be credited shortly."
    : "Your payment is being verified. We'll notify you on WhatsApp.";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;1,6..96,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --obsidian:     #080706;
          --surface:      #0f0e0d;
          --border:       #1e1c1a;
          --cyan:         #B8F0FF;
          --cyan-dim:     rgba(184,240,255,0.12);
          --cyan-glow:    rgba(184,240,255,0.06);
          --white:        #F4F0EB;
          --muted:        #5a5754;
          --success:      #B8F0FF;
          --failed:       #FF6B6B;
        }

        html, body { height: 100%; background: var(--obsidian); }

        .root {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Mono', monospace;
          background: var(--obsidian);
          position: relative;
          overflow: hidden;
        }

        /* Ambient background glow */
        .root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 50% at 50% 40%,
            rgba(184,240,255,0.04) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* Noise grain overlay */
        .root::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none;
          opacity: 0.4;
        }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* Wordmark */
        .wordmark {
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 48px;
          text-align: center;
        }

        /* Icon ring */
        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }

        .icon-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: var(--cyan-glow);
        }

        .icon-ring.success { border-color: rgba(184,240,255,0.3); }
        .icon-ring.failed  { border-color: rgba(255,107,107,0.3); background: rgba(255,107,107,0.06); }

        /* Spinning orbit for loading state */
        .icon-ring.loading::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-top-color: var(--cyan);
          border-right-color: rgba(184,240,255,0.3);
          animation: spin 1.2s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .icon-char {
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          font-size: 28px;
          line-height: 1;
        }

        .icon-char.success { color: var(--cyan); }
        .icon-char.failed  { color: var(--failed); }
        .icon-char.loading { color: var(--muted); font-size: 13px; letter-spacing: 0.1em; }

        /* Status chip */
        .status-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 20px;
          font-family: 'DM Mono', monospace;
          font-weight: 400;
        }

        .status-chip.success { border-color: rgba(184,240,255,0.2); color: var(--cyan); }
        .status-chip.failed  { border-color: rgba(255,107,107,0.2); color: var(--failed); }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .status-dot.pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* Headline */
        .headline {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          font-size: 28px;
          color: var(--white);
          line-height: 1.2;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .subtext {
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          font-size: 12px;
          color: var(--muted);
          text-align: center;
          line-height: 1.7;
          margin-bottom: 32px;
          letter-spacing: 0.03em;
        }

        /* Countdown / redirect status */
        .redirect-line {
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--muted);
          text-align: center;
          margin-bottom: 32px;
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          min-height: 16px;
        }

        .redirect-line span {
          color: var(--cyan);
        }

        /* Divider */
        .divider {
          width: 100%;
          height: 1px;
          background: var(--border);
          margin-bottom: 24px;
        }

        /* Ref row */
        .ref-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          margin-bottom: 24px;
        }

        .ref-label {
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
        }

        .ref-value {
          font-size: 10px;
          color: rgba(244,240,235,0.4);
          font-family: 'DM Mono', monospace;
          font-weight: 400;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* WhatsApp button */
        .wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 15px 24px;
          background: transparent;
          border: 1px solid rgba(184,240,255,0.25);
          border-radius: 6px;
          color: var(--cyan);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          margin-bottom: 16px;
        }

        .wa-btn:hover {
          background: var(--cyan-dim);
          border-color: rgba(184,240,255,0.45);
        }

        .wa-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        /* Footer note */
        .footer-note {
          font-size: 10px;
          color: var(--muted);
          text-align: center;
          letter-spacing: 0.08em;
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          opacity: 0.6;
        }

        /* Animate in chip + content slightly after card */
        .chip-wrap  { animation: fadeUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .content    { animation: fadeUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
        .actions    { animation: fadeUp 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <div className="root">
        <div className="card">

          {/* Wordmark */}
          <div className="wordmark">Infinitswap</div>

          {/* Icon */}
          <div className="icon-wrap chip-wrap">
            <div className={`icon-ring ${isFailed ? "failed" : isSuccess ? "success" : "loading"}`}>
              {phase === "loading" ? (
                <span className="icon-char loading">{countdown}</span>
              ) : (
                <span className={`icon-char ${isFailed ? "failed" : "success"}`}>
                  {icon}
                </span>
              )}
            </div>
          </div>

          {/* Status chip */}
          <div className="chip-wrap" style={{ display:"flex", justifyContent:"center" }}>
            <div className={`status-chip ${isFailed ? "failed" : isSuccess ? "success" : ""}`}>
              <div className={`status-dot ${phase === "loading" ? "pulse" : ""}`} />
              {phase === "loading"
                ? "verifying"
                : phase === "redirecting"
                ? "redirecting"
                : isFailed ? "payment failed" : "confirmed"}
            </div>
          </div>

          {/* Headline + subtext */}
          <div className="content" style={{ marginTop:"20px", textAlign:"center" }}>
            <h1 className="headline">{headline}</h1>
            <p className="subtext">{subtext}</p>
          </div>

          {/* Countdown / redirect line */}
          <div className="redirect-line">
            {phase === "loading" && (
              <>Opening WhatsApp in <span>{countdown}s</span></>
            )}
            {phase === "redirecting" && (
              <>Opening WhatsApp<span>...</span></>
            )}
          </div>

          {/* Actions */}
          <div className="actions">
            <div className="divider" />

            {/* Reference */}
            {txRef && (
              <div className="ref-row">
                <span className="ref-label">Ref</span>
                <span className="ref-value">{txRef}</span>
              </div>
            )}

            {/* WhatsApp button — always shown once done, or if redirect blocked */}
            {(phase === "done" || manualVisible || isFailed) && (
              <a href={waLink} className="wa-btn">
                <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Return to Infinitswap
              </a>
            )}

            <p className="footer-note">
              {isSuccess
                ? "Your wallet will be credited within 60 seconds."
                : isFailed
                ? "No funds were deducted. Please try again."
                : "We'll send you a WhatsApp confirmation shortly."}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}