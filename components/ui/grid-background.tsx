'use client';

import { useId } from "react";
import { motion } from "framer-motion";

interface GridBackgroundProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  highlightedSquares?: Array<[number, number]>; // [x, y] coordinates
}

export function GridBackground({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  highlightedSquares = [],
  ...props
}: GridBackgroundProps) {
  const id = useId();

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} {...props}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-white/5 transition-colors duration-300 mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)"
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        
        {/* Highlighted Squares */}
        {highlightedSquares.map(([hx, hy], index) => (
          <motion.rect
            key={`${hx}-${hy}-${index}`}
            width={width - 1}
            height={height - 1}
            x={hx * width + x + 1}
            y={hy * height + y + 1}
            className="stroke-red-500/50 fill-transparent stroke-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 0.4, 1],
              scale: [0.8, 1, 1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2, // Staggered "Tetris-like" loading
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
