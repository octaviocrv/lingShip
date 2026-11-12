"use client";

import { useEffect, useState } from "react";
import { ArrowRight, LogIn } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LinkButton } from "@/components/ui/primitives";
import { mobileNavigation, navigation, studentAccess } from "@/features/marketing/config/navigation";
import { cn } from "@/lib/cn";

/**
 * Cabeçalho fixo, como no modelo do hero: logo à esquerda, menu no centro e, à direita,
 * o botão branco "Fale comigo" e o laranja "Quero assinar". Marca a seção visível no menu.
 *
 * Acesso de alunos ("Já é aluno? Acessar plataforma"): no desktop, numa faixa fina acima da
 * linha principal (que não tem espaço sobrando), visível no topo da página e recolhida ao
 * rolar; no celular, dentro do menu.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // trava a rolagem com o menu mobile aberto
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500",
          // no topo fica transparente sobre o bloco lilás do hero; ao rolar, vira vidro creme
          scrolled || open
            ? "border-line bg-snow/85 shadow-[0_12px_40px_-24px_rgb(43_33_64/0.35)] backdrop-blur-md"
            : "border-transparent bg-transparent",
          // no celular: barra de ponta a ponta em vidro creme, base arredondada e sombra suave (sem linha dura)
          "max-lg:rounded-b-[1.75rem] max-lg:border-transparent max-lg:bg-snow/80 max-lg:shadow-[0_16px_36px_-22px_rgb(43_33_64/0.45)] max-lg:backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "hidden overflow-hidden transition-[height,opacity] duration-500 ease-out lg:block",
            scrolled || open ? "h-0 opacity-0" : "h-9 opacity-100",
          )}
          inert={scrolled || open}
        >
          <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-end gap-2 border-b border-line/70 px-10 text-[0.74rem] 2xl:px-12">
            <span className="text-ink/70">{studentAccess.question}</span>
            <a
              href={studentAccess.href}
              className="group inline-flex items-center gap-1.5 font-semibold text-purple transition-colors hover:text-purple-deep"
            >
              {studentAccess.label}
              <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-6 sm:px-8 lg:h-[84px] lg:gap-8 lg:px-10 2xl:px-12">
          <a href="#inicio" aria-label="Lingship, voltar ao início" onClick={() => setOpen(false)} className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden min-w-0 lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition-colors xl:px-3.5 xl:text-[0.84rem]",
                      active === item.href ? "bg-surface text-purple" : "text-ink/80 hover:text-purple",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* o "esconder" fica num invólucro: na mesma tag, hidden e inline-flex brigavam e o botão aparecia no celular */}
            <span className="hidden xl:block">
              <LinkButton href="#contato" variant="light" size="sm" className="shadow-[0_10px_30px_rgb(43_33_64/0.12)]">
                Fale comigo
              </LinkButton>
            </span>
            <span className="hidden lg:block">
              <LinkButton href="#planos" size="sm">
                Quero assinar
              </LinkButton>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className={cn(
                "grid size-11 place-items-center rounded-full transition-colors duration-300 lg:hidden",
                open ? "bg-midnight text-white" : "bg-white text-midnight shadow-[0_8px_22px_rgb(43_33_64/0.14)] ring-1 ring-line",
              )}
            >
              {/* hambúrguer em SVG: 3 traços que viram X */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path
                  d="M4 6.5h16"
                  className={cn(
                    "origin-center transition-[translate,rotate] duration-300 ease-out [transform-box:fill-box]",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <path
                  d="M4 12h16"
                  className={cn(
                    "origin-center transition-[scale,opacity] duration-200 [transform-box:fill-box]",
                    open && "scale-x-0 opacity-0",
                  )}
                />
                <path
                  d="M4 17.5h16"
                  className={cn(
                    "origin-center transition-[translate,rotate] duration-300 ease-out [transform-box:fill-box]",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* menu mobile: fora do <header>, porque o backdrop-blur prenderia o "fixed" dentro dele */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-snow bg-aura transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Menu" className="flex min-h-full flex-col justify-between gap-8 px-6 pb-10 pt-6">
          <ul>
            {mobileNavigation.map((item, i) => (
              <li
                key={item.href + item.label}
                className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-3.5 font-serif text-xl text-ink"
                >
                  {item.label}
                  <span aria-hidden className="font-sans text-xs font-semibold text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <LinkButton href="#planos" size="lg" onClick={() => setOpen(false)}>
              Quero assinar
            </LinkButton>
            <a
              href={studentAccess.href}
              className="flex items-center justify-center gap-2 rounded-full py-2 text-[0.88rem] text-ink/75"
            >
              <LogIn aria-hidden className="size-4 text-purple" />
              {studentAccess.question} <span className="font-semibold text-purple">{studentAccess.label}</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
