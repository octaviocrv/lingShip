"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Presentation, UserRound } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";

/*
 * SÓ PARA A APRESENTAÇÃO. Faixa fixa no topo com o seletor "Aluno | Professora" e o aviso
 * de protótipo. Para remover: apagar a pasta `features/demo/` e a linha <DemoBar /> em
 * `app/(platform)/plataforma/layout.tsx`. Nada mais depende dela: a altura da faixa vem da
 * variável --demo-bar-h, que some junto (a plataforma usa 0px quando ela não existe).
 */

const s = routes.platform.student;
const t = routes.platform.teacher;

/**
 * Tela equivalente do outro lado, para a troca mostrar "o mesmo assunto visto pela outra
 * pessoa" (ex.: catálogo do aluno <-> acervo da professora). Sem par, vai para o início.
 */
const toTeacher: [string, string][] = [
  [s.conversations, t.contents],
  [s.courses, t.courses],
  [s.purchases, t.students],
  [s.mentoring, t.mentoring],
];

function counterpart(pathname: string, target: "aluno" | "professora") {
  const pairs = target === "professora" ? toTeacher : toTeacher.map(([a, b]) => [b, a] as [string, string]);
  const match = pairs.find(([from]) => pathname === from || pathname.startsWith(`${from}/`));
  if (match) return match[1];
  return target === "professora" ? t.home : s.home;
}

const views = [
  { id: "aluno" as const, label: "Aluno", icon: UserRound },
  { id: "professora" as const, label: "Professora", icon: GraduationCap },
];

export function DemoBar() {
  const pathname = usePathname();
  const current = pathname.startsWith(t.home) ? "professora" : "aluno";

  return (
    <>
      <style>{`:root{--demo-bar-h:3.25rem}`}</style>
      <div className="sticky top-0 z-50 flex h-[var(--demo-bar-h)] items-center gap-4 bg-midnight px-4 text-snow sm:px-6">
        <p className="flex min-w-0 flex-1 items-center gap-2 text-[0.74rem] text-snow/70">
          <Presentation aria-hidden className="size-4 shrink-0 text-orange" />
          <span className="truncate">
            <span className="font-semibold text-snow">Protótipo</span>
            <span className="hidden sm:inline"> · conteúdo e números ilustrativos</span>
          </span>
        </p>

        <nav aria-label="Visão da demonstração" className="flex rounded-full bg-white/10 p-1">
          {views.map((v) => {
            const active = current === v.id;
            const Icon = v.icon;
            return (
              <Link
                key={v.id}
                href={active ? pathname : counterpart(pathname, v.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[0.78rem] font-semibold transition-colors sm:px-4",
                  active ? "bg-snow text-midnight shadow-sm" : "text-snow/75 hover:text-snow",
                )}
              >
                <Icon aria-hidden className="size-3.5" />
                {v.label}
              </Link>
            );
          })}
        </nav>

        <span className="hidden flex-1 justify-end text-[0.74rem] text-snow/50 md:flex">Visão de demonstração</span>
      </div>
    </>
  );
}
