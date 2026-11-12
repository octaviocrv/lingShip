"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, MessagesSquare, Search, SearchX } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { publishedConversations, series, situationLabel, situations, type SituationId } from "../content/catalog";
import { situationPrompts, student } from "../content/student";
import { ConversationCard } from "../components/conversation-card";
import { Card, PageHeader } from "../components/ui";

/** Tira acentos e caixa para a busca casar "voce" com "você". */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[“”"?.,]/g, "");

const STOP = new Set(["como", "o", "a", "os", "as", "de", "do", "da", "e", "em", "um", "uma", "eu", "meu", "minha", "que", "no", "na", "sem", "para", "pra"]);

export function Catalog({ initialQuery = "", initialSituation }: { initialQuery?: string; initialSituation?: SituationId }) {
  const [query, setQuery] = useState(initialQuery);
  const [situation, setSituation] = useState<SituationId | "todas">(initialSituation ?? "todas");
  const [freeOnly, setFreeOnly] = useState(false);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  const results = useMemo(() => {
    const terms = normalize(query)
      .split(/\s+/)
      .filter((t) => t && !STOP.has(t));
    return publishedConversations.filter((c) => {
      if (situation !== "todas" && !c.situations.includes(situation)) return false;
      if (freeOnly && c.access.kind !== "gratuito") return false;
      if (activeSeries && c.series !== activeSeries) return false;
      if (!terms.length) return true;
      const hay = normalize(`${c.question} ${c.hook}`);
      return terms.some((t) => hay.includes(t));
    });
  }, [query, situation, freeOnly, activeSeries]);

  const chips: { id: SituationId | "todas"; label: string }[] = [{ id: "todas", label: "Todas" }, ...situations];

  return (
    <>
      <PageHeader
        title="Conversas"
        description="Encontre a conversa pela situação que você está vivendo, com as suas palavras."
      />

      <Card className="mb-6">
        <label className="flex h-14 items-center gap-3 rounded-full border border-hairline bg-snow/70 px-5 transition focus-within:border-purple/40 focus-within:bg-card focus-within:shadow-[0_0_0_4px_rgb(109_63_192/0.1)]">
          <Search aria-hidden className="size-5 shrink-0 text-purple" />
          <span className="sr-only">Buscar conversa</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que acontece com você? Ex.: “travo quando vou falar do trabalho”"
            className="h-full min-w-0 flex-1 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-muted/80"
          />
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              aria-pressed={situation === chip.id}
              onClick={() => setSituation(chip.id)}
              className={cn(
                "h-9 cursor-pointer rounded-full px-4 text-[0.8rem] font-semibold transition-colors",
                situation === chip.id ? "bg-midnight text-snow" : "bg-canvas text-ink hover:bg-surface hover:text-purple",
              )}
            >
              {chip.label}
            </button>
          ))}
          <label className="ml-auto flex cursor-pointer items-center gap-2.5 text-[0.82rem] font-medium text-ink">
            <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} className="peer sr-only" />
            <span
              aria-hidden
              className="relative h-6 w-10 rounded-full bg-hairline transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-card after:shadow after:transition-transform peer-checked:bg-purple peer-checked:after:translate-x-4 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-purple"
            />
            Só gratuitas
          </label>
        </div>
      </Card>

      {/* Entrada pela situação (seção IV do documento de direção) */}
      {!query && situation === "todas" && !activeSeries && !freeOnly && (
        <section aria-labelledby="situacao-title" className="mb-8">
          <h2 id="situacao-title" className="mb-3 flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-midnight">
            <MessagesSquare aria-hidden className="size-4 text-purple" />
            O que acontece com você quando tenta usar inglês?
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {situationPrompts.map((p) => (
              <Link
                key={p.text}
                href={routes.platform.student.conversation(p.conversation)}
                className="group flex items-center justify-between gap-3 rounded-tile bg-card px-4 py-3.5 shadow-card transition hover:ring-2 hover:ring-purple/15"
              >
                <span>
                  <span className="block text-[0.9rem] font-semibold text-midnight">“{p.text}”</span>
                  <span className="mt-0.5 block text-[0.74rem] text-muted">{situationLabel(p.situation)}</span>
                </span>
                <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-purple" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Séries: perguntas que se conectam, sem impor currículo */}
      <section aria-labelledby="series-title" className="mb-8">
        <h2 id="series-title" className="mb-3 flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-midnight">
          <Layers aria-hidden className="size-4 text-purple" />
          Séries
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {series.map((s) => {
            const count = publishedConversations.filter((c) => c.series === s.slug).length;
            const active = activeSeries === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSeries(active ? null : s.slug)}
                className={cn(
                  "group flex cursor-pointer items-center gap-3.5 rounded-box bg-card p-3 text-left shadow-card ring-2 transition",
                  active ? "ring-purple" : "ring-transparent hover:ring-purple/20",
                )}
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-tile">
                  <Image src={s.cover} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[0.98rem] font-semibold leading-snug text-midnight">{s.title}</span>
                  <span className="mt-0.5 block text-[0.76rem] text-muted">{count} {count === 1 ? "conversa" : "conversas"}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-sans text-[0.95rem] font-semibold text-midnight">
          {query ? "Resultados" : "Todas as conversas"}
          <span className="ml-2 font-normal text-muted">{results.length}</span>
        </h2>
      </div>

      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {results.map((c) => (
            <ConversationCard key={c.slug} conversation={c} saved={student.saved.includes(c.slug)} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center py-14 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-surface text-purple">
            <SearchX aria-hidden className="size-6" />
          </span>
          <p className="mt-5 font-serif text-[1.25rem] font-semibold text-midnight">Ainda não temos uma conversa sobre isso.</p>
          <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-muted">
            Sua busca fica registrada para a Vanessa. As perguntas mais procuradas viram as próximas conversas.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSituation("todas");
              setFreeOnly(false);
              setActiveSeries(null);
            }}
            className="mt-6 cursor-pointer text-[0.86rem] font-semibold text-purple hover:underline"
          >
            Ver todas as conversas
          </button>
        </Card>
      )}
    </>
  );
}
