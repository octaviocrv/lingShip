"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, Eye, FolderHeart, GripVertical, Link2, Plus, Trash2 } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { getConversation, publishedConversations, type Course, type CourseLesson } from "../content/catalog";
import { Btn, Card, CardHeader, Pill, StatusBadge } from "../components/ui";

const input =
  "w-full rounded-tile border border-hairline bg-snow/60 px-4 text-[0.9rem] text-ink outline-none transition focus:border-purple/40 focus:bg-card focus:shadow-[0_0_0_4px_rgb(109_63_192/0.1)]";

/** Montagem do curso: aulas como perguntas, reordenáveis, ligadas às conversas do acervo. */
export function CourseBuilder({ course }: { course: Course }) {
  const [lessons, setLessons] = useState<CourseLesson[]>(course.lessons);
  const [published, setPublished] = useState(course.status === "publicado");
  const [toast, setToast] = useState<string | null>(null);

  const move = (i: number, dir: -1 | 1) =>
    setLessons((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const add = (slug: string) => {
    const c = getConversation(slug);
    if (c) setLessons((prev) => [...prev.slice(0, -1), { question: c.question, conversation: c.slug }, ...prev.slice(-1)]);
  };

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  };

  const options = publishedConversations.filter((c) => !lessons.some((l) => l.conversation === c.slug));

  return (
    <div>
      <Link href={routes.platform.teacher.courses} className="mb-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple hover:text-purple-deep">
        <ArrowLeft aria-hidden className="size-4" />
        Cursos
      </Link>

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="mb-2 text-[0.78rem] font-semibold text-purple">Estrutura do curso</p>
          <h1 className="font-serif text-[clamp(1.5rem,1.15rem+1vw,2rem)] font-semibold leading-tight text-midnight">{course.title}</h1>
        </div>
        <div className="flex gap-2.5">
          {published && (
            <Link
              href={routes.platform.student.course(course.slug)}
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.86rem] font-semibold text-purple hover:bg-surface"
            >
              <Eye aria-hidden className="size-4" />
              Ver como aluno
            </Link>
          )}
          <Btn variant="secondary" onClick={() => notify("Alterações salvas (demonstração).")}>
            Salvar
          </Btn>
          {!published && (
            <Btn
              onClick={() => {
                setPublished(true);
                notify("Curso publicado (demonstração).");
              }}
            >
              Publicar curso
            </Btn>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader
            title="Aulas"
            description="Cada aula é uma pergunta. Use as setas para reorganizar."
            action={<Pill tone="purple">{lessons.length} aulas</Pill>}
          />
          <ol className="space-y-2.5">
            {lessons.map((lesson, i) => {
              const conv = lesson.conversation ? getConversation(lesson.conversation) : undefined;
              return (
                <li key={lesson.question} className="group flex items-center gap-3 rounded-tile border border-hairline bg-card px-3 py-3 transition hover:border-purple/25 hover:shadow-card">
                  <GripVertical aria-hidden className="size-4 shrink-0 text-muted/60" />
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-canvas text-[0.78rem] font-bold text-midnight">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.92rem] font-semibold leading-snug text-midnight">{lesson.question}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.74rem] text-muted">
                      {conv ? (
                        <>
                          <Link2 aria-hidden className="size-3.5" />
                          Conversa do acervo
                          <StatusBadge status={conv.status} />
                        </>
                      ) : (
                        <span>Aula própria do curso</span>
                      )}
                      {lesson.practice && <Pill tone={i === 0 || i === lessons.length - 1 ? "orange" : "neutral"}>{lesson.practice}</Pill>}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5 opacity-70 transition group-hover:opacity-100">
                    <IconBtn label="Subir" onClick={() => move(i, -1)} disabled={i === 0}>
                      <ArrowUp className="size-4" />
                    </IconBtn>
                    <IconBtn label="Descer" onClick={() => move(i, 1)} disabled={i === lessons.length - 1}>
                      <ArrowDown className="size-4" />
                    </IconBtn>
                    <IconBtn label="Remover" onClick={() => setLessons((p) => p.filter((_, k) => k !== i))} danger>
                      <Trash2 className="size-4" />
                    </IconBtn>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <label className="relative">
              <span className="sr-only">Adicionar conversa do acervo</span>
              <select
                value=""
                onChange={(e) => e.target.value && add(e.target.value)}
                className="h-11 cursor-pointer appearance-none rounded-full bg-surface pl-10 pr-5 text-[0.86rem] font-semibold text-purple outline-none"
              >
                <option value="">Adicionar conversa do acervo</option>
                {options.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.question}
                  </option>
                ))}
              </select>
              <Plus aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-purple" />
            </label>
          </div>
        </Card>

        <aside className="space-y-6">
          <Card>
            <CardHeader title="Apresentação" />
            <div className="space-y-4">
              <Field label="Para quem é" id="paraquem">
                <textarea id="paraquem" rows={3} defaultValue={course.forWho} className={cn(input, "resize-none py-3")} />
              </Field>
              <Field label="O que a pessoa vive hoje" id="hoje">
                <textarea id="hoje" rows={2} defaultValue={course.today} className={cn(input, "resize-none py-3")} />
              </Field>
              <Field label="O que poderá fazer de modo diferente" id="depois">
                <textarea id="depois" rows={2} defaultValue={course.after} className={cn(input, "resize-none py-3")} />
              </Field>
              <Field label="Preço" id="preco">
                <input id="preco" defaultValue={course.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} className={cn(input, "h-11")} />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Portfólio do aluno" icon={FolderHeart} />
            <ul className="space-y-2.5 text-[0.86rem] text-ink">
              {["Linha de base na primeira aula", "Até 3 produções escolhidas", "Produção final para comparar"].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <CheckCircle2 aria-hidden className="size-4 text-success" />
                  {x}
                </li>
              ))}
            </ul>
            {course.enrolled > 0 && (
              <p className="mt-5 rounded-tile bg-canvas px-4 py-3 text-[0.82rem] text-muted">
                <span className="font-semibold text-midnight">{course.enrolled}</span> matriculados ·{" "}
                <span className="font-semibold text-midnight">{course.completed}</span> concluíram
              </p>
            )}
          </Card>
        </aside>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {toast && (
          <p className="flex items-center gap-2.5 rounded-full bg-midnight px-5 py-3 text-[0.86rem] font-medium text-snow shadow-card-hover">
            <CheckCircle2 aria-hidden className="size-4 text-orange" />
            {toast}
          </p>
        )}
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, disabled, danger, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-8 cursor-pointer place-items-center rounded-full text-muted transition disabled:cursor-default disabled:opacity-30",
        danger ? "hover:bg-coral/10 hover:text-coral-deep" : "hover:bg-surface hover:text-purple",
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.8rem] font-semibold text-midnight">
        {label}
      </label>
      {children}
    </div>
  );
}
