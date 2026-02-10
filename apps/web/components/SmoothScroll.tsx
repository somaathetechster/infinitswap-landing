'use client';
import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1,      // Lower = smoother/slower (0.1 is the sweet spot)
      duration: 1.5,   // How long the "glide" lasts
      smoothWheel: true 
    }}>
      {children}
    </ReactLenis>
  );
}