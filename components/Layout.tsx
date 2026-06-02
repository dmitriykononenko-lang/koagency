'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation } from '@/lib/router-shim';
import { useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300 selection:bg-[#E60000] selection:text-white">
      
      {/* Global Noise Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* Scanline Effect (Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

      {/* Background Effects (Dark Mode / Cyberpunk Vibe) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 z-0 hidden md:dark:block">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E60000] opacity-10 blur-[100px]" 
          style={{ 
            animation: 'chaos-float 20s ease-in-out infinite'
          }} 
        />
        <div 
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#E60000] opacity-10 blur-[80px]" 
          style={{ 
            animation: 'chaos-float 20s ease-in-out infinite',
            animationDelay: '3s' 
          }} 
        />
        <div 
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#101010] opacity-5 blur-[60px]" 
          style={{ 
            animation: 'chaos-float 20s ease-in-out infinite',
            animationDelay: '6s' 
          }} 
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
      
      <style>{`
        @keyframes chaos-float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
