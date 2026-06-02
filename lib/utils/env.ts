export function isFigmaWorker(): boolean {
  if (typeof window === 'undefined') return true;
  
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('figma') || ua.includes('electron')) {
      return true;
    }
  }
  
  // Check for restricted environment characteristics
  try {
    // Accessing certain properties might be restricted
    if (!window.document || !window.location) return true;
  } catch (e) {
    return true;
  }
  
  return false;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined' && !isFigmaWorker();
}
