'use client';

import { motion, useInView } from './SafeMotion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { isFigmaWorker } from '../lib/utils/env';

// Safe useInView hook
function useSafeInView(ref: React.RefObject<HTMLElement>, options: { once?: boolean } = {}) {
  return useInView(ref, options);
}

// Fade in animation
export function FadeIn({ children, delay = 0, duration = 0.5, className = '' }: { children: ReactNode; delay?: number; duration?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  if (!isInView) {
    // Initial state (hidden)
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from left
export function SlideInLeft({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  if (!isInView) {
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from right
export function SlideInRight({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  if (!isInView) {
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale animation
export function ScaleIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  if (!isInView) {
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for children
export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }: { children: ReactNode; staggerDelay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item (child of StaggerContainer)
export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover scale animation
export function HoverScale({ children, scale = 1.05, className = '' }: { children: ReactNode; scale?: number; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating animation
export function FloatingAnimation({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Number counter animation
export function AnimatedCounter({ from = 0, to, duration = 2, suffix = '', prefix = '' }: { from?: number; to: number; duration?: number; suffix?: string; prefix?: string }) {
  const [currentValue, setCurrentValue] = useState(from);
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    if (!isFinite(to)) {
      setCurrentValue(to);
      return;
    }
    
    if (isFigmaWorker() || typeof window === 'undefined' || !window.requestAnimationFrame) {
      setCurrentValue(to);
      return;
    }
    
    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const nextValue = from + (to - from) * easeOut;
      setCurrentValue(nextValue);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };
    
    animationFrame = window.requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame && typeof window !== 'undefined' && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, from, to, duration]);

  const displayValue = isFinite(currentValue) ? Math.round(currentValue) : 0;
  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

// Progress bar animation
export function AnimatedProgressBar({ progress, className = '', delay = 0 }: { progress: number; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={isInView ? { width: `${progress}%` } : { width: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    />
  );
}

// Rotating element
export function RotateIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });

  if (!isInView) {
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -180 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Bounce animation
export function BounceIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });

  if (!isInView) {
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Typewriter effect
export function TypewriterText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const letters = Array.from(text);
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });
  
  if (!isInView) {
    return <span ref={ref} className={className} style={{ opacity: 0 }}>{text}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: delay + index * 0.03
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

// Blur reveal
export function BlurReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: true });

  if (!isInView) {
    return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Card flip animation
export function FlipCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ rotateY: 10, rotateX: 10 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect
export function ParallaxScroll({ children, speed = 50, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useSafeInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0 }}
      animate={isInView ? { y: -speed } : { y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
