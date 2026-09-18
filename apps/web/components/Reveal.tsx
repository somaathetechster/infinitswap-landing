"use client";
import { useEffect, useRef } from "react";
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver((entries) => { const entry = entries[0]; if (entry?.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); } }, { threshold: 0.12 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={("reveal " + className).trim()}>{children}</div>;
}
