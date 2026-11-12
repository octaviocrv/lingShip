"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumn,
  Eye,
  LifeBuoy,
  PlayCircle,
  Plus,
  Radio,
  SearchX,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { routes } from "@/config/routes";
import { brl, brlShort, int } from "@/lib/format";
import { cn } from "@/lib/cn";
import { conversations, editorialStatuses } from "../content/catalog";
import {
  nextMeeting,
  periodData,
  periods,
  recentSales,
  salesByOffer,
  supportRequests,
  teacher,
  unansweredSearches,
  type Period,
} from "../content/teacher";
import { AreaChart, MeterList, Sparkline } from "../components/charts";
import { Avatar, BtnLink, Card, CardHeader, CardLink, Delta, IconTile, Pill, StatusBadge } from "../components/ui";

const t = routes.platform.teacher;
const kpiIcons = { receita: Wallet, matriculas: BookOpen, ativos: Users, assistidas: PlayCircle } as const;
const kpiTones = { receita: "purple", matriculas: "success", ativos: "orange", assistidas: "coral" } as const;

export function TeacherOverview() {
  const [period, setPeriod] = useState<Period>("30d");
  const data = periodData[period];
  const periodLong = periods.find((p) => p.id === period)!.long;

  const pipeline = editorialStatuses.map((s) => ({ ...s, count: conversations.filter((c) => c.status === s.id).length }));
  const inProgress = conversations.filter((c) => c.status !== "publicado" && c.status !== "ideia");
  const topSaved = [...conversations].sort((a, b) => b.saves - a.saves).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[clamp(1.75rem,1.3rem+1.2vw,2.35rem)] font-semibold leading-tight text-midnight">
            Bom dia, {teacher.firstName}!
          </h1>
          <p className="mt-2 text-[0.98rem] text-muted">Um resumo do que aconteceu na Lingship nos {periodLong}.</p>
        </div>
        <div role="group" aria-label="Período" className="flex gap-1 rounded-full bg-card p-1 shadow-card">
          {periods.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={period === p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "h-9 min-w-14 cursor-pointer rounded-full px-4 text-[0.8rem] font-semibold transition-colors",
                period === p.id ? "bg-purple text-snow" : "text-ink hover:text-purple",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((k) => (
          <Card key={k.id} as="div" className="lg:p-5">
            <div className="flex items-center gap-3.5">
              <IconTile icon={kpiIcons[k.id as keyof typeof kpiIcons]} tone={kpiTones[k.id as keyof typeof kpiTones]} />
              <div className="min-w-0">
                <p className="text-[0.8rem] text-muted">{k.label}</p>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[1.45rem] font-semibold tabular-nums text-midnight">
                    {k.format === "brl" ? brlShort(k.value) : int(k.value)}
                  </span>
                  <Delta value={k.delta} />
                </p>
              </div>
            </div>
            <Sparkline values={k.spark} className="mt-4" />
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader
            title="Receita"
            icon={ChartNoAxesColumn}
            action={
              <CardLink href={t.students}>Ver vendas</CardLink>
            }
          />
          <p className="text-[2.1rem] font-semibold leading-none tabular-nums text-midnight">{brl(data.revenue.total)}</p>
          <p className="mt-2 flex items-center gap-2 text-[0.82rem] text-muted">
            <Delta value={data.revenue.delta} /> em relação ao período anterior
          </p>
          <div className="mt-6">
            <AreaChart
              key={period}
              labels={data.revenue.labels}
              values={data.revenue.values}
              format={brl}
              label={`Receita por ${period === "90d" ? "semana" : "dia"} nos ${periodLong}`}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Vendas recentes" icon={ShoppingBag} action={<CardLink href={t.students}>Ver todas</CardLink>} />
          <ul className="-my-1 divide-y divide-hairline">
            {recentSales.map((sale) => (
              <li key={sale.name + sale.when} className="flex items-center gap-3.5 py-3.5">
                <Avatar initials={sale.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.88rem] font-semibold text-midnight">{sale.item}</p>
                  <p className="text-[0.76rem] text-muted">
                    {sale.name} · {sale.when}
                  </p>
                </div>
                <span className="text-[0.88rem] font-semibold tabular-nums text-success">+{brl(sale.value)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader title="Vendas por oferta" description="Participação na receita do período." />
          <MeterList items={salesByOffer} format={brlShort} />
        </Card>

        {/* Buscas que viram material (seção XIV) */}
        <Card>
          <CardHeader
            title="O que seus alunos procuraram"
            icon={SearchX}
            description="Buscas sem conversa no acervo. Podem virar o próximo material."
          />
          <ul className="space-y-2.5">
            {unansweredSearches.map((s) => (
              <li key={s.query} className="flex items-center gap-3 rounded-tile bg-canvas py-2.5 pl-4 pr-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.88rem] font-semibold text-midnight">“{s.query}”</p>
                  <p className="text-[0.74rem] text-muted">{s.count} buscas</p>
                </div>
                <Link
                  href={`${t.newContent}?pergunta=${encodeURIComponent(s.query)}`}
                  aria-label={`Criar conversa a partir de “${s.query}”`}
                  className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-card px-3 text-[0.76rem] font-semibold text-purple shadow-sm transition hover:bg-surface"
                >
                  <Plus aria-hidden className="size-3.5" />
                  Criar
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <div className="relative flex flex-col overflow-hidden rounded-box bg-midnight p-6 text-snow shadow-card lg:col-span-2 xl:col-span-1">
          <span aria-hidden className="absolute -right-10 -top-16 size-56 rounded-full bg-purple/40 blur-2xl" />
          <span aria-hidden className="absolute -bottom-20 -left-10 size-48 rounded-full bg-orange/20 blur-2xl" />
          <div className="relative">
            <p className="flex items-center gap-2 text-[0.8rem] font-semibold text-rose">
              <Radio aria-hidden className="size-4" />
              Próximo encontro ao vivo
            </p>
            <p className="mt-4 font-serif text-[1.45rem] font-semibold leading-snug">{nextMeeting.theme}</p>
            <p className="mt-3 flex items-center gap-2 text-[0.86rem] text-snow/80">
              <CalendarDays aria-hidden className="size-4" />
              {nextMeeting.date} · {nextMeeting.time}
            </p>
          </div>
          <div className="relative mt-6 flex items-center gap-3">
            <span className="flex -space-x-2.5">
              {["HD", "CR", "BL", "LF", "PA"].map((i) => (
                <span key={i} className="grid size-9 place-items-center rounded-full bg-lilac text-[0.66rem] font-bold text-midnight ring-2 ring-midnight">
                  {i}
                </span>
              ))}
            </span>
            <span className="text-[0.82rem] text-snow/70">
              +{nextMeeting.registered - 5} inscritos
            </span>
          </div>
          <div className="relative mt-auto flex flex-wrap gap-2.5 pt-6">
            <BtnLink href={t.home} size="sm">
              Abrir sala
            </BtnLink>
            <BtnLink href={t.home} size="sm" variant="secondary" className="border-transparent bg-white/10 text-snow hover:bg-white/15">
              Editar tema
            </BtnLink>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader title="Acervo em produção" action={<CardLink href={t.contents}>Abrir acervo</CardLink>} />
          <div className="mb-5 flex flex-wrap gap-1.5">
            {pipeline.map((p) => (
              <span key={p.id} className="inline-flex items-baseline gap-1.5 rounded-full bg-canvas px-3 py-1.5 text-[0.76rem] text-muted">
                <span className="text-[0.9rem] font-semibold text-midnight">{p.count}</span>
                {p.label}
              </span>
            ))}
          </div>
          <ul className="space-y-3">
            {inProgress.map((c) => (
              <li key={c.slug}>
                <Link href={t.content(c.slug)} className="group flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-[0.86rem] font-medium text-midnight group-hover:text-purple">{c.question}</span>
                  <StatusBadge status={c.status} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Conversas mais salvas" icon={Eye} description="O que mais gera reconhecimento." />
          <ol className="space-y-3.5">
            {topSaved.map((c, i) => (
              <li key={c.slug} className="flex items-center gap-3">
                <span className="w-5 text-[0.86rem] font-semibold text-muted">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-[0.86rem] font-medium text-midnight">{c.question}</span>
                <span className="text-[0.8rem] tabular-nums text-muted">{int(c.saves)}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader title="Suporte" icon={LifeBuoy} action={<Pill tone="orange">2 abertos</Pill>} />
          <ul className="-my-1 divide-y divide-hairline">
            {supportRequests.map((r) => (
              <li key={r.subject} className="flex items-start gap-3 py-3">
                <span
                  aria-hidden
                  className={cn("mt-1.5 size-2 shrink-0 rounded-full", r.status === "aberto" ? "bg-orange" : "bg-hairline")}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.86rem] font-semibold text-midnight">{r.subject}</p>
                  <p className="text-[0.74rem] text-muted">
                    {r.name} · {r.when} · {r.status === "aberto" ? "Aberto" : "Respondido"}
                  </p>
                </div>
                <ArrowRight aria-hidden className="mt-1 size-4 text-muted" />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
