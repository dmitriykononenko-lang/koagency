'use client';

import React, { useRef, useState, useEffect } from "react";
import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ 
  children, 
  className, 
  spotlightColor = "rgba(230, 0, 0, 0.15)", // Red default for ko:agency
  ...props 
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isMobile) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setOpacity(1);
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A1A1A] transition-colors",
        className
      )}
      {...props}
    >
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      
      {/* Content Layer - ensures text is above the glow if needed, or mixes nicely */}
      <div className="relative h-full z-10">
        {children}
      </div>
    </div>
  );
}
