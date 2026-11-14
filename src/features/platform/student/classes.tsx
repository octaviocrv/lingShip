"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, ChevronRight, Clock3, FolderOpen, Play, Radio, Search, Video, X } from "lucide-react";
import { classPlan, classRecordings } from "../content/classes";
import { Card, CardHeader, IconTile, PageHeader, Pill, ProgressBar } from "../components/ui";

/** Área de aulas particulares. Os dados são demonstrativos até a integração com Google Meet e Drive. */
export function MyClasses() {
  const attendancePercent = Math.round((classPlan.attendance.attended / classPlan.attendance.planned) * 100);
  const [video, setVideo] = useState<{ id: string; title: string } | null>(null);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"recent" | "older">("recent");
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({ "Novembro de 2026": true, "Outubro de 2026": false });
  const recordingGroups = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");
    const filtered = classRecordings
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => !query || `${group.month} ${item.date} ${item.title} ${item.summary} ${item.topics.join(" ")}`.toLocaleLowerCase("pt-BR").includes(query)),
      }))
      .filter((group) => group.items.length > 0);
    return order === "recent" ? filtered : [...filtered].reverse();
  }, [order, search]);

  return (
    <>
      <PageHeader
        eyebrow="Dados de demonstração"
        title="Minhas aulas"
        description="Seu plano, horários, presença e gravações das aulas ficam organizados aqui."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <PlanCard attendancePercent={attendancePercent} />
        <AttendanceCard attendancePercent={attendancePercent} />
      </div>

      <section className="mt-10" aria-labelledby="gravacoes">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-purple">Biblioteca da aluna</p>
            <h2 id="gravacoes" className="mt-1 font-serif text-[clamp(1.55rem,1.2rem+1vw,2.1rem)] font-semibold text-midnight">
              Gravações das aulas
            </h2>
          </div>
          <Pill tone="purple" icon={FolderOpen}>Organizadas por mês</Pill>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 flex-1 items-center gap-2.5 rounded-full bg-card px-4 shadow-card ring-1 ring-transparent transition focus-within:ring-purple/30">
            <Search aria-hidden className="size-4 shrink-0 text-muted" />
            <span className="sr-only">Buscar gravação</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Buscar por mês, data ou assunto" className="min-w-0 flex-1 bg-transparent text-[0.86rem] text-ink outline-none placeholder:text-muted" />
          </label>
          <label className="flex h-11 items-center gap-2 rounded-full bg-card px-4 text-[0.8rem] font-semibold text-ink shadow-card">
            Ordenar
            <select value={order} onChange={(event) => setOrder(event.target.value as "recent" | "older")} className="bg-transparent text-[0.8rem] font-semibold text-purple outline-none">
              <option value="recent">Mais recentes</option>
              <option value="older">Mais antigas</option>
            </select>
          </label>
        </div>

        <div className="space-y-6">
          {recordingGroups.map((group) => {
            const isOpen = openMonths[group.month] ?? false;
            return (
              <section key={group.month} className="overflow-hidden rounded-box border border-hairline bg-card shadow-card" aria-labelledby={group.month.replaceAll(" ", "-")}>
                <button type="button" onClick={() => setOpenMonths((current) => ({ ...current, [group.month]: !isOpen }))} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition hover:bg-canvas sm:px-6">
                  <ChevronRight aria-hidden className={`size-5 shrink-0 text-purple transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  <FolderOpen aria-hidden className="size-4 text-orange" />
                  <h3 id={group.month.replaceAll(" ", "-")} className="flex-1 text-[0.92rem] font-semibold text-midnight">{group.month}</h3>
                  <Pill>{group.items.length} {group.items.length === 1 ? "aula" : "aulas"}</Pill>
                </button>
                {isOpen && <div className="border-t border-hairline p-5 sm:p-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((recording) => (
                    <RecordingCard key={recording.date} {...recording} onOpen={() => setVideo({ id: recording.youtubeId, title: recording.title })} />
                  ))}
                </div></div>}
              </section>
            );
          })}
          {recordingGroups.length === 0 && <Card className="py-10 text-center text-[0.9rem] text-muted">Não encontramos nenhuma gravação com essa busca.</Card>}
        </div>
      </section>

      {video && <VideoDialog title={video.title} youtubeId={video.id} onClose={() => setVideo(null)} />}
    </>
  );
}

function PlanCard({ attendancePercent }: { attendancePercent: number }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-hairline bg-[linear-gradient(120deg,var(--color-lilac),var(--color-blush))] p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-purple">Meu plano atual</p>
            <h2 className="mt-1 font-serif text-[1.7rem] font-semibold text-midnight">{classPlan.name}</h2>
            <p className="mt-2 text-[0.9rem] text-muted">{classPlan.cycle}</p>
          </div>
          <IconTile icon={Radio} tone="orange" size="lg" />
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
        <PlanMetric label="Ritmo" value={classPlan.cadence} />
        <PlanMetric label="Duração" value={classPlan.duration} />
        <PlanMetric label="Presença" value={`${attendancePercent}%`} />
      </div>
      <div className="border-t border-hairline px-6 py-5 sm:px-7">
        <p className="text-[0.76rem] font-bold uppercase tracking-[0.12em] text-muted">Seus horários fixos</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {classPlan.schedule.map((slot) => (
            <div key={slot.day} className="flex items-center gap-3 rounded-tile bg-canvas p-4">
              <IconTile icon={CalendarCheck} size="sm" tone="purple" />
              <span>
                <strong className="block text-[0.9rem] text-midnight">{slot.day} · {slot.time}</strong>
                <span className="block text-[0.76rem] text-muted">{slot.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function PlanMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 font-serif text-[1.15rem] font-semibold text-midnight">{value}</p>
    </div>
  );
}

function AttendanceCard({ attendancePercent }: { attendancePercent: number }) {
  return (
    <Card className="flex flex-col sm:p-7">
      <CardHeader title="Frequência" icon={CheckCircle2} description="Neste ciclo de aulas" />
      <p className="font-serif text-[3.4rem] font-semibold leading-none text-midnight">{attendancePercent}%</p>
      <p className="mt-2 text-[0.86rem] text-muted">{classPlan.attendance.attended} de {classPlan.attendance.planned} aulas realizadas</p>
      <ProgressBar className="mt-6" value={classPlan.attendance.attended} max={classPlan.attendance.planned} label="Frequência no ciclo atual" />
      <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">{classPlan.attendance.label}. A frequência será calculada automaticamente quando o calendário estiver conectado.</p>
      <div className="mt-auto rounded-tile bg-surface p-4">
        <p className="text-[0.78rem] font-semibold text-purple">Próxima aula</p>
        <p className="mt-1 text-[0.88rem] font-semibold text-midnight">Segunda · 19h às 19h50</p>
        <p className="mt-1 text-[0.76rem] text-muted">Aula individual online</p>
      </div>
    </Card>
  );
}

function RecordingCard({
  date,
  title,
  duration,
  status,
  summary,
  topics,
  onOpen,
}: {
  date: string;
  title: string;
  duration: string;
  status: string;
  summary: string;
  topics: readonly string[];
  onOpen: () => void;
}) {
  return (
    <Card as="article" className="group flex min-h-48 flex-col p-5 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <IconTile icon={Video} tone="purple" />
        <Pill tone="success" icon={CheckCircle2}>{status}</Pill>
      </div>
      <p className="mt-5 text-[0.76rem] font-semibold text-muted">{date} · Aula individual</p>
      <h3 className="mt-1 font-serif text-[1.16rem] font-semibold leading-snug text-midnight">{title}</h3>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{summary}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tópicos da aula">
        {topics.map((topic) => <li key={topic}><Pill tone="purple">{topic}</Pill></li>)}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-hairline pt-4 text-[0.78rem] text-muted">
        <span className="inline-flex items-center gap-1.5"><Clock3 aria-hidden className="size-3.5" />{duration}</span>
        <button type="button" onClick={onOpen} className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 font-semibold text-purple transition hover:bg-surface">
          <Play aria-hidden className="size-3.5 fill-current" />Assistir
        </button>
      </div>
    </Card>
  );
}

function VideoDialog({ title, youtubeId, onClose }: { title: string; youtubeId: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-midnight/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Vídeo: ${title}`}>
      <div className="w-full max-w-4xl overflow-hidden rounded-box bg-card shadow-card-hover">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-6">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-purple">Demonstração do player</p>
            <h2 className="mt-0.5 font-serif text-[1.2rem] font-semibold text-midnight">{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar vídeo" className="grid size-10 cursor-pointer place-items-center rounded-full text-muted transition hover:bg-canvas hover:text-midnight">
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className="aspect-video bg-midnight">
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
            title={`Vídeo de demonstração: ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="px-5 py-3 text-[0.75rem] text-muted sm:px-6">Vídeo público do YouTube usado apenas para demonstrar como a gravação ficará dentro da LingShip.</p>
      </div>
    </div>
  );
}
