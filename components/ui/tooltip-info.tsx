import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip";

interface TooltipInfoProps {
  content: string | React.ReactNode;
  className?: string;
}

export function TooltipInfo({ content, className = '' }: TooltipInfoProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          type="button"
          className={`inline-flex items-center justify-center ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 transition-colors" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="text-sm">{content}</div>
      </TooltipContent>
    </Tooltip>
  );
}
