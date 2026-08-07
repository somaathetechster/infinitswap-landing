/**
 * lib/identity-verification.ts
 *
 * Shared, single source of truth for per-country ID types and client-side
 * format validation. Extracted from app/kyc/page.tsx so that /kyc and
 * /account-recovery (and anything else that needs to re-verify identity)
 * never drift out of sync with each other.
 *
 * apps/web/app/kyc/page.tsx should import COUNTRY_CONFIG and
 * validateIdClientSide from here instead of defining its own copies.
 */

export function validateIdClientSide(docType: string, idNumber: string): string | null {
  const clean = idNumber.trim().replace(/\s/g, "").toUpperCase();
  if (!clean) return "Please enter your ID number.";

  const isAllSameDigit = /^(\d)\1+$/.test(clean);

  switch (docType) {
    case "BVN": {
      if (!/^\d+$/.test(clean)) return "BVN must contain digits only.";
      if (clean.length !== 11) return `BVN must be 11 digits. You entered ${clean.length}.`;
      if (isAllSameDigit) return "BVN appears to be a placeholder number.";
      return null;
    }

    case "NIN": {
      if (!/^\d+$/.test(clean)) return "NIN must contain digits only.";
      if (clean.length !== 11)
        return `NIN must be 11 digits. You entered ${clean.length} — check your NIN slip, NIMC card, or dial *346# to retrieve it.`;
      if (isAllSameDigit) return "NIN appears to be a placeholder number.";
      return null;
    }

    case "VOTER_ID": {
      const stripped = clean.replace(/[-]/g, "");
      if (stripped.length !== 19) return `Voter ID must be 19 characters. You entered ${stripped.length}.`;
      if (!/^[A-Z0-9]{19}$/.test(stripped)) return "Voter ID must contain only letters and numbers.";
      return null;
    }

    case "DRIVERS_LICENSE": {
      if (clean.length !== 14) return `Driver's License must be 14 characters. You entered ${clean.length}.`;
      if (!/^[A-Z]{3}[A-Z0-9]{11}$/.test(clean))
        return "Driver's License must start with a 3-letter state code (e.g. LAG, ABJ).";
      return null;
    }

    case "Ghana Card":
    case "GHANA_CARD": {
      if (!/^GHA-?\d{9}-?\d$/i.test(clean))
        return "Ghana Card must be in the format GHA-XXXXXXXXX-Y (e.g. GHA-123456789-0).";
      return null;
    }

    case "SSNIT": {
      if (!/^[CP]\d{12}$/i.test(clean)) return "SSNIT must start with C or P followed by 12 digits.";
      return null;
    }

    case "NIDA": {
      const n = clean.replace(/[-]/g, "");
      if (!/^\d+$/.test(n)) return "NIDA number must contain digits only (hyphens are optional).";
      if (n.length !== 20) return `NIDA number must be 20 digits. You entered ${n.length}.`;
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
      if (clean.length !== 13) return `SA ID must be 13 digits. You entered ${clean.length}.`;
      const month = parseInt(clean.slice(2, 4), 10);
      const day = parseInt(clean.slice(4, 6), 10);
      if (month < 1 || month > 12 || day < 1 || day > 31)
        return "SA ID contains an invalid date of birth. Please re-check your 13-digit ID number.";
      return null;
    }

    default:
      return null;
  }
}

export type IdTypeOption = { value: string; label: string; hint: string };

export const COUNTRY_CONFIG: Record<
  string,
  { label: string; tier1: IdTypeOption[]; tier2: string[] }
> = {
  NG: {
    label: "Nigeria",
    tier1: [
      {
        value: "BVN",
        label: "BVN (Bank Verification Number) ⭐ Recommended",
        hint: "11 digits — find yours via your bank app or dial *565*0# on your registered number",
      },
      {
        value: "NIN",
        label: "NIN (National Identification Number)",
        hint: "11 digits — found on your NIN slip, NIMC card, or dial *346# to retrieve it",
      },
      {
        value: "VOTER_ID",
        label: "Voter's Card (PVC)",
        hint: "19 alphanumeric characters — found on the face of your PVC",
      },
      {
        value: "DRIVERS_LICENSE",
        label: "Driver's License",
        hint: "14 characters — 3-letter state code followed by 11 characters (e.g. LAG12345678901)",
      },
    ],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
  GH: {
    label: "Ghana",
    tier1: [
      { value: "SSNIT", label: "SSNIT Number ⭐ Recommended", hint: "Starts with C or P followed by 12 digits (e.g. C987464748983)" },
      { value: "DRIVERS_LICENSE_GH", label: "Driver's License", hint: "Your Ghana driver's license number" },
      { value: "VOTER_ID_GH", label: "Voter's Card", hint: "Your Ghana voter ID number" },
      { value: "Ghana Card", label: "Ghana Card (NIA)", hint: "Format: GHA-XXXXXXXXX-Y — processed manually, may take a few hours" },
    ],
    tier2: ["Utility Bill", "Bank Statement"],
  },
  TZ: {
    label: "Tanzania",
    tier1: [
      {
        value: "NIDA",
        label: "NIDA Number",
        hint: "20 digits — format YYYYMMDD-NNNNN-NNNNN-NN. Also have your ID issue date ready.",
      },
    ],
    tier2: ["Utility Bill", "Bank Statement"],
  },
  ZA: {
    label: "South Africa",
    tier1: [{ value: "SA National ID", label: "SA National ID", hint: "13 digits — your green ID book or smart ID card number" }],
    tier2: ["Utility Bill", "Bank Statement", "Lease Agreement"],
  },
};