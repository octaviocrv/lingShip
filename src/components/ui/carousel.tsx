"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { lofi } from "@/lib/lofi";

/**
 * Carrossel só para o celular (abaixo de 640px): desliza com o dedo e para cada cartão no
 * centro (scroll-snap). O cartão do centro fica em destaque e os vizinhos ficam menores e mais
 * apagados, aparecendo na borda para convidar a deslizar. Embaixo: pontos (o ativo vira uma
 * pílula laranja), contador e setas. Do tablet em diante (sm+) nada disso aparece: o layout é
 * o do desktop, definido pela seção em `trackClassName` (grade com GRID_LG, de carousel-grid.ts,
 * ou faixa horizontal). Numa faixa, `desktopArrows` mostra setas próprias do desktop, à direita,
 * que passam um cartão por vez e somem quando tudo cabe na tela.
 */
export function Carousel({
  children,
  label,
  className,
  trackClassName,
  slideClassName,
  reveal = "group",
  desktopArrows = false,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  trackClassName?: string;
  /** classes do slide do tablet em diante; sem isso o slide ocupa a coluna da grade (sm:w-auto) */
  slideClassName?: string;
  /** "group": cartões entram em cascata; "block": a faixa entra inteira; "none": sem animação */
  reveal?: "group" | "block" | "none";
  /** setas no tablet/desktop para faixas que deslizam (não usar com GRID_LG) */
  desktopArrows?: boolean;
}) {
  const items = Children.toArray(children);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  // bordas da faixa, para as setas do desktop
  const [edge, setEdge] = useState({ start: true, end: true });
  const n = items.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    let last = -1; // para tocar o "tic" só quando o cartão do centro muda
    // ativo = o cartão cujo centro está mais perto do centro do trilho
    const update = () => {
      raf = 0;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const c = child as HTMLElement;
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      if (last !== -1 && best !== last) lofi.click();
      last = best;
      setActive(best);
      const start = el.scrollLeft <= 4;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const child = el?.children[Math.max(0, Math.min(n - 1, i))] as HTMLElement | undefined;
    if (!el || !child) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // desktop: anda um cartão (largura do cartão + espaço entre eles)
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const revealAttr =
    reveal === "group" ? { "data-reveal-group": "" } : reveal === "block" ? { "data-reveal": "" } : {};
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <div className={className}>
      <ul
        ref={track}
        aria-label={label}
        {...revealAttr}
        className={cn(
          "no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain max-sm:-mx-5 max-sm:gap-4 max-sm:px-5 max-sm:pb-3 max-sm:pt-1",
          trackClassName,
        )}
      >
        {items.map((item, i) => (
          <li
            key={i}
            data-active={i === active ? "" : undefined}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${n}`}
            className={cn(
              "group/slide flex w-[84%] shrink-0 snap-center",
              // na grade (tablet e desktop) a largura vem da coluna; uma seção pode trocar isso
              slideClassName ?? "sm:w-auto",
            )}
          >
            {/* destaque do cartão central só no celular */}
            <div className="w-full transition-[scale,opacity] duration-500 ease-out max-sm:scale-[0.93] max-sm:opacity-55 max-sm:group-data-[active]/slide:scale-100 max-sm:group-data-[active]/slide:opacity-100">
              {item}
            </div>
          </li>
        ))}
      </ul>

      {n > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4 sm:hidden">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para o item ${i + 1} de ${n}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all duration-500 ease-out",
                  i === active ? "w-7 bg-orange" : "w-2 bg-midnight/20 hover:bg-midnight/35",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="mr-1 text-[0.68rem] font-bold tracking-[0.2em] text-muted tabular-nums" aria-hidden>
              {pad(active + 1)} / {pad(n)}
            </span>
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Anterior"
              className="glass grid size-11 cursor-pointer place-items-center rounded-full text-midnight transition-all duration-300 active:scale-90 disabled:cursor-default disabled:opacity-35"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === n - 1}
              aria-label="Próximo"
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-midnight text-white shadow-soft transition-all duration-300 active:scale-90 disabled:cursor-default disabled:opacity-35"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {desktopArrows && !(edge.start && edge.end) && (
        <div className="mt-6 hidden items-center justify-end gap-2.5 sm:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edge.start}
            aria-label="Anterior"
            className="glass grid size-11 cursor-pointer place-items-center rounded-full text-midnight transition-all duration-300 active:scale-90 disabled:cursor-default disabled:opacity-35"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edge.end}
            aria-label="Próximo"
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-midnight text-white shadow-soft transition-all duration-300 active:scale-90 disabled:cursor-default disabled:opacity-35"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
