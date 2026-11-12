"use client";

import { useId, useState, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

/*
 * Gráficos do painel, em SVG próprio (sem biblioteca). Série única na cor --color-chart,
 * linha de 2px, grade recessiva, cruz + dica ao passar o mouse e tabela para leitores de tela.
 */

function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1] ?? points[i];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[i + 2] ?? points[i + 1];
    const t = 0.18;
    d += ` C${x1 + (x2 - x0) * t},${y1 + (y2 - y0) * t} ${x2 - (x3 - x1) * t},${y2 - (y3 - y1) * t} ${x2},${y2}`;
  }
  return d;
}

/** Minigráfico dos cards de métrica (decorativo: o número ao lado é a informação). */
export function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const id = useId();
  const w = 120;
  const h = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - 3 - ((v - min) / (max - min || 1)) * (h - 8),
  ]) as [number, number][];
  const line = smoothPath(pts);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden className={cn("h-9 w-full overflow-visible", className)}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-chart)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-chart)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="var(--color-chart)" strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </svg>
  );
}

/** Gráfico de área com eixo, grade, cruz e dica. */
export function AreaChart({
  labels,
  values,
  format,
  label,
  height = 260,
}: {
  labels: string[];
  values: number[];
  format: (v: number) => string;
  label: string;
  height?: number;
}) {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);

  const w = 720;
  const h = height;
  const pad = { top: 16, right: 12, bottom: 30, left: 52 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;

  const rawMax = Math.max(...values);
  const step = niceStep(rawMax / 4);
  const max = step * 4;
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);

  const x = (i: number) => pad.left + (i / (values.length - 1)) * innerW;
  const y = (v: number) => pad.top + innerH - (v / max) * innerH;
  const pts = values.map((v, i) => [x(i), y(v)]) as [number, number][];
  const line = smoothPath(pts);

  // rótulos do eixo x: no máximo ~6, espaçados
  const every = Math.ceil(labels.length / 6);

  const onMove = (e: PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    setActive(Math.max(0, Math.min(values.length - 1, Math.round(rel * (values.length - 1)))));
  };

  const shown = active ?? values.length - 1;

  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full overflow-visible" role="img" aria-label={label}>
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-chart)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={w - pad.right} y1={y(t)} y2={y(t)} stroke="var(--color-hairline)" strokeWidth="1" />
            <text x={pad.left - 12} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px]">
              {compact(t)}
            </text>
          </g>
        ))}

        {labels.map((l, i) =>
          i % every === 0 || i === labels.length - 1 ? (
            <text key={l} x={x(i)} y={h - 8} textAnchor="middle" className="fill-muted text-[11px]">
              {l}
            </text>
          ) : null,
        )}

        <path d={`${line} L${x(values.length - 1)},${pad.top + innerH} L${pad.left},${pad.top + innerH} Z`} fill={`url(#${id})`} />
        <path d={line} fill="none" stroke="var(--color-chart)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <line
          x1={x(shown)}
          x2={x(shown)}
          y1={pad.top}
          y2={pad.top + innerH}
          stroke="var(--color-chart)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={active === null ? 0.35 : 0.8}
        />
        <circle cx={x(shown)} cy={y(values[shown])} r="5.5" fill="var(--color-chart)" stroke="var(--color-card)" strokeWidth="2.5" />

        <rect
          x={pad.left}
          y={pad.top}
          width={innerW}
          height={innerH}
          fill="transparent"
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          className="cursor-crosshair"
        />
      </svg>

      {/* dica: posicionada em % para acompanhar o SVG responsivo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-xl bg-card px-3 py-2 text-center shadow-card ring-1 ring-hairline"
        style={{ left: `${(x(shown) / w) * 100}%`, top: `${(y(values[shown]) / h) * 100}%` }}
      >
        <p className="whitespace-nowrap text-[0.85rem] font-semibold text-midnight">{format(values[shown])}</p>
        <p className="whitespace-nowrap text-[0.7rem] text-muted">{labels[shown]}</p>
      </div>

      <table className="sr-only">
        <caption>{label}</caption>
        <tbody>
          {labels.map((l, i) => (
            <tr key={l}>
              <th scope="row">{l}</th>
              <td>{format(values[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function niceStep(raw: number) {
  const pow = 10 ** Math.floor(Math.log10(raw || 1));
  const n = raw / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return nice * pow;
}

function compact(v: number) {
  if (v >= 1000) return `${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`;
  return v.toLocaleString("pt-BR");
}

/** Lista de barras: parte do todo lida linha a linha (nome, barra e valor alinhados). */
export function MeterList({
  items,
  format,
}: {
  items: { label: string; value: number }[];
  format: (v: number) => string;
}) {
  const total = items.reduce((a, b) => a + b.value, 0);
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const share = Math.round((item.value / total) * 100);
        return (
          <li key={item.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.84rem]">
              <span className="font-medium text-ink">{item.label}</span>
              <span className="tabular-nums text-muted">
                <span className="font-semibold text-midnight">{share}%</span> · {format(item.value)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-chart-soft">
              <div className="h-full rounded-full bg-chart" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
