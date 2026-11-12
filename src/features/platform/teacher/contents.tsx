"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Search } from "lucide-react";
import { routes } from "@/config/routes";
import { brl, int } from "@/lib/format";
import { cn } from "@/lib/cn";
import { conversations, editorialStatuses, seriesTitle, situationLabel, type EditorialStatus } from "../content/catalog";
import { BtnLink, Card, PageHeader, Pill, StatusBadge, Table, Td, Th } from "../components/ui";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Acervo da professora: tudo, inclusive o que ainda está em produção. */
export function Contents({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState<EditorialStatus | "todos">("todos");

  const rows = useMemo(
    () =>
      conversations.filter(
        (c) => (status === "todos" || c.status === status) && (!query || normalize(c.question).includes(normalize(query))),
      ),
    [query, status],
  );

  return (
    <>
      <PageHeader
        title="Conteúdos"
        description="Seu acervo de conversas, da ideia à publicação. Organize por pergunta, sem depender de ninguém."
        actions={
          <BtnLink href={routes.platform.teacher.newContent}>
            <Plus aria-hidden />
            Nova conversa
          </BtnLink>
        }
      />

      {/* funil editorial: também é filtro */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {[{ id: "todos" as const, label: "Todos" }, ...editorialStatuses].map((s) => {
          const count = s.id === "todos" ? conversations.length : conversations.filter((c) => c.status === s.id).length;
          const active = status === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setStatus(s.id)}
              className={cn(
                "cursor-pointer rounded-box px-5 py-4 text-left shadow-card transition",
                active ? "bg-midnight text-snow" : "bg-card text-midnight hover:ring-2 hover:ring-purple/15",
              )}
            >
              <span className="block text-[1.6rem] font-semibold leading-none">{count}</span>
              <span className={cn("mt-1.5 block text-[0.8rem]", active ? "text-snow/70" : "text-muted")}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <Card>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <label className="flex h-11 w-full max-w-sm items-center gap-2.5 rounded-full border border-hairline bg-snow/60 px-4 focus-within:border-purple/40">
            <Search aria-hidden className="size-4 text-muted" />
            <span className="sr-only">Buscar no acervo</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por pergunta"
              className="h-full min-w-0 flex-1 bg-transparent text-[0.88rem] outline-none placeholder:text-muted/80"
            />
          </label>
          <p className="text-[0.8rem] text-muted">{rows.length} conversas</p>
        </div>

        <Table>
          <thead>
            <tr>
              <Th>Pergunta</Th>
              <Th>Série</Th>
              <Th>Acesso</Th>
              <Th>Status</Th>
              <Th className="text-right">Salvos</Th>
              <Th>Atualizado</Th>
              <Th>
                <span className="sr-only">Ações</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.slug} className="group transition-colors hover:bg-snow/60">
                <Td>
                  <Link href={routes.platform.teacher.content(c.slug)} className="flex items-center gap-3.5">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-tile">
                      <Image src={c.cover} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-[340px] truncate font-semibold text-midnight group-hover:text-purple">{c.question}</span>
                      <span className="block text-[0.74rem] text-muted">
                        {situationLabel(c.situations[0])} · {c.format} · {c.minutes} min
                      </span>
                    </span>
                  </Link>
                </Td>
                <Td className="text-muted">{seriesTitle(c.series) ?? "Avulsa"}</Td>
                <Td>
                  {c.access.kind === "gratuito" ? (
                    <Pill tone="success">Gratuita</Pill>
                  ) : c.access.kind === "assinatura" ? (
                    <Pill tone="purple">Assinatura</Pill>
                  ) : (
                    <Pill tone="orange">{brl(c.access.price)}</Pill>
                  )}
                </Td>
                <Td>
                  <StatusBadge status={c.status} />
                </Td>
                <Td className="text-right tabular-nums">{c.saves ? int(c.saves) : "–"}</Td>
                <Td className="text-muted">{c.updated}</Td>
                <Td className="text-right">
                  <Link
                    href={routes.platform.teacher.content(c.slug)}
                    aria-label={`Editar: ${c.question}`}
                    className="inline-grid size-9 place-items-center rounded-full text-muted transition hover:bg-surface hover:text-purple"
                  >
                    <Pencil aria-hidden className="size-4" />
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
