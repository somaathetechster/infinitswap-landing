"use client";

/**
 * apps/web/app/kyc/page.tsx
 *
 * ✅ ADDED [NIN]: NIN re-enabled for Nigeria Tier 1.
 * ✅ ADDED [DRIVERS-LICENSE-NG]: Driver's License re-added for Nigeria Tier 1.
 * ✅ ADDED [NIN-VALIDATION]: Client-side NIN validation (format only, no prefix rules).
 * ✅ ADDED [DRIVERS-LICENSE-VALIDATION]: Client-side DL validation.
 *
 * ✅ NEW [ID-MASKING]: The ID Number input in Tier1Form was a plain
 *    type="text" field, meaning BVN/NIN/etc. displayed in cleartext as the
 *    user typed — this is exactly what ended up visible in a beta tester's
 *    screenshot of this page that was then attached to a bug report. Field
 *    is now type="password" by default with a "Show"/"Hide" toggle so users
 *    can still verify what they typed before submitting, but the number
 *    isn't rendered in plaintext on-screen (or in a screenshot) by default.
 */

import { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://infinitswap-api.onrender.com";
const WA_BUSINESS_NUMBER = "447860028474";

function validateIdClientSide(docType: string, idNumber: string): string | null {
  const clean = idNumber.trim().replace(/\s/g, "").toUpperCase();
  if (!clean) return "Please enter your ID number.";

  const isAllSameDigit = /^(\d)\1+$/.test(clean);

  switch (docType) {

    case "BVN": {
      if (!/^\d+$/.test(clean)) return "BVN must contain digits only.";
      if (clean.length !== 11)  return `BVN must be 11 digits. You entered ${clean.length}.`;
      if (isAllSameDigit)       return "BVN appears to be a placeholder number.";
      return null;
    }

    case "NIN": {
      if (!/^\d+$/.test(clean)) return "NIN must contain digits only.";
      if (clean.length !== 11)  return `NIN must be 11 digits. You entered ${clean.length} — check your NIN slip, NIMC card, or dial *346# to retrieve it.`;
      if (isAllSameDigit)       return "NIN appears to be a placeholder number.";
      return null;
    }

    case "Ghana Card":
    case "GHANA_CARD": {
      if (!/^GHA-?\d{9}-?\d$/i.test(clean))
        return "Ghana Card must be in the format GHA-XXXXXXXXX-Y (e.g. GHA-123456789-0).";
      return null;
    }

    case "SSNIT": {
      if (!/^[CP]\d{12}$/i.test(clean))
        return "SSNIT must start with C or P followed by 12 digits.";
      return null;
    }

    case "NIDA": {
      const n = clean.replace(/[-]/g, "");
      if (!/^\d+$/.test(n)) return "NIDA number must contain digits only (hyphens are optional).";
      if (n.length !== 20)  return `NIDA number must be 20 digits. You entered ${n.length}.`;
      return null;
    }

    case "DRIVERS_LICENSE_GH": {
  if (clean.length < 6) return "Please enter your full driver's license number.";
  return null;
}

case "VOTER_ID_GH": {
  if (clean.length < 6) return "Please enter your full voter ID number.";
  return null;
}

    case "SA National ID":
    case "SA_NATIONAL_ID": {
      if (!/^\d+$/.test(clean)) return "SA ID must contain digits only.";
      if (clean.length !== 13)  return `SA ID must be 13 digits. You entered ${clean.length}.`;
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
    ],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
    GH: {
  label: "Ghana",
  tier1: [
    { value: "SSNIT",          label: "SSNIT Number ⭐ Recommended", hint: "Starts with C or P followed by 12 digits (e.g. C987464748983)" },
    { value: "DRIVERS_LICENSE_GH", label: "Driver's License",        hint: "Your Ghana driver's license number" },
    { value: "VOTER_ID_GH",    label: "Voter's Card",                hint: "Your Ghana voter ID number" },
    { value: "Ghana Card",     label: "Ghana Card (NIA)",            hint: "Format: GHA-XXXXXXXXX-Y — processed manually, may take a few hours" },
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
  UG: {
    label: "Uganda",
    tier1: [],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
  RW: {
    label: "Rwanda",
    tier1: [],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
};

const TIER_LIMITS = {
  1: { daily: "2,000 USDT/day",  monthly: "5,000 USDT/month"  },
  2: { daily: "10,000 USDT/day", monthly: "50,000 USDT/month" },
};

async function collectDevicePayload(): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <a href={waLink} className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors">
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
        You&apos;ll be notified on WhatsApp once complete — usually within a few hours.
      </p>
      <a href={waLink} className="inline-block w-full bg-[#25D366] text-white text-[15px] font-semibold rounded-xl py-3.5 text-center hover:bg-[#1fba58] transition-colors">
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

function Tier1Form({ token, countryCode }: { token: string; countryCode: string }) {
  return countryCode === "UG" || countryCode === "RW"
    ? <DocumentTier1Form token={token} countryCode={countryCode} />
    : <NumericTier1Form token={token} countryCode={countryCode} />;
}

function NumericTier1Form({ token, countryCode }: { token: string; countryCode: string }) {
  const waLink  = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent("I just completed my identity verification.")}`;
  const config  = COUNTRY_CONFIG[countryCode] ?? COUNTRY_CONFIG["NG"]!;
  const idTypes = config.tier1;

  const [firstName,   setFirstName]   = useState("");
  const [lastName,    setLastName]    = useState("");
  const [docType,     setDocType]     = useState("");
  const [idNumber,    setIdNumber]    = useState("");
  const [issueDate,   setIssueDate]   = useState("");
  const [state,       setState]       = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [error,       setError]       = useState("");
  const [underReview, setUnderReview] = useState(false);
  // ✅ NEW [ID-MASKING]
  const [showId,      setShowId]      = useState(false);

  const selectedHint = idTypes.find(t => t.value === docType)?.hint ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!docType) { setError("Please select an ID type."); return; }

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

      {/* ✅ NEW [ID-MASKING]: type toggles between password/text, default masked */}
      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1.5">ID Number</label>
        <div className="relative">
          <input
            type={showId ? "text" : "password"}
            required
            value={idNumber}
            onChange={e => { setIdNumber(e.target.value); setError(""); }}
            placeholder="Enter your ID number"
            autoComplete="off"
            spellCheck={false}
            inputMode={
  docType === "BVN" || docType === "NIN" || docType === "SSNIT"
    ? "numeric"
    : "text"
}

            className="w-full px-3.5 py-3 pr-14 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors tracking-wider"
          />
          <button
            type="button"
            onClick={() => setShowId(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-indigo-500 hover:text-indigo-700"
            tabIndex={-1}
          >
            {showId ? "Hide" : "Show"}
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 pl-1">
          🔒 Masked by default — tap &quot;Show&quot; only if you need to double-check what you typed.
        </p>
      </div>

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

const IMAGE_DOC_TYPES = [
  { value: "NATIONAL_ID", label: "National ID" },
  { value: "PASSPORT", label: "Passport" },
  { value: "DRIVERS_LICENSE", label: "Driver’s License" },
];

function DocumentTier1Form({ token, countryCode }: { token: string; countryCode: string }) {
  const waLink = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent("I just completed my identity verification.")}`;
  const country = COUNTRY_CONFIG[countryCode] ?? COUNTRY_CONFIG.UG!;
  const fileRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [docType, setDocType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const [underReview, setUnderReview] = useState(false);

  const selectFile = (file: File | null) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError("Please select a JPG or PNG image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image too large. Maximum size is 5 MB.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileRef.current) fileRef.current.value = "";
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!docType) {
      setError("Please select a document type.");
      return;
    }
    if (!selectedFile) {
      setError("Please upload a document image.");
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setError("Please select a JPG or PNG image.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image too large. Maximum size is 5 MB.");
      return;
    }

    setState("submitting");
    setError("");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("docType", docType);
    formData.append("document", selectedFile);

    try {
      const res = await fetch(`${API_BASE}/api/kyc/submit-document`, {
        method: "POST",
        body: formData,
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
      setError("Unable to submit your document. Your link may have expired or your connection may be unavailable. Please request a new link and try again.");
      setState("idle");
    }
  };

  if (underReview) return <UnderReviewScreen waLink={waLink} />;
  if (state === "success") return <SuccessScreen message="Your identity has been verified. Your Tier 1 limits are now active." waLink={waLink} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="inline-block bg-blue-50 border border-blue-200 text-blue-700 text-[12px] font-semibold rounded-md px-2.5 py-1 mb-3">
          Tier 1 Upgrade · {country.label}
        </span>
        <h2 className="text-[18px] font-semibold text-[#1a1a2e]">Verify Your Identity 🛡️</h2>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-[13px] text-emerald-700 leading-relaxed">
        📈 After verification: <strong>{TIER_LIMITS[1].daily}</strong> · <strong>{TIER_LIMITS[1].monthly}</strong>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-[13px] text-blue-700 leading-relaxed">
        🔒 Upload a clear photo of your document. JPG or PNG only, maximum 5 MB.
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="kyc-first-name" className="block text-[13px] font-medium text-gray-600 mb-1.5">First Name</label>
          <input id="kyc-first-name" type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="As on your ID" autoComplete="given-name" className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label htmlFor="kyc-last-name" className="block text-[13px] font-medium text-gray-600 mb-1.5">Last Name</label>
          <input id="kyc-last-name" type="text" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="As on your ID" autoComplete="family-name" className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>

      <div>
        <label htmlFor="kyc-document-type" className="block text-[13px] font-medium text-gray-600 mb-1.5">Document Type</label>
        <select id="kyc-document-type" required value={docType} onChange={e => { setDocType(e.target.value); setError(""); }} className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-xl text-[15px] text-gray-900 outline-none focus:border-indigo-500 transition-colors bg-white">
          <option value="">Select document type</option>
          {IMAGE_DOC_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="kyc-document-image" className="block text-[13px] font-medium text-gray-600 mb-1.5">Document Image</label>
        {previewUrl ? (
          <div className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Selected document preview" className="w-full max-h-56 object-contain rounded-xl border border-gray-200 bg-gray-50" />
            <div className="flex gap-2">
              <button type="button" onClick={() => fileRef.current?.click()} className="flex-1 border border-indigo-200 text-indigo-600 rounded-xl py-2.5 text-[13px] font-medium hover:bg-indigo-50 transition-colors">Reselect image</button>
              <button type="button" onClick={removeFile} className="border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-[13px] font-medium hover:bg-red-50 transition-colors">Remove</button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()} className="w-full px-3.5 py-4 border-[1.5px] border-dashed border-gray-300 rounded-xl bg-gray-50 text-[14px] text-gray-500 hover:bg-gray-100 transition-colors">Tap to select a JPG or PNG image</button>
        )}
        <input id="kyc-document-image" ref={fileRef} type="file" className="hidden" accept="image/jpeg,image/png" onChange={e => selectFile(e.target.files?.[0] ?? null)} />
        <p className="text-[11px] text-gray-400 mt-1.5 pl-1">JPG or PNG only · maximum 5 MB</p>
      </div>

      {error && <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 leading-relaxed">⚠️ {error}</p>}
      <button type="submit" disabled={state === "submitting"} className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl py-3.5 transition-colors mt-1">{state === "submitting" ? "Submitting…" : "Verify My Identity"}</button>
      {state === "submitting" && <p className="text-[12px] text-gray-400 text-center animate-pulse">Uploading your document securely…</p>}
      <p className="text-[12px] text-gray-400 text-center">🔐 256-bit encrypted · Documents deleted after verification</p>
    </form>
  );
}
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

function KycPageInner() {
  const params      = useSearchParams();
  const token       = params.get("token") || "";
  const tier        = parseInt(params.get("tier") || "1", 10);
  const countryParam = (params.get("country") || "NG").trim().toUpperCase();
  const countryCode = countryParam === "UGANDA" ? "UG" : countryParam === "RWANDA" ? "RW" : countryParam;

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
