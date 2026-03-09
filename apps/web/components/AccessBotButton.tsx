'use client';

import { motion } from 'framer-motion';

export default function AccessBotButton() {
  // 🔒 Your WhatsApp Business number (unchanged)
  const WHATSAPP_NUMBER = "447860028474";

  // Initial message users send
  const INITIAL_INTENT = "Hi! I want to swap my crypto for cash.";
  const encodedMessage = encodeURIComponent(INITIAL_INTENT);

  const botUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <motion.a
      href={botUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start crypto to cash swap on WhatsApp"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="
        group relative inline-flex items-center gap-3
        rounded-full
        bg-[#111111]
        px-7 py-3
        font-mono text-[11px] font-bold uppercase tracking-[0.28em]
        text-white
        shadow-[0_14px_40px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:bg-[#0827dc]
      "
    >
      {/* subtle glow */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle,rgba(8,39,220,0.35)_0%,transparent_70%)]" />

      {/* live pulse indicator */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
      </span>

      <span className="relative">Start on WhatsApp</span>

      <svg
        className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.a>
  );
}