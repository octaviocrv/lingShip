import Link from "next/link";
import { Check, ChevronDown, Flag, Headphones, PenLine, PlayCircle } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { getConversation } from "../../content/catalog";
import { Pill, ProgressBar } from "../../components/ui";
import type { LessonView, ModuleView } from "../course-progress";

/*
 * Lista de aulas e módulos da área do aluno. Mesma peça na home (módulo atual), na página do
 * curso (módulos expansíveis) e na lateral da aula (versão compacta).
 */

/** Ícone pelo tipo da aula: marco (linha de base, final), áudio, vídeo ou atividade. */
function LessonGlyph({ lesson }: { lesson: LessonView }) {
  const props = { "aria-hidden": true, strokeWidth: 1.9 } as const;
  if (lesson.practice?.startsWith("Linha de base") || lesson.practice === "Produção final") return <Flag {...props} />;
  const conv = lesson.conversation ? getConversation(lesson.conversation) : undefined;
  if (conv?.format === "Áudio") return <Headphones {...props} />;
  if (conv) return <PlayCircle {...props} />;
  return <PenLine {...props} />;
}

const stateLabel = { concluida: "Concluída", proxima: "Próxima aula", pendente: "Não iniciada" } as const;

/** Ícone da aula em caixa, com o selo do estado no canto (concluída / próxima). */
function LessonIcon({ lesson, size = "md" }: { lesson: LessonView; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "relative z-10 grid shrink-0 place-items-center rounded-tile border transition-colors",
        size === "sm" ? "size-9 [&>svg]:size-4" : "size-11 [&>svg]:size-[18px]",
        lesson.state === "proxima"
          ? "border-midnight bg-midnight text-snow"
          : lesson.state === "concluida"
            ? "border-hairline bg-card text-midnight"
            : "border-hairline bg-card text-muted",
      )}
    >
      <LessonGlyph lesson={lesson} />
      {lesson.state === "concluida" && (
        <span className="absolute -bottom-1.5 -right-1.5 grid size-[18px] place-items-center rounded-full bg-orange text-midnight ring-2 ring-card">
          <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
        </span>
      )}
    </span>
  );
}

/**
 * Lista de aulas com a linha ligando os ícones (como uma trilha). `href` recebe a aula e
 * devolve o link; sem link, a linha não é clicável (ex.: curso que o aluno não tem).
 */
export function LessonList({
  lessons,
  courseSlug,
  linkable = true,
  compact = false,
  currentIndex,
}: {
  lessons: LessonView[];
  courseSlug: string;
  linkable?: boolean;
  compact?: boolean;
  /** aula aberta agora (na página da aula), destacada na lista */
  currentIndex?: number;
}) {
  return (
    <ol className="relative">
      {lessons.map((lesson, i) => {
        const current = currentIndex === lesson.index;
        const inner = (
          <>
            <LessonIcon lesson={lesson} size={compact ? "sm" : "md"} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="text-[0.7rem] font-semibold text-muted">Aula {lesson.number}</span>
                {lesson.state === "proxima" && !compact && (
                  <Pill tone="solid" className="py-0.5 text-[0.64rem]">
                    Próxima
                  </Pill>
                )}
              </span>
              <span
                className={cn(
                  "mt-0.5 block font-semibold leading-snug",
                  compact ? "text-[0.84rem]" : "text-[0.95rem]",
                  current ? "text-purple" : "text-midnight",
                  linkable && "group-hover:text-purple",
                )}
              >
                {lesson.question}
              </span>
              <span className="mt-1 block text-[0.74rem] text-muted">
                {lesson.minutes} min
                {lesson.practice && !compact && <> · {lesson.practice}</>}
                <span className="sr-only"> · {stateLabel[lesson.state]}</span>
              </span>
            </span>
            {!compact && lesson.summary && (
              <span className="hidden w-[36%] shrink-0 text-[0.82rem] leading-relaxed text-muted lg:block">{lesson.summary}</span>
            )}
          </>
        );
        const rowClass = cn(
          "group relative flex items-start gap-4 rounded-tile",
          compact ? "px-2 py-2.5" : "px-3 py-3.5",
          current && "bg-surface",
          linkable && !current && "transition-colors hover:bg-canvas",
        );
        return (
          <li key={lesson.index} className="relative">
            {/* linha que liga os ícones */}
            {i < lessons.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute w-px bg-hairline",
                  compact ? "left-[25px] top-[46px] bottom-[-10px]" : "left-[33px] top-[58px] bottom-[-14px]",
                  lesson.state === "concluida" && "bg-orange/60",
                )}
              />
            )}
            {linkable ? (
              <Link
                href={routes.platform.student.lesson(courseSlug, lesson.number)}
                aria-current={current ? "page" : undefined}
                className={rowClass}
              >
                {inner}
              </Link>
            ) : (
              <div className={rowClass}>{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Módulo expansível (página do curso). Abre sozinho o módulo da próxima aula. */
export function ModuleAccordion({
  module: m,
  courseSlug,
  linkable,
  defaultOpen,
}: {
  module: ModuleView;
  courseSlug: string;
  linkable: boolean;
  defaultOpen?: boolean;
}) {
  const complete = m.done === m.total;
  return (
    <details open={defaultOpen} className="group/module rounded-box bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-4 rounded-box p-5 outline-none focus-visible:ring-2 focus-visible:ring-purple/40 lg:px-6">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full font-serif text-[1.05rem] font-semibold",
            complete ? "bg-orange text-midnight" : m.hasNext ? "bg-midnight text-snow" : "bg-canvas text-midnight",
          )}
        >
          {complete ? <Check aria-hidden className="size-5" strokeWidth={3} /> : m.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.74rem] font-semibold text-purple">
            Módulo {m.number}
            {m.hasNext && <span className="text-orange-deep"> · você está aqui</span>}
          </span>
          <span className="mt-0.5 block font-serif text-[1.15rem] font-semibold leading-snug text-midnight">{m.title}</span>
          <span className="mt-0.5 block text-[0.8rem] text-muted">
            {m.total} {m.total === 1 ? "aula" : "aulas"} · {m.minutes} min · {m.summary}
          </span>
        </span>
        <span className="hidden w-36 shrink-0 sm:block">
          <span className="mb-1.5 block text-right text-[0.74rem] font-semibold text-midnight">
            {m.done}/{m.total} concluídas
          </span>
          <ProgressBar value={m.done} max={m.total} label={`Módulo ${m.number}: aulas concluídas`} />
        </span>
        <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open/module:rotate-180" />
      </summary>
      <div className="border-t border-hairline px-2 pb-3 pt-2 lg:px-3">
        <LessonList lessons={m.lessons} courseSlug={courseSlug} linkable={linkable} />
      </div>
    </details>
  );
}
