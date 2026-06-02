'use client';

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "./use-mobile";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // How far it moves (0.1 to 1)
}

export function MagneticButton({ 
  children, 
  className, 
  onClick,
  strength = 0.35 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}
