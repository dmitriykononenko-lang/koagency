'use client';

import { motion } from 'framer-motion';
import { cn } from './utils';

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
  /** Цвет обводки. По умолчанию — фирменный красный ko:agency. */
  strokeClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

/**
 * Анимированная «обводка от руки» вокруг заголовка.
 * Источник: KokonutUI (21st.dev), адаптировано под бренд ko:agency (красный #E60000).
 */
function HandWrittenTitle({
  title = 'Hand Written',
  subtitle,
  strokeClassName = 'text-[#E60000]',
  titleClassName = 'text-[#101010]',
  subtitleClassName = 'text-[#666666]',
  className,
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as const },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={cn('relative mx-auto w-full max-w-4xl py-12 md:py-16', className)}>
      <div className="absolute inset-0">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          animate="visible"
          className="h-full w-full"
        >
          <title>ko:agency</title>
          <motion.path
            d="M 950 90
               C 1250 300, 1050 480, 600 520
               C 250 520, 150 480, 150 300
               C 150 120, 350 80, 600 80
               C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className={cn('opacity-90', strokeClassName)}
          />
        </motion.svg>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.h1
          className={cn(
            'flex items-center gap-2 text-4xl font-semibold tracking-tighter md:text-6xl',
            titleClassName
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={cn('mt-3 text-lg md:text-xl', subtitleClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
