// apps/web/app/legal/layout.tsx
// Styling now lives in <LegalShell /> (components/LegalShell.tsx), which each
// legal page renders directly. This layout is a pass-through so the shell is
// not double-wrapped.
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
