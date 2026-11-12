import type { ReactNode } from "react";
import { MobileNav, Sidebar, type PlatformArea } from "./sidebar";
import { Topbar } from "./topbar";

/**
 * Moldura das áreas logadas (aluno e professora): barra lateral à esquerda, barra superior
 * com busca e perfil, e o conteúdo num fundo `canvas` com bastante respiro.
 */
export function PlatformShell({
  area,
  homeHref,
  sidebarFooter,
  searchAction,
  searchPlaceholder,
  user,
  children,
}: {
  area: PlatformArea;
  homeHref: string;
  sidebarFooter?: ReactNode;
  searchAction: string;
  searchPlaceholder: string;
  user: { name: string; role: string; initials?: string; photo?: string };
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100svh-var(--demo-bar-h,0px))] bg-canvas">
      <Sidebar homeHref={homeHref} area={area} footer={sidebarFooter} />
      <div className="min-w-0 flex-1 px-4 pb-16 sm:px-6 lg:px-10 2xl:px-14">
        <div className="mx-auto max-w-[1360px]">
          <Topbar homeHref={homeHref} searchAction={searchAction} searchPlaceholder={searchPlaceholder} user={user} />
          <MobileNav area={area} />
          <main className="pt-2 lg:pt-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
