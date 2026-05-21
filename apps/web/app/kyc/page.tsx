"use client";

/**
 * apps/web/app/kyc/page.tsx
 *
 * ✅ FIX [DRIVERS-LICENSE-NG]: Removed Driver's License from Nigeria Tier 1.
 *    Nigeria now only accepts BVN and NIN.
 *
 * ✅ FIX [BVN-CHECKSUM]: Removed BVN checksum from client-side validation.
 *    BVN has no public checksum algorithm. Only length (11 digits) and
 *    non-placeholder checks are valid. Prembly does the real verification.
 *
 * ✅ FIX [NIN-PREFIX]: Removed NIN prefix validation. NINs starting with
 *    22x, 33x, or any other digits are valid — NIMC assigns sequentially.
 *    Only length (11 digits) and non-placeholder checks are valid.
 *
 * ✅ PRESERVED: Ghana Card, SSNIT, NIDA, SA National ID validation unchanged.
 *    Voter's Card still in NG (can be removed in a future iteration if needed).
 */

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://infinitswap-api.onrender.com";
const WA_BUSINESS_NUMBER = "447860028474";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT-SIDE ID VALIDATION
// FORMAT GATE ONLY — catches wrong length, bad characters, placeholder numbers.
// Does NOT implement checksums for BVN or prefix rules for NIN.
// ─────────────────────────────────────────────────────────────────────────────
function validateIdClientSide(docType: string, idNumber: string): string | null {
  const clean = idNumber.trim().replace(/\s/g, "").toUpperCase();
  if (!clean) return "Please enter your ID number.";

  const isAllSameDigit = /^(\d)\1+$/.test(clean);

  switch (docType) {

    // ── BVN ── Format only: 11 digits, no checksum
    case "BVN": {
      if (!/^\d+$/.test(clean))
        return "BVN must contain digits only.";
      if (clean.length < 11)
        return `BVN must be 11 digits. You entered ${clean.length}.`;
      if (clean.length > 11)
        return `BVN must be 11 digits. You entered ${clean.length}.`;
      if (isAllSameDigit)
        return "BVN appears to be a placeholder number. Please enter your real BVN.";
      return null; // ✅ Any valid-length numeric BVN passes — Prembly verifies it
    }

    // ── NIN ── Format only: 11 digits, no prefix rules
    case "NIN": {
      if (!/^\d+$/.test(clean))
        return "NIN must contain digits only.";
      if (clean.length < 11)
        return `NIN must be 11 digits. You entered ${clean.length} — please check your NIN slip, NIMC card, or dial *346# to retrieve it.`;
      if (clean.length > 11)
        return `NIN must be 11 digits. You entered ${clean.length}.`;
      if (isAllSameDigit)
        return "NIN appears to be a placeholder number. Please enter your real NIN.";
      return null; // ✅ Any valid-length numeric NIN passes — Prembly verifies against NIMC
    }

    // ── VOTER ID ──
    case "VOTER_ID": {
      const stripped = clean.replace(/[-]/g, "");
      if (stripped.length < 19) return `Voter ID must be 19 characters. You entered ${stripped.length}.`;
      if (stripped.length > 19) return `Voter ID must be 19 characters. You entered ${stripped.length}.`;
      if (!/^[A-Z0-9]{19}$/.test(stripped)) return "Voter ID must contain only letters and numbers.";
      return null;
    }

    // ── GHANA CARD ──
    case "Ghana Card":
    case "GHANA_CARD": {
      if (!/^GHA-?\d{9}-?\d$/i.test(clean))
        return "Ghana Card must be in the format GHA-XXXXXXXXX-Y (e.g. GHA-123456789-0).";
      return null;
    }

    // ── SSNIT ──
    case "SSNIT": {
      if (!/^[CP]\d{12}$/i.test(clean))
        return "SSNIT must start with C or P followed by 12 digits.";
      return null;
    }

    // ── NIDA (Tanzania) ──
    case "NIDA": {
      const n = clean.replace(/[-]/g, "");
      if (!/^\d+$/.test(n)) return "NIDA number must contain digits only (hyphens are optional).";
      if (n.length < 20)    return `NIDA number must be 20 digits. You entered ${n.length}.`;
      if (n.length > 20)    return `NIDA number must be 20 digits. You entered ${n.length}.`;
      return null;
    }

    // ── SA NATIONAL ID — has a real Luhn checksum ──
    case "SA National ID":
    case "SA_NATIONAL_ID": {
      if (!/^\d+$/.test(clean)) return "SA ID must contain digits only.";
      if (clean.length < 13)   return `SA ID must be 13 digits. You entered ${clean.length}.`;
      if (clean.length > 13)   return `SA ID must be 13 digits. You entered ${clean.length}.`;
      // SA ID month/day basic sanity
      const month = parseInt(clean.slice(2, 4), 10);
      const day   = parseInt(clean.slice(4, 6), 10);
      if (month < 1 || month > 12 || day < 1 || day > 31)
        return "SA ID contains an invalid date of birth. Please re-check your 13-digit ID number.";
      return null;
    }

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTRY CONFIG
// ✅ Nigeria: Driver's License removed. Only BVN, NIN, Voter's Card.
// ─────────────────────────────────────────────────────────────────────────────
const COUNTRY_CONFIG: Record<string, {
  label: string;
  tier1: Array<{ value: string; label: string; hint: string }>;
  tier2: string[];
}> = {
  NG: {
    label: "Nigeria",
    tier1: [
      {
        value: "BVN",
        label: "BVN (Bank Verification Number) ⭐ Recommended",
        hint:  "11 digits — find yours via your bank app or dial *565*0# on your registered number",
      },
      {
        value: "NIN",
        label: "NIN (National Identification Number)",
        hint:  "11 digits — found on your NIN slip, NIMC card, or dial *346# to retrieve it",
      },
      {
        value: "VOTER_ID",
        label: "Voter's Card (PVC)",
        hint:  "19 alphanumeric characters — found on the face of your PVC",
      },
      // ✅ Driver's License removed from Nigeria
    ],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
  GH: {
    label: "Ghana",
    tier1: [
      { value: "Ghana Card", label: "Ghana Card",   hint: "Format: GHA-XXXXXXXXX-Y" },
      { value: "SSNIT",      label: "SSNIT Number", hint: "Starts with C or P followed by 12 digits" },
    ],
    tier2: ["Utility Bill", "Bank Statement"],
  },
  TZ: {
    label: "Tanzania",
    tier1: [
      {
        value: "NIDA",
        label: "NIDA Number",
        hint:  "20 digits — format YYYYMMDD-NNNNN-NNNNN-NN. Also have your ID issue date ready.",
      },
    ],
    tier2: ["Utility Bill", "Bank Statement"],
  },
  ZA: {
    label: "South Africa",
    tier1: [
      { value: "SA National ID", label: "SA National ID", hint: "13 digits — your green ID book or smart ID card number" },
    ],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
};

const TIER_LIMITS = {
  1: { daily: "2,000 USDT/day",  monthly: "5,000 USDT/month"  },
  2: { daily: "10,000 USDT/day", monthly: "50,000 USDT/month" },
};

// ─────────────────────────────────────────────────────────────────────────────
// DEVICE FINGERPRINT
// ─────────────────────────────────────────────────────────────────────────────
async function collectDevicePayload(): Promise<string> {
  try {
    const FP     = await import("https://openfpcdn.io/fingerprintjs/v4" as any);
    const fp     = await FP.load();
    const result = await fp.get();
    return JSON.stringify({
      visitorId:   result.visitorId,
      timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
      tzOffset:    -new Date().getTimezoneOffset(),
      language:    navigator.language,
      platform:    navigator.platform,
      screenRes:   `${screen.width}x${screen.height}`,
      touchPoints: navigator.maxTouchPoints,
      canvas:      result.components?.canvas?.value ?? null,
      audio:       result.components?.audio?.value ?? null,
    });
  } catch {
    return JSON.stringify({
      visitorId:   null,
      timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
      tzOffset:    -new Date().getTimezoneOffset(),
      language:    navigator.language,
      platform:    navigator.platform,
      screenRes:   `${screen.width}x${screen.height}`,
      touchPoints: navigator.maxTouchPoints,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
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

function SuccessScreen({ message, waLink }: { message: string; waLink: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-[18px] font-semibold text-emerald-600 mb-2">Submitted Successfully</h3>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">{message}</p>
      <a href={waLink}
        className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors">
        Return to WhatsApp →
      </a>
      <p className="text-[12px] text-gray-400 mt-3">You can close this page after tapping above.</p>
    </div>
  );
}

function UnderReviewScreen({ waLink }: { waLink: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">⏳</div>
      <h3 className="text-[18px] font-semibold text-[#1a1a2e] mb-2">Verification Under Review</h3>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
        Your submission has been received and is being reviewed by our compliance team.
        You'll be notified on WhatsApp once complete — usually within a few hours.
      </p>
      <a href={waLink}
        className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors">
        Return to WhatsApp →
      </a>
    </div>
  );
}

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
  const waLink = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent("I just completed my identity verification.")}`;
  const config  = COUNTRY_CONFIG[countryCode] ?? COUNTRY_CONFIG["NG"]!;
  const idTypes = config.tier1;

  const [firstName,   setFirstName]   = useState("");
  const [lastName,    setLastName]    = useState("");
  const [docType,     setDocType]     = useState("");
  const [idNumber,    setIdNumber]    = useState("");
  const [issueDate,   setIssueDate]   = useState("");  // Tanzania NIDA requires issue date
  const [state,       setState]       = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [error,       setError]       = useState("");
  const [underReview, setUnderReview] = useState(false);

  const selectedHint = idTypes.find(t => t.value === docType)?.hint ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!docType) { setError("Please select an ID type."); return; }

    // Client-side format gate — instant, no API call
    const clientError = validateIdClientSide(docType, idNumber);
    if (clientError) { setError(clientError); return; }

    setState("submitting");
    setError("");

    const devicePayload = await collectDevicePayload();
    const body = new URLSearchParams({
      token,
      firstName:  firstName.trim(),
      lastName:   lastName.trim(),
      docType,
      idNumber:   idNumber.trim(),
      issueDate:  issueDate.trim(),
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
        if (data.underReview) setUnderReview(true);
        else setState("success");
      } else {
        setError(data.message || "Submission failed. Please check your details and try again.");
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
          Tier 1 Upgrade · {config!.label}
        </span>
        <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Verify Your Identity 🛡️</h2>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-[13px] text-emerald-700 leading-relaxed">
        📈 After verification: <strong>{limits.daily}</strong> · <strong>{limits.monthly}</strong>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🔒 Your ID number is transmitted over an encrypted connection. We do not store it after verification.
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">First Name</label>
          <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}
            placeholder="As on your ID" autoComplete="given-name"
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Last Name</label>
          <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)}
            placeholder="As on your ID" autoComplete="family-name"
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Type</label>
        <select required value={docType} onChange={e => { setDocType(e.target.value); setIdNumber(""); setIssueDate(""); setError(""); }}
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white">
          <option value="">Select document type</option>
          {idTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {selectedHint && (
          <p className="text-[11px] text-gray-400 mt-1.5 pl-1">💡 {selectedHint}</p>
        )}
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Number</label>
        <input type="text" required value={idNumber}
          onChange={e => { setIdNumber(e.target.value); setError(""); }}
          placeholder="Enter your ID number"
          autoComplete="off" spellCheck={false}
          inputMode="numeric"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors tracking-wider" />
      </div>

      {/* Issue date — only required for Tanzania NIDA */}
      {docType === "NIDA" && countryCode === "TZ" && (
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
            ID Issue Date <span className="text-red-400">*</span>
          </label>
          <input type="date" required value={issueDate}
            onChange={e => setIssueDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
          <p className="text-[11px] text-gray-400 mt-1.5 pl-1">💡 Date shown on your NIDA card</p>
        </div>
      )}

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 leading-relaxed">
          ⚠️ {error}
        </p>
      )}

      <button type="submit" disabled={state === "submitting"}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1">
        {state === "submitting" ? "Verifying…" : "Verify My Identity"}
      </button>

      {state === "submitting" && (
        <p className="text-[12px] text-gray-400 text-center animate-pulse">
          Checking your ID with government database…
        </p>
      )}

      <p className="text-[12px] text-gray-400 text-center">🔐 256-bit encrypted · ID not stored after verification</p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 2 FORM
// ─────────────────────────────────────────────────────────────────────────────
function Tier2Form({ token, countryCode }: { token: string; countryCode: string }) {
  const waLink   = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent("I just submitted my proof of address.")}`;
  const config   = COUNTRY_CONFIG[countryCode] ?? COUNTRY_CONFIG["NG"]!;
  const docTypes = config.tier2;

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city,         setCity]         = useState("");
  const [docType,      setDocType]      = useState("");
  const [document,     setDocument]     = useState<File | null>(null);
  const [state,        setState]        = useState<"idle"|"submitting"|"success">("idle");
  const [error,        setError]        = useState("");
  const [underReview,  setUnderReview]  = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!document) { setError("Please upload your proof of address document."); return; }
    if (document.size > 5 * 1024 * 1024) { setError("File too large. Maximum size is 5MB."); return; }

    setState("submitting");
    setError("");

    const devicePayload = await collectDevicePayload();
    const formData = new FormData();
    formData.append("token",         token);
    formData.append("addressLine1",  addressLine1.trim());
    formData.append("addressLine2",  addressLine2.trim());
    formData.append("city",          city.trim());
    formData.append("docType",       docType);
    formData.append("document",      document);
    formData.append("devicePayload", devicePayload);

    try {
      const res  = await fetch(`${API_BASE}/kyc/submit-address`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        if (data.underReview) setUnderReview(true);
        else setState("success");
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
          Tier 2 Upgrade · {config!.label}
        </span>
        <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Confirm Your Address 🏠</h2>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-[13px] text-emerald-700 leading-relaxed">
        📈 After verification: <strong>{limits.daily}</strong> · <strong>{limits.monthly}</strong>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🔒 Upload a document issued within the last 3 months showing your name and address.
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Address Line 1</label>
        <input type="text" required value={addressLine1} onChange={e => setAddressLine1(e.target.value)}
          placeholder="Street address" autoComplete="address-line1"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
          Address Line 2 <span className="text-gray-400">(optional)</span>
        </label>
        <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)}
          placeholder="Apartment, suite, etc." autoComplete="address-line2"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">City / State</label>
        <input type="text" required value={city} onChange={e => setCity(e.target.value)}
          placeholder="e.g. Lagos, Lagos State"
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">Document Type</label>
        <select required value={docType} onChange={e => setDocType(e.target.value)}
          className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white">
          <option value="">Select document type</option>
          {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
          Upload Document <span className="text-gray-400">(PDF, JPG, PNG — max 5MB)</span>
        </label>
        <div onClick={() => fileRef.current?.click()}
          className="w-full px-3.5 py-3 border-[1.5px] border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
          <p className="text-[14px] text-gray-500 text-center">
            {document ? `✅ ${document.name}` : "Tap to select file"}
          </p>
        </div>
        <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
          onChange={e => setDocument(e.target.files?.[0] ?? null)} />
      </div>

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">⚠️ {error}</p>
      )}

      <button type="submit" disabled={state === "submitting"}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1">
        {state === "submitting" ? "Submitting…" : "Submit for Verification"}
      </button>

      <p className="text-[12px] text-gray-400 text-center">🔐 Encrypted in transit · Documents deleted after verification</p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROUTER
// ─────────────────────────────────────────────────────────────────────────────
function KycPageInner() {
  const params      = useSearchParams();
  const token       = params.get("token") || "";
  const tier        = parseInt(params.get("tier") || "1", 10);
  const countryCode = (params.get("country") || "NG").toUpperCase();

  if (!token) {
    return <KycCard><ErrorScreen message="Missing verification link. Please request a new one from WhatsApp by typing *kyc*." /></KycCard>;
  }
  if (![1, 2].includes(tier)) {
    return <KycCard><ErrorScreen message="Invalid verification tier. Please request a new link from the bot." /></KycCard>;
  }

  return (
    <KycCard>
      {tier === 1
        ? <Tier1Form token={token} countryCode={countryCode} />
        : <Tier2Form token={token} countryCode={countryCode} />
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