"use client";

import { useState } from "react";
import { Container, IconBadge, SectionHeading } from "@/components/ui/primitives";
import { categorias, desafios, desafiosSection } from "@/content/desafios";
import { cn } from "@/lib/cn";

type Filtro = (typeof categorias)[number];

/** "O que exercitar": filtro por categoria em pílulas + grade de cards. */
export function Desafios() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const visiveis = filtro === "Todos" ? desafios : desafios.filter((d) => d.category === filtro);

  return (
    <section id="desafios" className="bg-lilac/50 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={desafiosSection.eyebrow}
          title={desafiosSection.title}
          description={desafiosSection.description}
        />

        <div
          data-reveal
          role="tablist"
          aria-label="Filtrar por habilidade"
          className="no-scrollbar -mx-5 mt-10 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categorias.map((categoria) => {
            const ativo = filtro === categoria;
            return (
              <button
                key={categoria}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => setFiltro(categoria)}
                className={cn(
                  "h-10 shrink-0 cursor-pointer rounded-full px-5 text-[0.84rem] font-medium transition-all duration-300",
                  ativo ? "bg-purple-strong text-white shadow-soft" : "glass-flat text-ink/80 hover:text-purple",
                )}
              >
                {categoria}
              </button>
            );
          })}
        </div>

        {visiveis.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiveis.map((desafio) => (
              <li key={desafio.title} className="glass flex flex-col rounded-card p-7">
                <IconBadge icon={desafio.icon} />
                <h3 className="mt-5 text-[1.15rem] font-medium leading-snug">{desafio.title}</h3>
                <p className="mt-3 flex-1 text-[0.86rem] leading-[1.8] text-muted">{desafio.description}</p>
                <p className="mt-5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-purple">
                  {desafio.category}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="glass mt-8 rounded-card p-8 text-center text-[0.92rem] text-muted">{desafiosSection.empty}</p>
        )}
      </Container>
    </section>
  );
}
