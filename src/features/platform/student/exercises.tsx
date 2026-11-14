"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, CalendarPlus, CheckCircle2, ChevronRight, Clock3, FileUp, MessageCircle, Mic, Paperclip, Send } from "lucide-react";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { studentExercises, type ExerciseStatus, type StudentExercise } from "../content/learning-items";
import { AudioRecorder } from "./components/audio-recorder";
import { cn } from "@/lib/cn";
import { Btn, Card, IconTile, PageHeader, Pill } from "../components/ui";

const statusMeta: Record<ExerciseStatus, { label: string; tone: "orange" | "purple" | "success"; icon: typeof Clock3 }> = {
  "para-fazer": { label: "Para entregar", tone: "orange", icon: Clock3 },
  enviado: { label: "Enviado para Vanessa", tone: "purple", icon: Send },
  concluido: { label: "Concluído", tone: "success", icon: CheckCircle2 },
};

/** Central de entregas. A aluna faz a atividade fora da plataforma e só anexa o resultado aqui. */
export function Exercises() {
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({ "Novembro de 2026": true, "Outubro de 2026": false });
  const weekly = studentExercises.filter((exercise) => exercise.status === "para-fazer");
  const sent = studentExercises.filter((exercise) => exercise.status === "enviado");
  const completed = studentExercises.filter((exercise) => exercise.status === "concluido");
  const monthGroups = Array.from(new Set(studentExercises.map((exercise) => exercise.month))).map((month) => ({ month, items: studentExercises.filter((exercise) => exercise.month === month) }));

  return (
    <>
      <PageHeader eyebrow="Dados de demonstração" title="Suas entregas" description="Veja o que precisa fazer agora, o que já enviou e o que ficou concluído." />

      <section aria-labelledby="semana" className="grid overflow-hidden rounded-box bg-card shadow-card lg:grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)]">
        <div className="relative overflow-hidden bg-orange p-6 text-midnight sm:p-8">
          <span aria-hidden className="pointer-events-none absolute -right-5 -top-12 font-logo text-[12rem] leading-none text-midnight/10">”</span>
          <div className="relative">
            <Pill tone="dark" icon={CalendarDays}>12 a 19 de novembro</Pill>
            <p className="mt-6 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-midnight/70">Sua prioridade agora</p>
            <h2 id="semana" className="mt-1 font-serif text-[clamp(2rem,1.4rem+1.8vw,3.1rem)] font-semibold leading-[1.05]">O que você tem para fazer esta semana?</h2>
            <div className="mt-6 flex items-end gap-3"><strong className="font-serif text-[4.5rem] font-semibold leading-none">{weekly.length}</strong><span className="pb-2 text-[1rem] font-semibold leading-tight">{weekly.length === 1 ? "entrega precisa" : "entregas precisam"}<br />da sua atenção</span></div>
          </div>
        </div>
        <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-1">
          <StatusSummary icon={Send} value={sent.length} label="enviada" description="A Vanessa ainda vai olhar" tone="purple" />
          <StatusSummary icon={CheckCircle2} value={completed.length} label="concluída" description="Já faz parte do seu percurso" tone="success" />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="para-fazer">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-orange-deep">Faça agora</p><h2 id="para-fazer" className="mt-1 font-serif text-[clamp(1.55rem,1.2rem+1vw,2.1rem)] font-semibold text-midnight">Entregas desta semana</h2></div>
          <Pill tone="orange">{weekly.length} pendentes</Pill>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {weekly.map((exercise, index) => <WeeklyExercise key={exercise.id} exercise={exercise} position={index + 1} />)}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="entregas">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-purple">Seu histórico</p>
            <h2 id="entregas" className="mt-1 font-serif text-[clamp(1.55rem,1.2rem+1vw,2.1rem)] font-semibold text-midnight">Entregas por mês</h2>
          </div>
          <div className="flex flex-wrap gap-2"><Pill tone="purple">{sent.length} enviada</Pill><Pill tone="success">{completed.length} concluída</Pill></div>
        </div>

        <div className="space-y-5">
          {monthGroups.map((group) => {
            const open = openMonths[group.month] ?? false;
            return (
              <section key={group.month} className="overflow-hidden rounded-box border border-hairline bg-card shadow-card" aria-labelledby={group.month.replaceAll(" ", "-")}>
                <button type="button" onClick={() => setOpenMonths((current) => ({ ...current, [group.month]: !open }))} aria-expanded={open} className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition hover:bg-canvas sm:px-6">
                  <ChevronRight aria-hidden className={cn("size-5 shrink-0 text-purple transition-transform", open && "rotate-90")} />
                  <CalendarDays aria-hidden className="size-4 text-orange" />
                  <h3 id={group.month.replaceAll(" ", "-")} className="flex-1 text-[0.92rem] font-semibold text-midnight">{group.month}</h3>
                  <Pill>{group.items.length} {group.items.length === 1 ? "entrega" : "entregas"}</Pill>
                </button>
                {open && <div className="divide-y divide-hairline border-t border-hairline">{group.items.map((exercise) => <ExerciseRow key={exercise.id} exercise={exercise} />)}</div>}
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}

function StatusSummary({ icon, value, label, description, tone }: { icon: typeof Send; value: number; label: string; description: string; tone: "purple" | "success" }) {
  return (
    <div className="flex items-center gap-4 bg-card p-5 sm:p-6">
      <IconTile icon={icon} tone={tone} size="lg" />
      <div><p className="font-serif text-[2.2rem] font-semibold leading-none text-midnight">{value}</p><p className="mt-1 text-[0.86rem] font-semibold text-midnight">{label}</p><p className="mt-0.5 text-[0.75rem] text-muted">{description}</p></div>
    </div>
  );
}

function WeeklyExercise({ exercise, position }: { exercise: StudentExercise; position: number }) {
  return (
    <Link href={routes.platform.student.exercise(exercise.id)} className="group relative overflow-hidden rounded-box border-2 border-orange/35 bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-orange hover:shadow-card-hover sm:p-6">
      <span className="absolute right-5 top-4 text-[0.74rem] font-bold tracking-[0.12em] text-orange-deep">PRIORIDADE {String(position).padStart(2, "0")}</span>
      <div className="flex items-start gap-4"><IconTile icon={exercise.type.includes("áudio") ? Mic : Paperclip} tone="orange" size="lg" /><span className="min-w-0 flex-1 pr-16"><Pill tone="orange">{exercise.due}</Pill><h3 className="mt-3 font-serif text-[1.35rem] font-semibold leading-snug text-midnight">{exercise.title}</h3><p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{exercise.instruction}</p></span></div>
      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4"><span className="text-[0.76rem] text-muted">Entrega: {exercise.delivery}</span><span className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple">Abrir e anexar<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
    </Link>
  );
}

function ExerciseRow({ exercise }: { exercise: StudentExercise }) {
  const meta = statusMeta[exercise.status];
  const Icon = meta.icon;
  return (
    <Link href={routes.platform.student.exercise(exercise.id)} className="group flex flex-wrap items-center gap-4 px-5 py-4 transition hover:bg-canvas sm:flex-nowrap sm:px-6">
      <IconTile icon={exercise.type.includes("áudio") ? Mic : Paperclip} size="sm" tone={meta.tone} />
      <span className="min-w-0 flex-1"><strong className="block text-[0.9rem] text-midnight">{exercise.title}</strong><span className="mt-0.5 block text-[0.76rem] text-muted">{exercise.source} · {exercise.due}</span></span>
      <Pill tone={meta.tone} icon={Icon}>{meta.label}</Pill>
      <ArrowRight aria-hidden className="size-4 text-muted transition group-hover:translate-x-1 group-hover:text-purple" />
    </Link>
  );
}

export function ExerciseDetail({ exercise }: { exercise: StudentExercise }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [extensionSent, setExtensionSent] = useState(false);
  const isDone = exercise.status !== "para-fazer";
  const acceptsAudio = exercise.type.includes("áudio");
  const whatsappNumber = siteConfig.whatsappNumber.replace(/\D/g, "");
  const whatsappMessage = `Olá, Vanessa! Estou com uma dúvida sobre a atividade “${exercise.title}” (${exercise.source}). Você pode me ajudar?`;
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : undefined;

  return (
    <>
      <Link href={routes.platform.student.exercises} className="mb-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple hover:text-purple-deep"><ArrowLeft aria-hidden className="size-4" />Voltar para exercícios</Link>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-10">
        <Card as="article" className="sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4"><IconTile icon={exercise.type.includes("áudio") ? Mic : Paperclip} tone="orange" size="lg" /><Pill tone={statusMeta[exercise.status].tone}>{statusMeta[exercise.status].label}</Pill></div>
          <p className="mt-6 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-purple">{exercise.source}</p>
          <h1 className="mt-1 font-serif text-[clamp(1.7rem,1.3rem+1.4vw,2.5rem)] font-semibold leading-[1.12] text-midnight">{exercise.title}</h1>
          <p className="mt-5 text-[0.96rem] leading-relaxed text-ink">{exercise.instruction}</p>
          <div className="mt-6 rounded-tile bg-canvas p-4"><p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-muted">Como entregar</p><p className="mt-1 text-[0.88rem] text-midnight">{exercise.delivery}</p><p className="mt-2 text-[0.8rem] leading-relaxed text-muted">Faça a atividade fora da plataforma. Quando terminar, envie uma foto, PDF, áudio ou vídeo do que você produziu.</p></div>
        </Card>

        <aside className="space-y-5" aria-label="Entrega da atividade">
          <Card>
            <p className="text-[0.76rem] font-bold uppercase tracking-[0.12em] text-muted">Prazo</p><p className="mt-1 font-serif text-[1.35rem] font-semibold text-midnight">{exercise.due}</p><p className="mt-3 text-[0.8rem] text-muted">Atividade criada em {exercise.assignedAt}.</p>
          </Card>
          {!isDone && <Card className="border border-dashed border-purple/30 bg-surface/45">
            <h2 className="font-serif text-[1.35rem] font-semibold text-midnight">Anexar o que você fez</h2>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">Você pode enviar foto do caderno, PDF, áudio ou vídeo curto.</p>
            {acceptsAudio && <AudioRecorder onRecorded={(file) => { setFiles([file]); setSent(false); }} />}
            <input ref={inputRef} type="file" multiple accept="image/*,.pdf,audio/*,video/*" className="sr-only" onChange={(event) => setFiles(Array.from(event.target.files ?? []))} />
            <Btn onClick={() => inputRef.current?.click()} variant="secondary" className="mt-5 w-full"><FileUp aria-hidden />{acceptsAudio ? "Ou anexar um arquivo" : "Escolher arquivos"}</Btn>
            {files.length > 0 && <ul className="mt-4 space-y-2">{files.map((file) => <li key={file.name} className="rounded-tile bg-card px-3 py-2 text-[0.78rem] text-ink">{file.name}</li>)}</ul>}
            {files.length > 0 && <Btn onClick={() => setSent(true)} className="mt-3 w-full"><Send aria-hidden />Enviar para Vanessa</Btn>}
            {sent && <p className="mt-3 text-[0.78rem] leading-relaxed text-success">Demonstração: os arquivos foram preparados para envio. Na versão conectada, eles serão enviados para a Vanessa.</p>}
          </Card>}
          {!isDone && (whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[0.84rem] font-semibold text-[#082415] transition hover:-translate-y-px hover:bg-[#1fbd5a]">
              <MessageCircle aria-hidden className="size-4" />Tirar dúvida com a Vanessa
            </a>
          ) : (
            <div className="rounded-box border border-dashed border-hairline bg-card px-4 py-3 text-center">
              <p className="text-[0.8rem] font-semibold text-midnight">Tirar dúvida com a Vanessa</p>
              <p className="mt-1 text-[0.72rem] leading-relaxed text-muted">O WhatsApp da Vanessa será conectado aqui antes do lançamento.</p>
            </div>
          ))}
          {!isDone && <Card>
            <div className="flex items-start gap-3"><IconTile icon={CalendarPlus} size="sm" tone="purple" /><div><h2 className="font-serif text-[1.2rem] font-semibold text-midnight">Precisa de mais prazo?</h2><p className="mt-1 text-[0.78rem] leading-relaxed text-muted">Envie um pedido para a Vanessa antes do prazo atual.</p></div></div>
            {!extensionOpen && !extensionSent && <Btn onClick={() => setExtensionOpen(true)} variant="secondary" className="mt-4 w-full">Pedir extensão de prazo</Btn>}
            {extensionOpen && !extensionSent && <div className="mt-4 space-y-3 border-t border-hairline pt-4">
              <label className="block text-[0.78rem] font-semibold text-midnight">Nova data desejada<input type="date" className="mt-1.5 h-10 w-full rounded-tile border border-hairline bg-card px-3 text-[0.84rem] outline-none focus:border-purple" /></label>
              <label className="block text-[0.78rem] font-semibold text-midnight">Quer deixar uma mensagem? <span className="font-normal text-muted">(opcional)</span><textarea rows={3} placeholder="Ex.: preciso de mais dois dias para gravar o áudio." className="mt-1.5 w-full resize-y rounded-tile border border-hairline bg-card p-3 text-[0.84rem] font-normal outline-none placeholder:text-muted focus:border-purple" /></label>
              <Btn onClick={() => setExtensionSent(true)} className="w-full"><Send aria-hidden />Enviar pedido para Vanessa</Btn>
            </div>}
            {extensionSent && <p className="mt-4 rounded-tile bg-success-soft px-3 py-3 text-[0.78rem] leading-relaxed text-success">Pedido enviado na demonstração. Na plataforma conectada, a Vanessa receberá o pedido e poderá aprovar ou sugerir outra data.</p>}
          </Card>}
          {isDone && <Card className="bg-success-soft"><CheckCircle2 aria-hidden className="size-5 text-success" /><p className="mt-3 text-[0.86rem] font-semibold text-midnight">Esta entrega já está registrada.</p><p className="mt-1 text-[0.78rem] leading-relaxed text-muted">O histórico continua disponível aqui para você revisar quando quiser.</p></Card>}
        </aside>
      </div>
    </>
  );
}
