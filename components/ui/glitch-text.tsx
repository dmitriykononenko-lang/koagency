'use client';

import React, { useEffect, useState } from 'react';
import { cn } from './utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  enableHover?: boolean;
  enableInterval?: boolean; // Randomly glitch without interaction
}

export function GlitchText({ 
  text, 
  className, 
  as: Component = 'span',
  enableHover = true,
  enableInterval = false
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!enableInterval) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 3s
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [enableInterval]);

  return (
    <Component 
      className={cn(
        "relative inline-block", 
        enableHover && "group",
        className
      )}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Red channel */}
      <span 
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 -z-10 w-full h-full text-[#E60000] opacity-0 select-none pointer-events-none",
          enableHover && "group-hover:opacity-70 group-hover:animate-glitch-1",
          isGlitching && "opacity-70 animate-glitch-1"
        )}
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          transform: 'translate(-0.025em, -0.0125em)'
        }}
      >
        {text}
      </span>
      
      {/* Cyan channel */}
      <span 
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 -z-10 w-full h-full text-[#00FFFF] opacity-0 select-none pointer-events-none",
          enableHover && "group-hover:opacity-70 group-hover:animate-glitch-2",
          isGlitching && "opacity-70 animate-glitch-2"
        )}
        style={{ 
          clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)',
          transform: 'translate(0.025em, 0.0125em)'
        }}
      >
        {text}
      </span>

      {/* Green channel (New) */}
      <span 
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 -z-10 w-full h-full text-[#00FF00] opacity-0 select-none pointer-events-none",
          enableHover && "group-hover:opacity-70 group-hover:animate-glitch-3",
          isGlitching && "opacity-70 animate-glitch-3"
        )}
        style={{ 
          clipPath: 'polygon(0 40%, 100% 60%, 100% 80%, 0 20%)',
          transform: 'translate(-0.015em, 0.025em)'
        }}
      >
        {text}
      </span>

      <style>{`
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(15% 0 80% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(55% 0 10% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 1px); }
        }
        @keyframes glitch-anim-3 {
          0% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(-1px, 1px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(1px, -1px); }
          80% { clip-path: inset(40% 0 10% 0); transform: translate(-2px, -1px); }
          100% { clip-path: inset(10% 0 80% 0); transform: translate(2px, 1px); }
        }
        .animate-glitch-1 {
          animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-anim-2 0.4s infinite linear alternate-reverse;
        }
        .animate-glitch-3 {
          animation: glitch-anim-3 0.4s infinite linear alternate-reverse;
        }
      `}</style>
    </Component>
  );
}
