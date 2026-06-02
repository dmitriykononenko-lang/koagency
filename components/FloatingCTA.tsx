'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 flex flex-col gap-3 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Contact Button */}
      <button
        onClick={scrollToContact}
        className="group relative w-14 h-14 bg-[#E60000] hover:bg-[#cc0000] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Связаться с нами"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-[#101010] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Связаться с нами
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-4 border-transparent border-l-[#101010]" />
        </div>

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-[#E60000] animate-ping opacity-20" />
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="group w-14 h-14 bg-white hover:bg-[#f5f5f5] text-[#101010] border border-black/10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Наверх"
      >
        <ArrowUp className="w-5 h-5" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-[#101010] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Наверх
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-4 border-transparent border-l-[#101010]" />
        </div>
      </button>
    </div>
  );
}
