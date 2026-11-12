"use client";

import { useState } from "react";
import { CalendarDays, Check, FileText, FlaskConical, Minus, Play, Plus, Target, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { applications, mentees, mentoringCycle } from "../content/teacher";
import { Avatar, Btn, Card, CardHeader, PageHeader, Pill, Table, Td, Th } from "../components/ui";

type Decision = "aceita" | "recusada" | undefined;

/** Mentoria do lado da professora: vagas do ciclo, candidaturas e mentorados ativos. */
export function TeacherMentoring() {
  const [open, setOpen] = useState(mentoringCycle.open);
  const [seats, setSeats] = useState(mentoringCycle.seats);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const accepted = Object.values(decisions).filter((d) => d === "aceita").length;
  const filled = mentoringCycle.filled + accepted;

  return (
    <>
      <PageHeader title="Mentoria" description="Abra e feche vagas, leia candidaturas e acompanhe cada ciclo." />

      <div className="mb-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <Card className="flex flex-col">
          <CardHeader title={mentoringCycle.name} description={`Começa em ${mentoringCycle.starts}`} />
          <div className="flex items-center justify-between gap-4 rounded-tile bg-canvas px-4 py-3.5">
            <div>
              <p className="text-[0.9rem] font-semibold text-midnight">Inscrições {open ? "abertas" : "fechadas"}</p>
              <p className="text-[0.76rem] text-muted">{open ? "A página de candidatura está no ar." : "Alunos veem a data do próximo ciclo."}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={open}
              aria-label="Inscrições abertas"
              onClick={() => setOpen((v) => !v)}
              className={cn("relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors", open ? "bg-purple" : "bg-hairline")}
            >
              <span className={cn("absolute left-1 top-1 size-5 rounded-full bg-card shadow transition-transform", open && "translate-x-5")} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-[0.9rem] font-semibold text-midnight">Vagas no ciclo</p>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Menos vagas" onClick={() => setSeats((v) => Math.max(filled, v - 1))} className="grid size-9 cursor-pointer place-items-center rounded-full bg-canvas text-midnight hover:bg-surface">
                <Minus aria-hidden className="size-4" />
              </button>
              <span className="w-8 text-center text-[1.2rem] font-semibold text-midnight">{seats}</span>
              <button type="button" aria-label="Mais vagas" onClick={() => setSeats((v) => v + 1)} className="grid size-9 cursor-pointer place-items-center rounded-full bg-canvas text-midnight hover:bg-surface">
                <Plus aria-hidden className="size-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex gap-1.5" aria-label={`${filled} de ${seats} vagas preenchidas`} role="img">
            {Array.from({ length: seats }, (_, i) => (
              <span key={i} className={cn("h-2.5 flex-1 rounded-full", i < filled ? "bg-chart" : "bg-chart-soft")} />
            ))}
          </div>
          <p className="mt-2 text-[0.8rem] text-muted">
            {filled} de {seats} vagas preenchidas
          </p>
        </Card>

        <Card>
          <CardHeader title="Candidaturas" action={<Pill tone="orange">{applications.length - Object.keys(decisions).length} para ler</Pill>} />
          <ul className="space-y-3">
            {applications.map((a) => {
              const d = decisions[a.id];
              return (
                <li key={a.id} className={cn("rounded-tile border p-4 transition", d ? "border-transparent bg-canvas" : "border-hairline")}>
                  <div className="flex flex-wrap items-start gap-3.5">
                    <Avatar initials={a.initials} />
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-[0.92rem] font-semibold text-midnight">
                        {a.name}
                        <span className="text-[0.74rem] font-normal text-muted">
                          {a.situation} · {a.date}
                        </span>
                      </p>
                      <p className="mt-1 flex items-start gap-2 text-[0.86rem] text-ink">
                        <Target aria-hidden className="mt-0.5 size-4 shrink-0 text-purple" />
                        {a.goal}
                      </p>
                      <button type="button" className="mt-2.5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[0.76rem] font-semibold text-purple">
                        {a.production.startsWith("Áudio") ? <Play aria-hidden className="size-3 fill-current" /> : <FileText aria-hidden className="size-3" />}
                        Produção inicial · {a.production}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      {d ? (
                        <Pill tone={d === "aceita" ? "success" : "neutral"} icon={d === "aceita" ? Check : X}>
                          {d === "aceita" ? "Aceita" : "Recusada"}
                        </Pill>
                      ) : (
                        <>
                          <Btn size="sm" variant="secondary" onClick={() => setDecisions((p) => ({ ...p, [a.id]: "recusada" }))}>
                            Recusar
                          </Btn>
                          <Btn size="sm" variant="dark" onClick={() => setDecisions((p) => ({ ...p, [a.id]: "aceita" }))} disabled={filled >= seats}>
                            Aceitar
                          </Btn>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader title="Mentorados no ciclo atual" description="Foco do ciclo, próximo encontro e o experimento em teste." />
        <Table>
          <thead>
            <tr>
              <Th>Mentorado</Th>
              <Th>Foco atual</Th>
              <Th>Experimento em teste</Th>
              <Th>Próximo encontro</Th>
            </tr>
          </thead>
          <tbody>
            {mentees.map((m) => (
              <tr key={m.name} className="transition-colors hover:bg-snow/60">
                <Td>
                  <span className="flex items-center gap-3">
                    <Avatar initials={m.initials} size="sm" />
                    <span className="font-semibold text-midnight">{m.name}</span>
                  </span>
                </Td>
                <Td>{m.focus}</Td>
                <Td>
                  <span className="inline-flex items-center gap-2">
                    <FlaskConical aria-hidden className="size-4 text-orange-deep" />
                    {m.experiment}
                  </span>
                </Td>
                <Td>
                  <span className="inline-flex items-center gap-2 text-muted">
                    <CalendarDays aria-hidden className="size-4" />
                    {m.next}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="mt-4 text-[0.76rem] text-muted">Focos e experimentos ilustrativos.</p>
      </Card>
    </>
  );
}
