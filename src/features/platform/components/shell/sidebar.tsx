"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/cn";
import {
  studentNav,
  studentNavLabels,
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
const menus: Record<PlatformArea, { nav: NavItem[]; secondary: NavItem[]; labels?: { nav: string; secondary: string } }> = {
  student: { nav: studentNav, secondary: studentNavSecondary, labels: studentNavLabels },
  teacher: { nav: teacherNav, secondary: teacherNavSecondary },
};

const isActive = (pathname: string, item: NavItem) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

/** Barra lateral enxuta (desktop). No celular vira a faixa de abas de `MobileNav`. */
export function Sidebar({ homeHref, area, footer }: { homeHref: string; area: PlatformArea; footer?: ReactNode }) {
  const pathname = usePathname();
  const { nav, secondary, labels } = menus[area];
  return (
    <aside className="sticky top-[var(--demo-bar-h,0px)] hidden h-[calc(100svh-var(--demo-bar-h,0px))] w-[264px] shrink-0 flex-col border-r border-hairline bg-card px-5 pb-6 pt-7 lg:flex">
      <Link href={homeHref} className="mb-9 inline-flex self-start rounded-xl px-2">
        <Logo />
      </Link>

      <nav aria-label="Menu principal" className="flex flex-col gap-1">
        {labels && <GroupLabel>{labels.nav}</GroupLabel>}
        {nav.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(pathname, item)} />
        ))}
      </nav>

      {labels ? <div className="mt-7" /> : <div className="my-5 h-px bg-hairline" />}

      <nav aria-label="Conta" className="flex flex-col gap-1">
        {labels && <GroupLabel>{labels.secondary}</GroupLabel>}
        {secondary.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(pathname, item)} />
        ))}
      </nav>

      {footer && <div className="mt-auto pt-6">{footer}</div>}
    </aside>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1.5 px-3.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted/80">{children}</p>;
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

/**
 * Navegação abaixo de 1024px. Aluno: barra de abas fixa embaixo (o padrão de app de estudo).
 * Professora: abas roláveis abaixo da barra superior.
 */
export function MobileNav({ area }: { area: PlatformArea }) {
  return area === "student" ? <StudentTabBar /> : <ScrollTabs area={area} />;
}

function ScrollTabs({ area }: { area: PlatformArea }) {
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

/** Barra de abas do aluno no celular e tablet: 4 destinos de estudo + "Conta". */
function StudentTabBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { nav, secondary } = menus.student;
  const accountActive = secondary.some((item) => isActive(pathname, item));

  // fecha a folha ao trocar de página
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Fechar" onClick={() => setOpen(false)} className="absolute inset-0 bg-midnight/30" />
          <div
            role="dialog"
            aria-label="Sua conta"
            className="absolute inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] rounded-box bg-card p-3 shadow-card-hover"
          >
            <div className="mb-1 flex items-center justify-between px-3 py-1">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-muted">Sua conta</p>
              <button type="button" aria-label="Fechar" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-full text-muted hover:bg-canvas">
                <X aria-hidden className="size-4" />
              </button>
            </div>
            {secondary.map((item) => (
              <NavLink key={item.label} item={item} active={isActive(pathname, item)} />
            ))}
          </div>
        </div>
      )}

      <nav
        aria-label="Menu principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <ul className="mx-auto grid h-[4.25rem] max-w-xl grid-cols-5">
          {nav.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("flex h-full flex-col items-center justify-center gap-1 text-[0.66rem] font-semibold", active ? "text-purple" : "text-muted")}
                >
                  <span className={cn("grid h-7 w-12 place-items-center rounded-full transition-colors", active && "bg-surface")}>
                    <Icon aria-hidden className="size-[19px]" strokeWidth={1.9} />
                  </span>
                  {item.short ?? item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 text-[0.66rem] font-semibold",
                open || accountActive ? "text-purple" : "text-muted",
              )}
            >
              <span className={cn("grid h-7 w-12 place-items-center rounded-full transition-colors", (open || accountActive) && "bg-surface")}>
                <UserRound aria-hidden className="size-[19px]" strokeWidth={1.9} />
              </span>
              Conta
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
