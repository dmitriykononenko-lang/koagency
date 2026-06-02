'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Perspective Grid */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, #E60000 1px, transparent 1px),
                           linear-gradient(to bottom, #E60000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'top center',
          maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent)'
        }}
      >
        {/* Moving grid animation */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0px 0px', '0px 40px']
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "linear" 
          }}
          style={{
            backgroundImage: 'inherit',
            backgroundSize: 'inherit'
          }}
        />
      </div>

      {/* Digital Horizon Line */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E60000] to-transparent opacity-50 blur-sm" />

      {/* Scanning Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-transparent via-[#E60000]/10 to-transparent"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f5f5f5_100%)] opacity-60" />
    </div>
  );
}
