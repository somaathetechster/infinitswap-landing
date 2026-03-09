'use client'; // Required because Lenis is a client-side interaction provider

import { ReactLenis } from '@studio-freight/react-lenis';
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Note: Metadata and Viewport exports must remain in a separate 
// 'layout.tsx' if you want them to be server-rendered, OR 
// you can move them to a 'metadata.ts' file. 
// For this layout to be 'use client', we focus on the structure.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-infinite-magenta selection:text-white">
      <body className="antialiased bg-parchment text-ink-black min-h-screen">
        
        {/* 1. THE LENIS ROOT: This is the magic "Xara" scroll engine */}
        <ReactLenis root options={{ 
          lerp: 0.1,         // Speed of the "inertia" (lower is smoother/heavier)
          duration: 1.5,     // How long the scroll animation lasts
          smoothWheel: true, 
          wheelMultiplier: 1, 
          infinite: false 
        }}>
          
          {/* THE DRAFTING FOUNDATION */}
          <div className="technical-grid fixed inset-0 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}