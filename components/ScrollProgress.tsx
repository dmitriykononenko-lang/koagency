'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#E60000] to-[#ff4444] transition-all duration-150 ease-out shadow-lg shadow-[#E60000]/20"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
