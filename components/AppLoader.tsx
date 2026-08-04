'use client';

import { useEffect, useState } from 'react';
import Loader from './ui/loader-15';

interface AppLoaderProps {
  isLoading: boolean;
}

export default function AppLoader({ isLoading }: AppLoaderProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!isLoading) {
      setOpacity(0);
    }
  }, [isLoading]);

  if (!isLoading && opacity === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Брендированный лоадер */}
        <Loader />

        {/* Название бренда — смещено чуть ниже */}
        <h1 className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-foreground/80">
          ko:agency
        </h1>
      </div>
    </div>
  );
}
