"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/cn";
import {
  studentNav,
  studentNavSecondary,
  teacherNav,
  teacherNavSecondary,
  type NavItem,
} from "../../content/navigation";

export type PlatformArea = "student" | "teacher";

/**
 * Os menus são escolhidos aqui (componente do navegador) pela área, em vez de chegarem
 * prontos do layout: os ícones são funções e não podem atravessar do servidor para cá.
 */
const menus: Record<PlatformArea, { nav: NavItem[]; secondary: NavItem[] }> = {
  student: { nav: studentNav, secondary: studentNavSecondary },
  teacher: { nav: teacherNav, secondary: teacherNavSecondary },
};

const isActive = (pathname: string, item: NavItem) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

/** Barra lateral enxuta (desktop). No celular vira a faixa de abas de `MobileNav`. */
export function Sidebar({ homeHref, area, footer }: { homeHref: string; area: PlatformArea; footer?: ReactNode }) {
  const pathname = usePathname();
  const { nav, secondary } = menus[area];
  return (
    <aside className="sticky top-[var(--demo-bar-h,0px)] hidden h-[calc(100svh-var(--demo-bar-h,0px))] w-[264px] shrink-0 flex-col border-r border-hairline bg-card px-5 pb-6 pt-7 lg:flex">
      <Link href={homeHref} className="mb-9 inline-flex self-start rounded-xl px-2">
        <Logo />
      </Link>

      <nav aria-label="Menu principal" className="flex flex-col gap-1">
        {nav.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(pathname, item)} />
        ))}
      </nav>

      <div className="my-5 h-px bg-hairline" />

      <nav aria-label="Conta" className="flex flex-col gap-1">
        {secondary.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(pathname, item)} />
        ))}
      </nav>

      {footer && <div className="mt-auto pt-6">{footer}</div>}
    </aside>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex h-11 items-center gap-3 rounded-tile px-3.5 text-[0.9rem] font-medium transition-colors",
        active ? "bg-surface text-purple" : "text-ink hover:bg-canvas hover:text-midnight",
      )}
    >
      {active && <span aria-hidden className="absolute inset-y-2.5 left-0 w-[3px] rounded-full bg-purple" />}
      <Icon aria-hidden className={cn("size-[19px]", active ? "text-purple" : "text-muted group-hover:text-midnight")} strokeWidth={1.9} />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1.5 text-[0.68rem] font-bold text-midnight">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

/** Abas roláveis abaixo da barra superior, só em telas menores que 1024px. */
export function MobileNav({ area }: { area: PlatformArea }) {
  const pathname = usePathname();
  const nav = [...menus[area].nav, ...menus[area].secondary];
  return (
    <nav aria-label="Menu principal" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 lg:hidden">
      {nav.map((item) => {
        const active = isActive(pathname, item);
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[0.84rem] font-medium",
              active ? "bg-midnight text-snow" : "bg-card text-ink shadow-card",
            )}
          >
            <Icon aria-hidden className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
