'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from './utils';

const CYBER_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface CipherRevealProps {
  text: string;
  className?: string;
  delay?: number;
  replayOnHover?: boolean;
  scrambleSpeed?: number; // ms per frame
}

export const CipherReveal = ({ 
  text, 
  className, 
  delay = 0, 
  replayOnHover = true,
  scrambleSpeed = 40 
}: CipherRevealProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasViewed, setHasViewed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Intersection Observer for initial trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasViewed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation Logic
  useEffect(() => {
    if (!hasViewed && !isHovering) return;
    
    let startTimeout: NodeJS.Timeout;
    
    const runAnimation = () => {
      setIsAnimating(true);
      let iteration = 0;
      
      const interval = setInterval(() => {
        setDisplayText(prev => 
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
          setDisplayText(text); // Ensure final state is clean
        }
        
        iteration += 1 / 2; // Reveal speed
      }, scrambleSpeed);

      return () => clearInterval(interval);
    };

    if (hasViewed && !isHovering) {
      // Initial reveal
      startTimeout = setTimeout(runAnimation, delay * 1000);
    } else if (isHovering && replayOnHover) {
      // Hover reveal
      runAnimation();
    }

    return () => clearTimeout(startTimeout);
  }, [hasViewed, isHovering, text, delay, replayOnHover, scrambleSpeed]);

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block relative", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText.split('').map((char, i) => (
        <span 
          key={i}
          className={cn(
            "inline-block transition-colors duration-100",
            // If the character is correctly revealed, use normal color
            // If it's still scrambling (index >= iteration roughly), use accent color
            // Since we don't track exact iteration in render, we rely on the char matching
            char !== text[i] ? "text-[#E60000] opacity-80" : "text-inherit"
          )}
        >
          {char}
        </span>
      ))}
      {isAnimating && (
        <span className="inline-block w-2 h-[1em] bg-[#E60000] align-middle ml-1 animate-pulse" />
      )}
    </motion.span>
  );
};
