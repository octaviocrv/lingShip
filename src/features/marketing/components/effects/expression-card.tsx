"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";
import { lofi } from "@/lib/lofi";

export type Expression = { phrase: string; phonetic: string; meaning: string; example: string };

/**
 * Ficha de vocabulário (hero do celular): uma expressão em inglês numa ficha pautada de
 * caderno, com fita adesiva no topo. Tocar vira a ficha e mostra o significado e um exemplo;
 * "Outra expressão" troca a ficha. É uma mini aula logo na primeira tela, no lugar das
 * pílulas genéricas de benefícios.
 */
export function ExpressionCard({ items, label }: { items: Expression[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const item = items[index];

  const next = () => {
    lofi.paper();
    setFlipped(false);
    setIndex((i) => (i + 1) % items.length);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          lofi.paper();
          setFlipped((v) => !v);
        }}
        data-own-sound
        aria-pressed={flipped}
        aria-label={flipped ? `${item.phrase}: ${item.meaning}` : `${item.phrase}. Toque para ver o significado`}
        className="relative block h-[10.5rem] w-full cursor-pointer -rotate-[1.2deg] text-left [perspective:1200px]"
      >
        {/* fita adesiva */}
        <span
          aria-hidden
          className="absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[3deg] rounded-[2px] bg-orange/25 backdrop-blur-[2px]"
        />
        <span
          className={cn(
            "relative block size-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* frente: a expressão */}
          <span className="index-card absolute inset-0 flex flex-col justify-between rounded-2xl p-5 pl-12 shadow-soft [backface-visibility:hidden]">
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-orange-deep">{label}</span>
            <span>
              <span className="block font-serif text-[1.65rem] font-semibold leading-tight text-midnight">
                {item.phrase}
              </span>
              <span className="mt-1 block font-serif text-[0.9rem] italic text-purple">{item.phonetic}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[0.66rem] font-semibold text-muted">
              <RefreshCw className="size-3" aria-hidden />
              Toque para virar a ficha
            </span>
          </span>

          {/* verso: significado e exemplo */}
          <span className="index-card absolute inset-0 flex flex-col justify-center rounded-2xl p-5 pl-12 shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-purple">Significado</span>
            <span className="mt-2 block text-[0.92rem] font-semibold leading-snug text-midnight">{item.meaning}</span>
            <span className="mt-2 block font-serif text-[0.86rem] italic leading-snug text-muted">“{item.example}”</span>
          </span>
        </span>
      </button>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={next}
          data-own-sound
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-[0.72rem] font-semibold text-purple transition-colors active:text-purple-deep"
        >
          Outra expressão
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
