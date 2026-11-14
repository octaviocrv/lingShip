"use client";

import { useState } from "react";
import { BookOpenText, ExternalLink, FileText, FolderOpen, Link2 } from "lucide-react";
import { studentMaterials, type MaterialKind } from "../content/learning-items";
import { cn } from "@/lib/cn";
import { Card, IconTile, PageHeader, Pill } from "../components/ui";

const filters = ["Todos", "Da sua aula", "Biblioteca"] as const;

const materialIcon: Record<MaterialKind, typeof FileText> = {
  arquivo: FileText,
  leitura: BookOpenText,
  link: Link2,
};

/** Biblioteca de consulta. Materiais não têm entrega ou prazo: exercícios ficam em outra área. */
export function Materials() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const visible = filter === "Todos" ? studentMaterials : studentMaterials.filter((material) => material.category === filter);

  return (
    <>
      <PageHeader eyebrow="Dados de demonstração" title="Materiais" description="Arquivos, leituras e indicações para você consultar quando precisar." />

      <div role="tablist" aria-label="Filtrar materiais" className="mb-7 inline-flex rounded-full bg-card p-1 shadow-card">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={cn("h-10 cursor-pointer rounded-full px-5 text-[0.84rem] font-semibold transition-colors", filter === item ? "bg-midnight text-snow" : "text-ink hover:text-purple")}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((material) => {
          const Icon = materialIcon[material.kind];
          return (
            <Card key={material.id} as="article" className="flex min-h-64 flex-col">
              <div className="flex items-start justify-between gap-3">
                <IconTile icon={Icon} tone={material.category === "Da sua aula" ? "orange" : "purple"} />
                <Pill>{material.category}</Pill>
              </div>
              <h2 className="mt-5 font-serif text-[1.25rem] font-semibold leading-snug text-midnight">{material.title}</h2>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">{material.description}</p>
              <div className="mt-auto border-t border-hairline pt-4">
                <p className="text-[0.76rem] font-semibold text-midnight">{material.format}</p>
                <p className="mt-1 text-[0.74rem] text-muted">{material.source} · {material.addedAt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-purple"><ExternalLink aria-hidden className="size-3.5" />Abrir material</span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 flex gap-4 border border-dashed border-purple/25 bg-surface/50">
        <IconTile icon={FolderOpen} tone="purple" />
        <p className="text-[0.84rem] leading-relaxed text-muted">Materiais servem para consultar e guardar. Quando algo exigir uma resposta ou entrega sua, ele aparece em <strong className="font-semibold text-midnight">Exercícios</strong>.</p>
      </Card>
    </>
  );
}
