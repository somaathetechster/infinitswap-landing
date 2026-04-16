/**
 * apps/web/app/kyc/page.tsx
 * --------------------------
 * Hosted KYC verification page for Infinitswap.
 * Served at: https://infinitswap.ai/kyc?token=<token>&tier=<1|2>
 *
 * Tier 1 → ID verification (local checksum + risk engine)
 * Tier 2 → Proof of Address (document upload + device intelligence)
 *
 * On success → redirects to WhatsApp
 * Connects to: https://infinitswap-api.onrender.com/kyc/submit (Tier 1)
 *              https://infinitswap-api.onrender.com/kyc/submit-address (Tier 2)
 *
 * FingerprintJS (open-source, no account needed) is loaded client-side
 * to collect the device visitorId + timezone for the risk engine.
 */

"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE        = process.env.NEXT_PUBLIC_API_URL || "https://infinitswap-api.onrender.com";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2349000000000";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Tier1Fields = {
  firstName: string; lastName: string; docType: string; idNumber: string;
};
type Tier2Fields = {
  addressLine1: string; addressLine2: string; city: string;
  docType: string; document: File | null;
};
type FormState = "idle" | "submitting" | "success" | "error" | "invalid_link";

// ─────────────────────────────────────────────────────────────────────────────
// ID TYPE OPTIONS PER COUNTRY (mirrored from kyc.constants)
// ─────────────────────────────────────────────────────────────────────────────
const COUNTRY_ID_TYPES: Record<string, { tier1: string[]; tier2: string[] }> = {
  NG: { tier1: ["BVN", "NIN", "VOTER_ID", "DRIVERS_LICENSE"], tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"] },
  GH: { tier1: ["Ghana Card", "SSNIT"],                       tier2: ["Utility Bill", "Bank Statement"] },
  TZ: { tier1: ["NIDA"],                                      tier2: ["Utility Bill", "Bank Statement"] },
  ZA: { tier1: ["SA National ID"],                            tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"] },
};
const ID_TYPE_LABELS: Record<string, string> = {
  BVN: "BVN (Bank Verification Number)",
  NIN: "NIN (National Identification Number)",
  VOTER_ID: "Voter's Card (PVC)",
  DRIVERS_LICENSE: "Driver's License",
  "Ghana Card": "Ghana Card",
  SSNIT: "SSNIT Number",
  NIDA: "NIDA Number",
  "SA National ID": "SA National ID",
};

// ─────────────────────────────────────────────────────────────────────────────
// DEVICE FINGERPRINT COLLECTION (FingerprintJS open-source)
// ─────────────────────────────────────────────────────────────────────────────
async function collectDevicePayload(): Promise<string> {
  try {
    // @ts-ignore — dynamically loaded
    const FP = await import("https://openfpcdn.io/fingerprintjs/v4" as any);
    const fp = await FP.load();
    const result = await fp.get();
    const payload = {
      visitorId:   result.visitorId,
      timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
      tzOffset:    -new Date().getTimezoneOffset(), // UTC offset in minutes
      language:    navigator.language,
      platform:    navigator.platform,
      screenRes:   `${screen.width}x${screen.height}`,
      touchPoints: navigator.maxTouchPoints,
      canvas:      result.components?.canvas?.value ?? null,
      audio:       result.components?.audio?.value ?? null,
    };
    return JSON.stringify(payload);
  } catch {
    // Non-fatal — return minimal payload with timezone only
    return JSON.stringify({
      visitorId:  null,
      timezone:   Intl.DateTimeFormat().resolvedOptions().timeZone,
      tzOffset:   -new Date().getTimezoneOffset(),
      language:   navigator.language,
      platform:   navigator.platform,
      screenRes:  `${screen.width}x${screen.height}`,
      touchPoints: navigator.maxTouchPoints,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER LIMIT DISPLAY (matches kyc.constants.js)
// ─────────────────────────────────────────────────────────────────────────────
const TIER_LIMITS: Record<number, { daily: string; monthly: string }> = {
  1: { daily: "2,000 USDT/day",  monthly: "5,000 USDT/month"  },
  2: { daily: "10,000 USDT/day", monthly: "50,000 USDT/month" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED LAYOUT WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function KycCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] p-8">
        <div className="mb-6">
          <p className="text-[22px] font-bold text-[#1a1a2e] leading-none">Infinitswap</p>
          <p className="text-[13px] text-gray-400 mt-1">Secure Identity Verification</p>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED SUCCESS SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function SuccessScreen({ message, waLink }: { message: string; waLink: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-[18px] font-semibold text-emerald-600 mb-2">Submitted Successfully</h3>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">{message}</p>
      <a
        href={waLink}
        className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors"
      >
        Return to WhatsApp →
      </a>
      <p className="text-[12px] text-gray-400 mt-3">You can close this page after tapping the button above.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UNDER REVIEW SCREEN (for flagged submissions)
// ─────────────────────────────────────────────────────────────────────────────
function UnderReviewScreen({ waLink }: { waLink: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">⏳</div>
      <h3 className="text-[18px] font-semibold text-[#1a1a2e] mb-2">Verification Under Review</h3>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
        Your submission has been received and is under review by our compliance team.
        You'll be notified on WhatsApp once the review is complete — usually within a few hours.
      </p>
      <a
        href={waLink}
        className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors"
      >
        Return to WhatsApp →
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ERROR / INVALID LINK SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-[18px] font-semibold text-[#1a1a2e] mb-2">Link Unavailable</h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 1 FORM
// ─────────────────────────────────────────────────────────────────────────────
function Tier1Form({ token, countryCode }: { token: string; countryCode: string }) {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("I just completed my identity verification.")}`;
  const idTypes = COUNTRY_ID_TYPES[countryCode]?.tier1 ?? COUNTRY_ID_TYPES["NG"].tier1;

  const [fields, setFields]       = useState<Tier1Fields>({ firstName: "", lastName: "", docType: "", idNumber: "" });
  const [state, setState]         = useState<FormState>("idle");
  const [error, setError]         = useState("");
  const [underReview, setUnder]   = useState(false);

  const set = (k: keyof Tier1Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setError("");

    const devicePayload = await collectDevicePayload();

    const body = new URLSearchParams({
      token,
      firstName:     fields.firstName.trim(),
      lastName:      fields.lastName.trim(),
      docType:       fields.docType,
      idNumber:      fields.idNumber.trim(),
      devicePayload,
    });

    try {
      const res  = await fetch(`${API_BASE}/kyc/submit`, {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    body.toString(),
      });
      const data = await res.json();

      if (data.success) {
        if (data.underReview) { setUnder(true); } else { setState("success"); }
      } else {
        setError(data.message || "Submission failed. Please check your details.");
        setState("idle");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setState("idle");
    }
  };

  if (underReview)         return <UnderReviewScreen waLink={waLink} />;
  if (state === "success") return <SuccessScreen message="Your identity has been verified. Your Tier 1 limits are now active." waLink={waLink} />;

  const limits = TIER_LIMITS[1];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="inline-block bg-blue-50 border border-blue-200 text-blue-700 text-[12px] font-semibold rounded-md px-2.5 py-1 mb-3">
          Tier 1 Upgrade
        </span>
        <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Verify Your Identity 🛡️</h2>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-[13px] text-emerald-700 leading-relaxed">
        📈 After verification: <strong>{limits.daily}</strong> · <strong>{limits.monthly}</strong>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🔒 Your ID number is transmitted over an encrypted connection to our verification system. We do not store your ID number after verification.
      </div>

      <input type="hidden" name="token" value={token} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">First Name</label>
          <input
            type="text" required value={fields.firstName} onChange={set("firstName")}
            placeholder="As on your ID" autoComplete="given-name"
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Last Name</label>
          <input
            type="text" required value={fields.lastName} onChange={set("lastName")}
            placeholder="As on your ID" autoComplete="family-name"
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Type</label>
        <select
          required value={fields.docType} onChange={set("docType")}
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white"
        >
          <option value="">Select document type</option>
          {idTypes.map(t => (
            <option key={t} value={t}>{ID_TYPE_LABELS[t] ?? t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Number</label>
        <input
          type="text" required value={fields.idNumber} onChange={set("idNumber")}
          placeholder="Enter your ID number" autoComplete="off" spellCheck={false}
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors tracking-wider"
        />
      </div>

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>
      )}

      <button
        type="submit" disabled={state === "submitting"}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1"
      >
        {state === "submitting" ? "Verifying…" : "Verify My Identity"}
      </button>

      <p className="text-[12px] text-gray-400 text-center">🔐 256-bit encrypted · ID not stored after verification</p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 2 FORM
// ─────────────────────────────────────────────────────────────────────────────
function Tier2Form({ token, countryCode }: { token: string; countryCode: string }) {
  const waLink     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("I just submitted my proof of address.")}`;
  const docTypes   = COUNTRY_ID_TYPES[countryCode]?.tier2 ?? COUNTRY_ID_TYPES["NG"].tier2;

  const [fields, setFields]     = useState<Tier2Fields>({ addressLine1: "", addressLine2: "", city: "", docType: "", document: null });
  const [state, setState]       = useState<FormState>("idle");
  const [error, setError]       = useState("");
  const [underReview, setUnder] = useState(false);
  const fileRef                 = useRef<HTMLInputElement>(null);

  const setField = (k: keyof Omit<Tier2Fields, "document">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields(f => ({ ...f, [k]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, document: e.target.files?.[0] ?? null }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!fields.document) { setError("Please upload your proof of address document."); return; }

    const maxBytes = 5 * 1024 * 1024;
    if (fields.document.size > maxBytes) { setError("File is too large. Maximum size is 5MB."); return; }

    setState("submitting");
    setError("");

    const devicePayload = await collectDevicePayload();

    const formData = new FormData();
    formData.append("token",        token);
    formData.append("addressLine1", fields.addressLine1.trim());
    formData.append("addressLine2", fields.addressLine2.trim());
    formData.append("city",         fields.city.trim());
    formData.append("docType",      fields.docType);
    formData.append("document",     fields.document);
    formData.append("devicePayload", devicePayload);

    try {
      const res  = await fetch(`${API_BASE}/kyc/submit-address`, { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        if (data.underReview) { setUnder(true); } else { setState("success"); }
      } else {
        setError(data.message || "Submission failed. Please try again.");
        setState("idle");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setState("idle");
    }
  };

  if (underReview)         return <UnderReviewScreen waLink={waLink} />;
  if (state === "success") return <SuccessScreen message="Your address has been verified. Your Tier 2 limits are now active." waLink={waLink} />;

  const limits = TIER_LIMITS[2];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="inline-block bg-blue-50 border border-blue-200 text-blue-700 text-[12px] font-semibold rounded-md px-2.5 py-1 mb-3">
          Tier 2 Upgrade
        </span>
        <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Confirm Your Address 🏠</h2>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-[13px] text-emerald-700 leading-relaxed">
        📈 After verification: <strong>{limits.daily}</strong> · <strong>{limits.monthly}</strong>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🔒 Upload a document issued within the last 3 months that shows your name and address. Accepted: utility bill, bank statement, or lease agreement.
      </div>

      <input type="hidden" name="token" value={token} />

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Address Line 1</label>
        <input
          type="text" required value={fields.addressLine1} onChange={setField("addressLine1")}
          placeholder="Street address" autoComplete="address-line1"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
          Address Line 2 <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text" value={fields.addressLine2} onChange={setField("addressLine2")}
          placeholder="Apartment, suite, etc." autoComplete="address-line2"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">City / State</label>
        <input
          type="text" required value={fields.city} onChange={setField("city")}
          placeholder="e.g. Lagos, Lagos State" autoComplete="address-level2"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Document Type</label>
        <select
          required value={fields.docType} onChange={setField("docType")}
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white"
        >
          <option value="">Select document type</option>
          {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
          Upload Document <span className="text-gray-400">(PDF, JPG, PNG — max 5MB)</span>
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full px-3.5 py-3 border-[1.5px] border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <p className="text-[14px] text-gray-500 text-center">
            {fields.document ? `✅ ${fields.document.name}` : "Tap to select file"}
          </p>
        </div>
        <input
          ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFile}
        />
      </div>

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>
      )}

      <button
        type="submit" disabled={state === "submitting"}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1"
      >
        {state === "submitting" ? "Submitting…" : "Submit for Verification"}
      </button>

      <p className="text-[12px] text-gray-400 text-center">🔐 Encrypted in transit · Documents deleted after verification</p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROUTER — reads ?token= and ?tier= from URL
// ─────────────────────────────────────────────────────────────────────────────
function KycPageInner() {
  const params     = useSearchParams();
  const token      = params.get("token") || "";
  const tier       = parseInt(params.get("tier") || "1", 10);
  const country    = (params.get("country") || "NG").toUpperCase();

  if (!token) {
    return (
      <KycCard>
        <ErrorScreen message="Missing verification link. Please request a new one from the WhatsApp bot by typing *kyc*." />
      </KycCard>
    );
  }

  if (![1, 2].includes(tier)) {
    return (
      <KycCard>
        <ErrorScreen message="Invalid verification tier. Please request a new link from the bot." />
      </KycCard>
    );
  }

  return (
    <KycCard>
      {tier === 1
        ? <Tier1Form token={token} countryCode={country} />
        : <Tier2Form token={token} countryCode={country} />
      }
    </KycCard>
  );
}

export default function KycPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    }>
      <KycPageInner />
    </Suspense>
  );
}