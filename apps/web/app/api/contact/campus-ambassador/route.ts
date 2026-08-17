/**
 * apps/web/app/api/contact/campus-ambassador/route.ts
 *
 * Receives a Campus Ambassador application and emails it to the support and
 * marketing inboxes via Resend. There was no mail transport in the project
 * before this route, so Resend is the one added dependency.
 *
 * Env:
 *   RESEND_API_KEY             required
 *   CAMPUS_AMBASSADOR_FROM     optional, defaults to onboarding@resend.dev
 */

import { Resend } from "resend";
import {
  SECTIONS,
  firstMissingField,
  isVisible,
  type Application,
} from "../../../../lib/campus-ambassador";

const TO = ["support@infinitswap.ai", "marketing@infinitswap.ai"];
const FROM = process.env.CAMPUS_AMBASSADOR_FROM || "Infinitswap <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(values: Application) {
  const sections = SECTIONS.map((section) => {
    const rows = section.fields
      .filter((field) => isVisible(field, values))
      .map((field) => {
        const answer = (values[field.name] ?? "").trim();
        return `
          <tr>
            <td style="padding:14px 0 4px;font:600 13px/1.4 Helvetica,Arial,sans-serif;color:#1a1a2e;">
              ${escapeHtml(field.label)}
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 10px;border-bottom:1px solid #eceff3;font:400 15px/1.6 Helvetica,Arial,sans-serif;color:#3d4356;white-space:pre-wrap;">
              ${answer ? escapeHtml(answer) : '<span style="color:#9aa1b1;">— not provided —</span>'}
            </td>
          </tr>`;
      })
      .join("");

    return `
      <h2 style="margin:32px 0 4px;font:700 12px/1.4 Helvetica,Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#0827dc;">
        ${escapeHtml(section.title)}
      </h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
  }).join("");

  return `
  <div style="background:#f0f4f8;padding:32px 16px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;">
      <p style="margin:0;font:800 20px/1.2 Helvetica,Arial,sans-serif;color:#1a1a2e;">Infinitswap</p>
      <p style="margin:4px 0 0;font:400 13px/1.4 Helvetica,Arial,sans-serif;color:#9aa1b1;">
        New Campus Ambassador Application
      </p>
      ${sections}
      <p style="margin:32px 0 0;font:400 12px/1.5 Helvetica,Arial,sans-serif;color:#9aa1b1;">
        Submitted ${new Date().toUTCString()} via infinitswap.ai/campusambassador
      </p>
    </div>
  </div>`;
}

function renderText(values: Application) {
  return SECTIONS.map((section) => {
    const body = section.fields
      .filter((field) => isVisible(field, values))
      .map((field) => `${field.label}\n${(values[field.name] ?? "").trim() || "— not provided —"}`)
      .join("\n\n");
    return `${section.title.toUpperCase()}\n${"-".repeat(section.title.length)}\n\n${body}`;
  }).join("\n\n\n");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[campus-ambassador] RESEND_API_KEY is not configured");
    return Response.json(
      { success: false, message: "Applications are temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  // Only keep known fields, as strings — nothing else reaches the email.
  const values: Application = {};
  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    if (typeof value === "string") values[key] = value.slice(0, 5000);
  }

  const missing = firstMissingField(values);
  if (missing) {
    return Response.json(
      { success: false, message: `Please answer: ${missing.label}` },
      { status: 400 }
    );
  }

  const applicant = values.fullName?.trim() || "Applicant";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `Campus Ambassador Application — ${applicant}`,
      html: renderHtml(values),
      text: renderText(values),
    });

    if (error) {
      console.error("[campus-ambassador] Resend error", error);
      return Response.json(
        { success: false, message: "We couldn't submit your application. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[campus-ambassador] send failed", err);
    return Response.json(
      { success: false, message: "We couldn't submit your application. Please try again." },
      { status: 502 }
    );
  }
}
