'use client';

/**
 * Шим для совместимости с react-router-dom API.
 * Под капотом использует Next.js App Router.
 *
 * После миграции замени `react-router-dom` → `@/lib/router-shim` во всех импортах.
 * Скрипт: см. docs/MIGRATION_NOTES.md
 */

import NextLink from 'next/link';
import { useRouter, usePathname, useSearchParams, useParams as nextUseParams } from 'next/navigation';
import { ComponentProps, forwardRef, useMemo } from 'react';

// useLocation()
export function useLocation() {
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const search = searchParams?.toString();
  return {
    pathname,
    search: search ? `?${search}` : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
    state: null,
    key: 'default',
  };
}

// useNavigate()
export function useNavigate() {
  const router = useRouter();
  return useMemo(() => {
    const fn = (to: string | number, opts?: { replace?: boolean }) => {
      if (typeof to === 'number') {
        if (to < 0) router.back();
        return;
      }
      if (opts?.replace) router.replace(to);
      else router.push(to);
    };
    return fn;
  }, [router]);
}

// useParams()
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const params = nextUseParams();
  return (params ?? {}) as T;
}

// useSearchParams() — экспортируем нативный Next-вариант под именем react-router
export { useSearchParams };

// <Link> — на next/link, но принимает `to` как у react-router
type RouterLinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to: string;
  replace?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  { to, replace, ...rest },
  ref
) {
  return <NextLink ref={ref} href={to} replace={replace} {...rest} />;
});

// <NavLink> — упрощённая совместимость
type NavLinkProps = RouterLinkProps & {
  className?: string | ((args: { isActive: boolean }) => string);
  end?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, end, className, ...rest },
  ref
) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname?.startsWith(to);
  const resolvedClassName =
    typeof className === 'function' ? className({ isActive: !!isActive }) : className;
  return <NextLink ref={ref} href={to} className={resolvedClassName} {...rest} />;
});

// Stubs: эти ничего не делают в Next-окружении, но не дают компонентам сломаться
export function BrowserRouter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export function Routes({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export function Route() {
  return null;
}
export function Outlet({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
