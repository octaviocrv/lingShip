"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Person = { src: string };

/**
 * Grupo que se monta com a rolagem: cada pessoa é uma imagem própria (mesmo tamanho, já alinhadas
 * na composição final) e entra num momento da rolagem, de uma direção (esquerda, de baixo, direita). Ao fim
 * as três camadas se encaixam e formam a foto original. Sem JS, ou com "reduzir movimento",
 * o grupo aparece já montado.
 *
 * O progresso (0 a 1) é calculado pela posição do bloco na janela e vira variáveis CSS
 * (--p1, --p2, --p3 por pessoa e --pj para o "tudo se junta"), então o React não re-renderiza.
 */
export function PeopleAssemble({
  people,
  alt,
  width,
  height,
}: {
  people: [Person, Person, Person];
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    // curva suave nas duas pontas (sem arranque nem parada secos)
    const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

    const set = (p1: number, p2: number, p3: number, pj: number) => {
      el.style.setProperty("--p1", p1.toFixed(4));
      el.style.setProperty("--p2", p2.toFixed(4));
      el.style.setProperty("--p3", p3.toFixed(4));
      el.style.setProperty("--pj", pj.toFixed(4));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1, 1, 1, 1);
      return;
    }

    // `target` segue a rolagem; `current` vai atrás dele com inércia, então o movimento
    // desliza em vez de acompanhar cada pixel da rolagem.
    let target = 0;
    let current = 0;
    let raf = 0;

    const readTarget = () => {
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // começa com o topo do bloco entrando pela base da janela; termina quando ele sobe a ~15% do topo
      target = clamp((vh * 0.95 - top) / (vh * 0.8));
    };

    const frame = () => {
      current += (target - current) * 0.07;
      if (Math.abs(target - current) < 0.0005) current = target;
      const p = current;
      // cada pessoa tem sua janela de entrada, com bastante sobreposição: uma começa antes da outra terminar
      set(
        ease(clamp(p / 0.7)),
        ease(clamp((p - 0.15) / 0.7)),
        ease(clamp((p - 0.3) / 0.7)),
        ease(clamp((p - 0.55) / 0.45)),
      );
      raf = current === target ? 0 : requestAnimationFrame(frame);
    };

    const onScroll = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    readTarget();
    current = target;
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // de onde cada pessoa vem: sempre de baixo, com uma leve inclinação lateral [x%, y%]
  const from: [number, number][] = [
    [-8, 15],
    [2, 19],
    [8, 15],
  ];

  return (
    <div ref={ref} className="people-assemble relative mx-auto w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* halo: cresce junto com o grupo */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[4%] bottom-0 top-[12%] rounded-[50%] bg-[radial-gradient(closest-side,var(--color-blush),var(--color-lilac)_62%,transparent)]"
        style={{
          opacity: "calc(0.25 + 0.65 * var(--pj))",
          transform: "scale(calc(0.86 + 0.14 * var(--pj)))",
        }}
      />
      {/* "tudo se junta": o grupo inteiro assenta com um leve zoom no fim */}
      <div className="absolute inset-0" style={{ transform: "scale(calc(1.02 - 0.02 * var(--pj)))", transformOrigin: "50% 100%" }}>
        {people.map((person, i) => {
          const v = `var(--p${i + 1})`;
          return (
            <div
              key={person.src}
              className="absolute inset-0 will-change-transform"
              style={{
                // o menino (centro) fica atrás das duas meninas, como na composição
                zIndex: i === 1 ? 0 : 1,
                transform: `translate3d(calc((1 - ${v}) * ${from[i][0]}%), calc((1 - ${v}) * ${from[i][1]}%), 0)`,
                opacity: `${v}`, // fade-in leve, acompanhando a subida
              }}
            >
              <Image
                src={person.src}
                alt={i === 0 ? alt : ""}
                aria-hidden={i === 0 ? undefined : true}
                fill
                // arquivo já otimizado (2200px, WebP q94): serve como está, sem o Next recomprimir
                unoptimized
                sizes="(min-width: 1024px) 736px, 100vw"
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
