'use client';

import { motion as originalMotion, AnimatePresence as OriginalAnimatePresence, useInView as originalUseInView } from 'framer-motion';
import { isFigmaWorker } from '../lib/utils/env';
import React, { forwardRef } from 'react';

// Create a safe proxy for motion components
const safeMotionHandler = {
  get: function(target: any, prop: string) {
    // If accessing a component like motion.div
    if (typeof prop === 'string') {
      // Return a component that just renders the HTML tag
      return forwardRef((props: any, ref) => {
        if (isFigmaWorker()) {
          // In Figma, just render the tag without animations
          const { 
            initial, animate, exit, transition, variants, 
            whileHover, whileTap, whileDrag, whileFocus, whileInView,
            viewport, onAnimationStart, onAnimationComplete,
            ...domProps 
          } = props;
          
          // Filter out motion-specific props that might be passed to DOM
          return React.createElement(prop, { ...domProps, ref });
        }
        
        // In real browser, use original motion
        // @ts-ignore
        const Component = originalMotion[prop];
        return <Component {...props} ref={ref} />;
      });
    }
    return target[prop];
  }
};

// Export a safe version of motion
export const motion = new Proxy({}, safeMotionHandler);

// Export safe AnimatePresence
export const AnimatePresence = ({ children, ...props }: any) => {
  if (isFigmaWorker()) {
    return <>{children}</>;
  }
  return <OriginalAnimatePresence {...props}>{children}</OriginalAnimatePresence>;
};

// Export safe useInView
export const useInView = (ref: any, options: any) => {
  if (isFigmaWorker()) {
    return true; // Always visible in Figma to show content
  }
  try {
    return originalUseInView(ref, options);
  } catch (e) {
    return true;
  }
};
