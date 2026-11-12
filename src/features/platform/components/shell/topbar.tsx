import Link from "next/link";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "../ui";

/**
 * Barra superior: busca, avisos e perfil. A busca é um formulário GET de verdade: leva
 * para o catálogo (aluno) ou para o acervo (professora) com `?q=`.
 */
export function Topbar({
  homeHref,
  searchAction,
  searchPlaceholder,
  user,
  hasNotifications = true,
}: {
  homeHref: string;
  searchAction: string;
  searchPlaceholder: string;
  user: { name: string; role: string; initials?: string; photo?: string };
  hasNotifications?: boolean;
}) {
  return (
    <header className="flex h-[76px] items-center gap-4 lg:h-[88px] lg:gap-6">
      <Link href={homeHref} className="rounded-xl lg:hidden">
        <Logo />
      </Link>

      <form action={searchAction} role="search" className="hidden min-w-0 max-w-[460px] flex-1 md:block">
        <label className="flex h-12 items-center gap-3 rounded-full bg-card px-5 shadow-card ring-1 ring-transparent transition focus-within:ring-purple/30">
          <Search aria-hidden className="size-[18px] shrink-0 text-muted" />
          <span className="sr-only">Buscar</span>
          <input
            name="q"
            type="search"
            placeholder={searchPlaceholder}
            className="h-full min-w-0 flex-1 bg-transparent text-[0.88rem] text-ink outline-none placeholder:text-muted/80"
          />
          <kbd className="hidden rounded-md bg-canvas px-1.5 py-0.5 text-[0.68rem] font-medium text-muted xl:block">Enter</kbd>
        </label>
      </form>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label={hasNotifications ? "Avisos (há novidades)" : "Avisos"}
          className="relative grid size-11 cursor-pointer place-items-center rounded-full bg-card text-midnight shadow-card transition hover:text-purple"
        >
          <Bell aria-hidden className="size-[19px]" strokeWidth={1.9} />
          {hasNotifications && <span aria-hidden className="absolute right-3 top-2.5 size-2 rounded-full bg-orange ring-2 ring-card" />}
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-3 rounded-full py-1 pl-1 pr-2 transition hover:bg-card sm:pr-3"
        >
          <Avatar src={user.photo} initials={user.initials} alt={user.photo ? user.name : undefined} />
          <span className="hidden text-left sm:block">
            <span className="block text-[0.88rem] font-semibold leading-tight text-midnight">{user.name}</span>
            <span className="block text-[0.74rem] leading-tight text-muted">{user.role}</span>
          </span>
          <ChevronDown aria-hidden className="hidden size-4 text-muted sm:block" />
        </button>
      </div>
    </header>
  );
}
