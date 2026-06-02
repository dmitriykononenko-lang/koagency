import React from 'react';
import { Info, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from './utils';

interface InfoCardProps {
  children: React.ReactNode;
  variant?: 'info' | 'tip' | 'warning' | 'success';
  className?: string;
}

const variants = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: Info,
    iconColor: 'text-blue-600',
    textColor: 'text-blue-900'
  },
  tip: {
    bg: 'bg-green-50 border-green-200',
    icon: Lightbulb,
    iconColor: 'text-green-600',
    textColor: 'text-green-900'
  },
  warning: {
    bg: 'bg-orange-50 border-orange-200',
    icon: AlertCircle,
    iconColor: 'text-orange-600',
    textColor: 'text-orange-900'
  },
  success: {
    bg: 'bg-emerald-50 border-emerald-200',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600',
    textColor: 'text-emerald-900'
  }
};

export function InfoCard({ children, variant = 'info', className = '' }: InfoCardProps) {
  const { bg, icon: Icon, iconColor, textColor } = variants[variant];
  
  return (
    <div className={cn(
      'flex items-start gap-3 p-3 rounded-lg border text-sm',
      bg,
      textColor,
      className
    )}>
      <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', iconColor)} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
