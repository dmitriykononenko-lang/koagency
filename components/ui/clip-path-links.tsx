'use client';

import React from 'react';
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  Calculator,
  Briefcase,
  TrendingUp,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import { useAnimate } from 'framer-motion';

/**
 * ClipPathLinks (21st.dev) — адаптировано под ko:agency.
 * Убран react-icons (только lucide), брендовый красный reveal через primary-токены,
 * реальные контакты ko:agency. Сетка плиток с «вытеснением» из ближайшей стороны.
 */
export const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-border border border-border">
      <div className="grid grid-cols-2 divide-x divide-border">
        <LinkBox Icon={Send} label="Telegram" href="https://t.me/ko_agency" />
        <LinkBox Icon={MessageCircle} label="WhatsApp" href="https://wa.me/447835212468" />
      </div>
      <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
        <LinkBox Icon={Phone} label="+7 991 222-38-80" href="tel:+79912223880" />
        <LinkBox Icon={Phone} label="+44 7835 212468" href="tel:+447835212468" />
        <LinkBox Icon={Mail} label="hello@koagency.me" href="mailto:hello@koagency.me" />
        <LinkBox Icon={Calculator} label="Калькулятор" href="/calculator" internal />
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        <LinkBox Icon={Briefcase} label="Услуги" href="/services" internal />
        <LinkBox Icon={TrendingUp} label="Кейсы" href="/#cases" internal />
        <LinkBox Icon={Building2} label="О компании" href="/about" internal />
      </div>
    </div>
  );
};

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)';
const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)';
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)';
const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)';

type Side = 'left' | 'right' | 'top' | 'bottom';

const ENTRANCE_KEYFRAMES: Record<Side, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<Side, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

interface LinkBoxProps {
  Icon: LucideIcon;
  href: string;
  label?: string;
  internal?: boolean;
}

const LinkBox = ({ Icon, href, label, internal }: LinkBoxProps) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>): Side => {
    const box = (e.target as HTMLElement).getBoundingClientRect();
    const sides = [
      { proximity: Math.abs(box.left - e.clientX), side: 'left' as Side },
      { proximity: Math.abs(box.right - e.clientX), side: 'right' as Side },
      { proximity: Math.abs(box.top - e.clientY), side: 'top' as Side },
      { proximity: Math.abs(box.bottom - e.clientY), side: 'bottom' as Side },
    ].sort((a, b) => a.proximity - b.proximity);
    return sides[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] });
  };

  return (
    <a
      href={href}
      target={internal ? undefined : '_blank'}
      rel={internal ? undefined : 'noopener noreferrer'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-24 w-full place-content-center bg-background text-foreground sm:h-28 md:h-32"
    >
      <Content Icon={Icon} label={label} />
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-[#E60000] text-white"
      >
        <Content Icon={Icon} label={label} />
      </div>
    </a>
  );
};

function Content({ Icon, label }: { Icon: LucideIcon; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-2 text-center">
      <Icon className="h-6 w-6 md:h-7 md:w-7" />
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-wider sm:text-xs">{label}</span>
      )}
    </div>
  );
}
