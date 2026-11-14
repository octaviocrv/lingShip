"use client";

import { ArrowUpRight, AudioLines, CalendarCheck2, Clock3, Goal, Target, TrendingUp } from "lucide-react";
import { Card, IconTile, PageHeader, Pill, ProgressBar } from "../components/ui";
import { AreaChart, DonutChart, Sparkline } from "../components/charts";

const metrics = [
  { label: "Aulas realizadas", value: "8", detail: "de 10 planejadas", icon: CalendarCheck2, tone: "purple" as const, series: [2, 3, 3, 5, 5, 7, 8] },
  { label: "Presença", value: "80%", detail: "nas últimas 10 aulas", icon: TrendingUp, tone: "success" as const, series: [55, 60, 64, 62, 70, 78, 80] },
  { label: "Tempo de prática", value: "6h40", detail: "registrado neste ciclo", icon: Clock3, tone: "orange" as const, series: [18, 21, 31, 28, 35, 42, 48] },
  { label: "Entregas enviadas", value: "5", detail: "áudios e atividades", icon: AudioLines, tone: "purple" as const, series: [0, 1, 1, 2, 3, 3, 5] },
];

const weeklyPractice = { labels: ["07 out", "14 out", "21 out", "28 out", "04 nov", "11 nov", "18 nov"], values: [18, 25, 42, 31, 55, 49, 67] };
const practiceMix = [
  { label: "Aulas", value: 3.2, color: "#6d3fc0" },
  { label: "Áudios e exercícios", value: 1.6, color: "#f97316" },
  { label: "Revisões", value: 1.0, color: "#17805a" },
  { label: "Explorar", value: 0.8, color: "#d2788d" },
];

/** Painel pessoal de evolução. Todos os números ainda são demonstrativos. */
export function Journey() {
  return (
    <>
      <PageHeader eyebrow="Dados demonstrativos" title="Meu percurso" description="Seu painel de evolução no inglês." />

      <Card className="relative overflow-hidden bg-midnight text-snow">
        <span aria-hidden className="absolute -right-10 -top-16 size-60 rounded-full bg-orange/20 blur-2xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
          <div>
            <Pill tone="solid" icon={Goal}>Objetivo atual</Pill>
            <h2 className="mt-4 max-w-2xl font-serif text-[1.65rem] font-semibold leading-tight text-snow">Falar com mais naturalidade sobre sua rotina e seu trabalho.</h2>
            <p className="mt-2 max-w-xl text-[0.88rem] leading-relaxed text-snow/75">Ciclo atual: outubro a dezembro de 2026</p>
          </div>
          <div className="rounded-tile border border-white/15 bg-white/10 p-4">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-orange">Meta do ciclo</p>
            <p className="mt-2 text-[0.9rem] font-semibold">10 aulas · 6 práticas enviadas</p>
            <div className="mt-3"><ProgressBar value={8} max={10} label="8 de 10 aulas realizadas" className="bg-white/20 [&>div]:bg-orange" /></div>
            <p className="mt-2 text-[0.76rem] text-snow/70">8 de 10 aulas realizadas</p>
          </div>
        </div>
      </Card>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores do ciclo">
        {metrics.map((metric) => <Card key={metric.label} className="p-4 lg:p-5"><div className="flex items-start justify-between gap-3"><IconTile icon={metric.icon} tone={metric.tone} size="sm" /><ArrowUpRight aria-hidden className="size-4 text-muted" /></div><p className="mt-5 text-[0.76rem] font-semibold text-muted">{metric.label}</p><p className="mt-1 font-serif text-[1.7rem] font-semibold leading-none text-midnight">{metric.value}</p><p className="mt-2 text-[0.72rem] text-muted">{metric.detail}</p><Sparkline values={metric.series} className="mt-3 h-7" /></Card>)}
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <Card>
          <div className="flex items-start justify-between gap-4"><div><p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-purple">Ritmo de prática</p><h2 className="mt-1 font-serif text-[1.3rem] font-semibold">Minutos praticados por semana</h2></div><Pill tone="purple">Últimas 7 semanas</Pill></div>
          <div className="mt-5"><AreaChart labels={weeklyPractice.labels} values={weeklyPractice.values} format={(value) => `${value} min`} label="Minutos de prática por semana" height={220} /></div>
        </Card>
        <Card>
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-purple">Distribuição da prática</p><h2 className="mt-1 font-serif text-[1.3rem] font-semibold">Onde seu tempo entrou</h2>
          <div className="mt-6"><DonutChart items={practiceMix} label="Distribuição das horas de prática" /></div>
          <p className="mt-5 text-[0.76rem] leading-relaxed text-muted">A ideia não é buscar uma divisão perfeita; é enxergar onde sua energia está indo.</p>
        </Card>
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Card>
          <div className="flex items-start justify-between gap-4"><div><p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-purple">Comparação de fala</p><h2 className="mt-1 font-serif text-[1.3rem] font-semibold">Do seu ponto de partida até agora</h2></div><Pill tone="purple">Áudio</Pill></div>
          <div className="mt-6 divide-y divide-hairline">
            <Comparison label="Tempo falando sem parar" start="2min10" current="3min40" progress={72} />
            <Comparison label="Pausas longas" start="11" current="6" progress={55} reverse />
            <Comparison label="Palavras diferentes usadas" start="9" current="16" progress={76} />
          </div>
          <p className="mt-5 rounded-tile bg-surface/65 p-3.5 text-[0.78rem] leading-relaxed text-muted">A comparação completa poderá usar seus áudios, exercícios e observações da Vanessa. Nesta versão, os números são exemplos de como o histórico vai aparecer.</p>
        </Card>

        <Card>
          <div className="flex items-start gap-3"><IconTile icon={Target} tone="orange" /><div><h2 className="font-serif text-[1.3rem] font-semibold">Foco desta semana</h2><p className="mt-1 text-[0.8rem] leading-relaxed text-muted">Pequenos passos ligados ao seu objetivo atual.</p></div></div>
          <ul className="mt-5 space-y-3">
            <GoalItem done label="Participar da aula de quinta-feira" detail="20 nov · 19h" />
            <GoalItem label="Enviar o áudio: contando como foi sua semana" detail="Prazo: 22 nov" />
            <GoalItem label="Revisar 12 expressões de rotina" detail="Sugestão após a próxima aula" />
          </ul>
        </Card>
      </section>

    </>
  );
}

function Comparison({ label, start, current, progress, reverse = false }: { label: string; start: string; current: string; progress: number; reverse?: boolean }) {
  return <div className="py-4 first:pt-0 last:pb-0"><div className="flex items-baseline justify-between gap-3"><p className="text-[0.84rem] font-semibold text-ink">{label}</p><p className="text-[0.75rem] text-muted"><span>{start}</span><span className="mx-1.5">→</span><strong className="font-semibold text-midnight">{current}</strong></p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-canvas"><div className={reverse ? "h-full rounded-full bg-orange" : "h-full rounded-full bg-purple"} style={{ width: `${progress}%` }} /></div></div>;
}

function GoalItem({ label, detail, done = false }: { label: string; detail: string; done?: boolean }) {
  return <li className="flex items-start gap-3 rounded-tile bg-canvas/75 p-3.5"><span className={done ? "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success text-white" : "mt-0.5 size-5 shrink-0 rounded-full border-2 border-orange"}>{done && <span aria-hidden className="text-[0.7rem]">✓</span>}</span><span><span className="block text-[0.84rem] font-semibold text-midnight">{label}</span><span className="mt-0.5 block text-[0.74rem] text-muted">{detail}</span></span></li>;
}
