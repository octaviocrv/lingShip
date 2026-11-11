"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Phase = "final" | "armed" | "go" | "done";

const LINE = 1.12; // altura de cada dígito do rolo, em em

/**
 * Uma métrica com animação de odômetro: cada dígito é um rolo (0 a 9 repetido) que gira até o
 * valor, o da esquerda com menos voltas e o da direita com mais, parando em cascata. Depois o
 * sinal (+, %) salta para o lugar com um pequeno quique, o fio laranja se desenha e o rótulo sobe.
 *
 * Estilo do projeto: número em Lora (a serifada dos títulos), grafite como os títulos, sinal em
 * laranja (como as aspas da logo) e rótulo como os subtítulos (Montserrat, caixa alta, roxo).
 *
 * No celular (abaixo de 1024px) a animação é mais curta e, ao terminar, o número vira texto
 * comum: os rolos têm a largura do maior dígito e deixam o número espaçado demais.
 *
 * Sem JS ou com "reduzir movimento" mostra tudo já no valor final.
 */
export function MetricItem({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("final");
  const [k, setK] = useState(1); // fator de tempo: 1 no desktop, menor no celular

  const digits = String(value).split("").map(Number);
  // quando o último rolo termina (ms), para marcar a entrada do sinal, do fio e do rótulo
  const settleBase = delay + 1100 + digits.length * 450;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const factor = window.matchMedia("(max-width: 1023px)").matches ? 0.55 : 1;
    setK(factor);
    setPhase("armed");
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase("go");
        timer = window.setTimeout(() => setPhase("done"), (settleBase + 400) * factor);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [settleBase]);

  const armed = phase === "armed";
  const go = phase === "go" || phase === "done";
  const settle = settleBase * k;
  // no celular, fora da animação, mostra o número como texto (kerning natural da Lora)
  const staticOnMobile = phase === "final" || phase === "done";

  return (
    <div ref={ref} className="group flex flex-col-reverse items-center px-4 text-center">
      {/* rótulo: estilo dos subtítulos do projeto */}
      <dt
        className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-purple"
        style={{
          opacity: armed ? 0 : 1,
          transform: armed ? "translateY(10px)" : "none",
          transition: go
            ? `opacity .9s ease ${settle - 500 * k}ms, transform .9s cubic-bezier(.22,1,.36,1) ${settle - 500 * k}ms`
            : "none",
        }}
      >
        {label}
      </dt>

      {/* fio laranja que se desenha sob o número e cresce no hover */}
      <span
        aria-hidden
        className="mt-3 block h-[3px] w-10 rounded-full bg-orange transition-[width] duration-500 ease-out group-hover:w-16"
        style={{
          transform: armed ? "scaleX(0)" : "scaleX(1)",
          transition: go ? `transform .8s cubic-bezier(.22,1,.36,1) ${settle - 700 * k}ms, width .5s ease-out` : undefined,
        }}
      />

      <dd
        className="m-0 flex items-baseline justify-center font-serif text-[clamp(2.8rem,1.9rem+2.6vw,4.4rem)] font-semibold leading-none text-midnight transition-transform duration-500 ease-out group-hover:-translate-y-1 max-lg:font-medium max-lg:tracking-[-0.015em]"
        aria-label={`${value}${suffix}`}
      >
        {/* número como texto: só no celular, antes e depois da animação */}
        <span aria-hidden className={cn(staticOnMobile ? "lg:hidden" : "hidden")}>
          {value}
        </span>

        <span
          aria-hidden
          className={cn(
            "inline-flex h-[1.12em] overflow-hidden leading-[1.12] tabular-nums",
            staticOnMobile && "max-lg:hidden",
          )}
        >
          {digits.map((d, i) => {
            const cycles = i + 1; // quem está mais à direita dá mais voltas
            const target = cycles * 10 + d;
            return (
              <span key={i} className="block h-[1.12em] overflow-hidden">
                <span
                  className="flex flex-col"
                  style={{
                    transform: `translateY(${armed ? 0 : -target * LINE}em)`,
                    transition: go
                      ? `transform ${(1.5 + i * 0.45) * k}s cubic-bezier(.22,1,.36,1) ${(delay + i * 150) * k}ms`
                      : "none",
                  }}
                >
                  {Array.from({ length: (cycles + 1) * 10 }, (_, n) => (
                    <span key={n} className="block h-[1.12em]">
                      {n % 10}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </span>

        {suffix && (
          <span
            aria-hidden
            className="ml-[0.05em] inline-block origin-center text-orange"
            style={{
              opacity: armed ? 0 : 1,
              transform: armed ? "scale(0.2) rotate(-100deg)" : "scale(1) rotate(0deg)",
              transition: go
                ? `transform ${k}s cubic-bezier(.34,1.56,.64,1) ${settle - 900 * k}ms, opacity .4s ease ${settle - 900 * k}ms`
                : "none",
            }}
          >
            {suffix}
          </span>
        )}
      </dd>
    </div>
  );
}
