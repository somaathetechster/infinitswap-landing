'use client';

import { useMemo } from 'react';

/**
 * Deterministic dot grain. Extracted from Protocol (dark dots on light sections)
 * and AssistantVisual (white dots on the magenta section) which had near-identical copies.
 */
export default function GrainTexture({
  count = 120,
  tone = 'dark',
}: {
  count?: number;
  tone?: 'dark' | 'light';
}) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${(index * (tone === 'dark' ? 21 : 23)) % 100}%`,
        opacity: ((index % 6) + 2) / (tone === 'dark' ? 28 : 30),
        size: index % 3 === 0 ? 1 : 2,
      })),
    [count, tone]
  );

  return (
    <div
      className={
        tone === 'dark'
          ? 'pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply'
          : 'pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light'
      }
    >
      {dots.map((dot) => (
        <span
          key={dot.id}
          className={`absolute rounded-full ${tone === 'dark' ? 'bg-black' : 'bg-white'}`}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}
