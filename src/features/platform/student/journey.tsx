"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, History, Mic, Play } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { getConversation } from "../content/catalog";
import { journeyTimeline, productions, student } from "../content/student";
import { ConversationCard } from "../components/conversation-card";
import { Card, IconTile, PageHeader, Pill } from "../components/ui";

const tabs = [
  { id: "producoes", label: "Produções" },
  { id: "salvos", label: "Salvos" },
  { id: "historico", label: "Histórico" },
] as const;

/**
 * Meu percurso: o progresso mostrado como experiências e produções (seção II, "progressão
 * não linear"), não como porcentagem assistida.
 */
export function Journey() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("producoes");
  const saved = student.saved.map(getConversation).filter((c) => c !== undefined);

  return (
    <>
      <PageHeader
        title="Meu percurso"
        description="O que você produziu, salvou e viveu por aqui. Visível só para você."
      />

      <div role="tablist" aria-label="Seções do percurso" className="mb-6 inline-flex rounded-full bg-card p-1 shadow-card">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "h-10 cursor-pointer rounded-full px-5 text-[0.84rem] font-semibold transition-colors",
              tab === t.id ? "bg-midnight text-snow" : "text-ink hover:text-purple",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "producoes" && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productions.map((p) => {
            const conv = p.conversation ? getConversation(p.conversation) : undefined;
            return (
              <Card key={p.id} as="article" className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <IconTile icon={p.kind === "Áudio" ? Mic : FileText} tone={p.kind === "Áudio" ? "orange" : "purple"} />
                  <Pill>{p.date}</Pill>
                </div>
                <h3 className="mt-4 font-sans text-[1rem] font-semibold text-midnight">{p.title}</h3>
                <p className="mt-0.5 text-[0.78rem] text-muted">
                  {p.kind} · {p.detail}
                </p>
                {p.kind === "Áudio" && (
                  <div className="mt-4 flex items-center gap-3 rounded-full bg-canvas p-1.5 pr-4">
                    <button type="button" aria-label="Ouvir (demonstração)" className="grid size-8 cursor-pointer place-items-center rounded-full bg-purple text-snow">
                      <Play aria-hidden className="ml-0.5 size-3.5 fill-current" />
                    </button>
                    <span aria-hidden className="flex h-6 flex-1 items-center gap-[3px]">
                      {Array.from({ length: 28 }, (_, i) => (
                        <span key={i} className="w-[3px] rounded-full bg-purple/35" style={{ height: `${30 + ((i * 37) % 70)}%` }} />
                      ))}
                    </span>
                  </div>
                )}
                <p className="mt-4 rounded-tile bg-lilac/60 px-3.5 py-3 text-[0.84rem] italic leading-relaxed text-ink">“{p.note}”</p>
                <p className="mt-auto pt-4 text-[0.76rem] text-muted">
                  {conv ? (
                    <>
                      Em{" "}
                      <Link href={routes.platform.student.conversation(conv.slug)} className="font-semibold text-purple hover:underline">
                        {conv.question}
                      </Link>
                    </>
                  ) : (
                    "Linha de base do curso"
                  )}
                </p>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "salvos" && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {saved.map((c) => (
            <ConversationCard key={c.slug} conversation={c} saved />
          ))}
        </div>
      )}

      {tab === "historico" && (
        <Card className="max-w-3xl">
          <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-hairline">
            {journeyTimeline.map((item) => (
              <li key={item.date + item.target} className="relative flex gap-4">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-surface text-purple ring-4 ring-card">
                  <History aria-hidden className="size-4" />
                </span>
                <div className="pt-1">
                  <p className="text-[0.76rem] font-semibold text-muted">{item.date}</p>
                  <p className="mt-0.5 text-[0.92rem] text-ink">
                    {item.text} <span className="font-semibold text-midnight">{item.target}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </>
  );
}
